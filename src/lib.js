const { parseInput, filterCommandOutput } = require("./io.js");
const { validateHead, validateTail } = require("./errorHandling.js");

const read = function(reader, file) {
  return reader(file, 'utf-8');
};

const createDetailsOf = function(reader, filePaths, doesExists) {
  return filePaths.map(fileName => {
    let content = null;
    if (doesExists(fileName)) {
      content = read(reader, fileName);
    }
    return { fileName, content };
  });
};

const fetchFromBeginning = function(content, count) {
  return content.slice(0, count);
};

const fetchFromEnd = function(content, count) {
  return content.slice(-Math.abs(count));
};

const filterContents = function(fileContent, count, fetcher, delimiter) {
  if(count == 0) {
    return '';
  }
  let lines = fileContent.split(delimiter);
  let requiredLines = fetcher(lines, count);
  return requiredLines.join(delimiter);
};

const selectErrorMessage = function(command) {
  return filePath => command + ": " + filePath + ": No such file or directory";
};

const createHeading = (file) => "==> " + file.fileName + " <==";

const isNull = (value) => value == null;

const filterRequiredContents = function(fileDetails, { option, count }, fetchFrom, command) {
  let delimiters = {'-n' : '\n', '-c' : ''};
  let errorMessage = selectErrorMessage(command);
  let lines = fileDetails.reduce((texts, file) => {

    if (isNull(file.content)) {
      texts.push(errorMessage(file.fileName));
      return texts;
    }

    texts.push(createHeading(file));
    texts.push(filterContents(file.content, count, fetchFrom, delimiters[option]));
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

const runCommand = function(reader, userArgs, doesExists, fetchFrom) {
  let parsedInput = parseInput(userArgs);
  let argsValidator = getValidatorAndCommand(fetchFrom).validator;
  let command = getValidatorAndCommand(fetchFrom).command;

  if (argsValidator(parsedInput, fetchFrom)) {
    return argsValidator(parsedInput, fetchFrom);
  }

  let fileDetails = createDetailsOf(reader, parsedInput.filePaths, doesExists);
  let contents = filterRequiredContents(fileDetails, parsedInput, fetchFrom, command);
  return filterCommandOutput(contents).join('\n');
};

const runHead = function(reader, userArgs, doesExists) {
  return runCommand(reader, userArgs, doesExists, fetchFromBeginning);
};

const runTail = function(reader, userArgs, doesExists) {
  return runCommand(reader, userArgs, doesExists, fetchFromEnd);
};

exports.read = read;
exports.createDetailsOf = createDetailsOf;
exports.filterRequiredContents = filterRequiredContents;
exports.runHead = runHead;
exports.filterContents = filterContents;
exports.fetchFromBeginning = fetchFromBeginning;
exports.fetchFromEnd = fetchFromEnd;
exports.runHead = runHead;
exports.runTail = runTail;