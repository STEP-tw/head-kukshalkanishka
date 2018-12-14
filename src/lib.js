const { parseInput, filterCommandOutput } = require("./io.js");
const { validateHead, validateTail } = require("./errorHandling.js");

const read = function(reader, file) {
  return reader(file, 'utf-8');
};

const createDetailsOf = function(reader, filePaths, existanceValidator) {
  return filePaths.map(fileName => {
    let content = null;
    if (existanceValidator(fileName)) {
      content = read(reader, fileName);
    }
    return { fileName, content };
  });
};

const fetchFromBeginning = function(content, count) {
  return content.slice(0, count);
};

const fetchFromEnd = function(content, count) {
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

const createHeading = (file) => "==> " + file.fileName + " <==";

const selectErrorMessage = function(fetchingType) {
  let command = "head: ";
  if (fetchingType == fetchFromEnd) {
    command = "tail: ";
  }
  return file => command + file + ": No such file or directory";
};
  
const isNull = value => value == null;

const filterRequiredContents = function(fileDetails, { option, count }, fetchType) {
  let fetchers = {'-n' : getLines, '-c' : getChars};
  let errorMessage = selectErrorMessage(fetchType);
  let lines = fileDetails.reduce((texts, file) => {

    if (isNull(file.content)) {
      texts.push(errorMessage(file.fileName));
      return texts;
    }

    texts.push(createHeading(file));
    texts.push(fetchers[option](file.content, count, fetchType));
    return texts;
  }, []);

  return lines;
};

const selectValidator = function(fetchType) {
  if (fetchType == fetchFromBeginning) {
    return validateHead;
  }
  return validateTail;
};

const runCommand = function(reader, userArgs, existanceValidator, fetchType) {
  let parsedInput = parseInput(userArgs);
  let argsValidator = selectValidator(fetchType);
  if (argsValidator(parsedInput, fetchType)) {
    return argsValidator(parsedInput, fetchType);
  }
  let fileDetails = createDetailsOf(reader, parsedInput.filePaths, existanceValidator);
  let contents = filterRequiredContents(fileDetails, parsedInput, fetchType);
  return filterCommandOutput(contents).join('\n');
};

const runHead = function(reader, userArgs, existanceValidator) {
  return runCommand(
    reader,
    userArgs,
    existanceValidator,
    fetchFromBeginning
  );
};

const runTail = function(reader, userArgs, existanceValidator) {
  return runCommand(reader, userArgs, existanceValidator, fetchFromEnd);
};

exports.read = read;
exports.createDetailsOf = createDetailsOf;
exports.filterRequiredContents = filterRequiredContents;
exports.runHead = runHead;
exports.getLines = getLines;
exports.getChars = getChars;
exports.fetchFromBeginning = fetchFromBeginning;
exports.fetchFromEnd = fetchFromEnd;
exports.runHead = runHead;
exports.runTail = runTail;