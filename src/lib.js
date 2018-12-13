const { parseInput } = require("./io.js");
const { validateHead, validateTail } = require("./errorHandling.js");

const read = function(reader, file, encoding) {
  return reader(file, encoding);
};

const createDetailsOf = function(reader, files, encoding, existanceValidator) {
  return files.map(fileName => {
    let content = null;
    if (existanceValidator(fileName)) {
      content = read(reader, fileName, encoding);
    }
    return { fileName, content };
  });
};

const fetchFromBeginning = function(content, count) {
  return content.slice(0, count);
};

const fetchFromEnd = function(content, count) {
  let length = content.length;
  if (count == 0) {
    return [""];
  }
  return content.slice(-Math.abs(count));
};

const getLines = function(fileContent, numOfLines, fetcher) {
  let lines = fileContent.split("\n");
  let requiredLines = fetcher(lines, numOfLines);
  return requiredLines.join("\n");
};

const getChars = function(fileContent, bytesRequired, fetcher) {
  return fetcher(fileContent, bytesRequired);
};

const selector = function(option) {
  let func = getLines;
  if (option == "-c") {
    func = getChars;
  }
  return func;
};

const createHeading = function(file, delimiter) {
  return delimiter + "==> " + file.fileName + " <==";
};

const selectErrorMessage = function(fetchingType) {
  let command = "head: ";
  if (fetchingType == fetchFromEnd) {
    command = "tail: ";
  }
  return file => command + file + ": No such file or directory";
};

const isNull = value => value == null;

const isGreaterThan1 = num => num > 1;

const fetchContent = function(fileDetails, { option, count = 10 }, fetchType) {
  let delimiter = "";
  let fetcher = selector(option);
  let errorMessage = selectErrorMessage(fetchType);
  let lines = fileDetails.reduce((texts, file) => {
    if (isNull(file.content)) {
      texts.push(errorMessage(file.fileName));
      return texts;
    }
    if (isGreaterThan1(fileDetails.length)) {
      texts.push(createHeading(file, delimiter));
    }
    delimiter = "\n";
    texts.push(fetcher(file.content, count, fetchType));
    return texts;
  }, []);
  return lines.join("\n");
};

const selectValidator = function(fetchType) {
  if (fetchType == fetchFromBeginning) {
    return validateHead;
  }
  return validateTail;
};

const runCommand = function(
  reader,
  encoding,
  userArgs,
  existanceValidator,
  fetchType
) {
  let parsedInput = parseInput(userArgs);
  let argsValidator = selectValidator(fetchType);
  if (argsValidator(parsedInput, fetchType)) {
    return argsValidator(parsedInput, fetchType);
  }
  let fileDetails = createDetailsOf(
    reader,
    parsedInput.filePaths,
    encoding,
    existanceValidator
  );
  return fetchContent(fileDetails, parsedInput, fetchType);
};

const runHead = function(reader, encoding, userArgs, existanceValidator) {
  return runCommand(
    reader,
    encoding,
    userArgs,
    existanceValidator,
    fetchFromBeginning
  );
};

const runTail = function(reader, encoding, userArgs, existanceValidator) {
  return runCommand(
    reader,
    encoding,
    userArgs,
    existanceValidator,
    fetchFromEnd
  );
};

exports.read = read;
exports.createDetailsOf = createDetailsOf;
exports.fetchContent = fetchContent;
exports.selector = selector;
exports.runHead = runHead;
exports.getLines = getLines;
exports.getChars = getChars;
exports.fetchFromBeginning = fetchFromBeginning;
exports.fetchFromEnd = fetchFromEnd;
exports.runHead = runHead;
exports.runTail = runTail;