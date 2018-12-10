const { parseInput } = require("./utilLib.js");
const { validate } = require("./errorHandling.js");

const read = function(reader, file, encoding) {
  return reader(file, encoding);
};

const createDetailsOf = function(reader, files, encoding, validater) {
  return files.map(fileName => {
    let content = null;
    if (validater(fileName)) {
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
  return content.slice(length - count, length);
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

const noFileOrDirError = function(file) {
  return "head: " + file + ": No such file or directory";
};

const isNull = function(value) {
  return value == null;
};

const isGreaterThan1 = function(num) {
  return num > 1;
};

const fetchContent = function(fileDetails, { option, count = 10 }, fetchType) {
  let delimiter = "";
  let fetcher = selector(option);
  let lines = fileDetails.reduce((texts, file) => {
    if (isNull(file.content)) {
      texts.push(noFileOrDirError(file.fileName));
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

const run = function(reader, encoding, userArgs, validater, fetchType) {
  let parsedInput = parseInput(userArgs);
  if (validate(parsedInput)) {
    return validate(parsedInput);
  }
  let fileDetails = createDetailsOf(
    reader,
    parsedInput.filePaths,
    encoding,
    validater
  );
  return fetchContent(fileDetails, parsedInput, fetchType);
};

const runHead = function(reader, encoding, userArgs, validater){
  return run(reader, encoding, userArgs, validater, fetchFromBeginning);
}

const runTail = function(reader, encoding, userArgs, validater){
  return run(reader, encoding, userArgs, validater, fetchFromEnd);
}

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