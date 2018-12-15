const { parseInput, filterCommandOutput } = require("./io.js");
const { validateHead, validateTail } = require("./errorHandling.js");

const read = function(reader, file) {
  return reader(file, 'utf-8');
};

const selectErrorMessage = function(command, fileName) {
  return command + ": " + fileName + ": No such file or directory";
};

const createDetailsOf = function(reader, filePaths, existanceValidator, command) {
  return filePaths.map(fileName => {
    let content = selectErrorMessage(command, fileName);
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

const filterRequiredContents = function(fileDetails, { option, count }, fetchFrom) {
  let fetchers = {'-n' : getLines, '-c' : getChars};
  let lines = fileDetails.reduce((texts, file) => {
    texts.push(createHeading(file));
    texts.push(fetchers[option](file.content, count, fetchFrom));
    return texts;
  }, []);

  return lines;
};

const getValidatorAndCommand = function(fetchFrom) {
  if (fetchFrom == fetchFromBeginning) {
    return {'validator': validateHead, 'command': 'head'};
  }
  return {'validator': validateTail, 'command': 'tail'};
};

const runCommand = function(reader, userArgs, existanceValidator, fetchFrom) {
  let parsedInput = parseInput(userArgs);
  let argsValidator = getValidatorAndCommand(fetchFrom).validator;
  let command = getValidatorAndCommand(fetchFrom).command;

  if (argsValidator(parsedInput, fetchFrom)) {
    return argsValidator(parsedInput, fetchFrom);
  }

  let fileDetails = createDetailsOf(reader, parsedInput.filePaths, existanceValidator, command);
  let contents = filterRequiredContents(fileDetails, parsedInput, fetchFrom);
  return filterCommandOutput(contents).join('\n');
};

const runHead = function(reader, userArgs, existanceValidator) {
  return runCommand(reader, userArgs, existanceValidator, fetchFromBeginning);
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