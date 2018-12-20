const { parseInput } = require("./parseInput.js");
const { validateHead, validateTail } = require("./errorHandling.js");

const fetchFromBeginning = function(content, count) {
  return content.slice(0, count);
};

const fetchFromEnd = function(content, count) {
  return content.slice(-Math.abs(count));
};

const filterContents = function(fetcher, fileContent, count, delimiter) {
  if (count == 0) {
    return "";
  }
  let lines = fileContent.split(delimiter);
  let requiredLines = fetcher(lines, count);
  return requiredLines.join(delimiter);
};

const getRequiredContents = function(parsedInput, fetchFrom, fs) {
  let { count, option, filePaths } = parsedInput;
  let delimiters = { "-n": "\n", "-c": "" };

  let requiredFiles = filePaths.reduce((texts, filePath) => {
    let filteredContents = null;
    if (fs.existsSync(filePath)) {
      let fileContent = fs.readFileSync(filePath, "utf-8");
      filteredContents = fetchFrom(fileContent, count, delimiters[option]);
    }
    texts.push({ filePath, filteredContents });
    return texts;
  }, []);

  return requiredFiles;
};

const runHead = function(args, fs) {
  let filterFrom = filterContents.bind("null", fetchFromBeginning);
  return getRequiredContents(args, filterFrom, fs);
};

const runTail = function(args, fs) {
  let filterFrom = filterContents.bind("null", fetchFromEnd);
  return getRequiredContents(args, filterFrom, fs);
};

const runCommand = function(userArgs, command, fs) {
  let operations = { head: runHead, tail: runTail };
  let validator = { head: validateHead, tail: validateTail };
  let parsedInput = parseInput(userArgs);

  if (validator[command](parsedInput)) {
    return { files: validator[command](parsedInput), isInputInvalid: true };
  }

  let output = operations[command](parsedInput, fs);
  return { files: output, isInputInvalid: false };
};

exports.getRequiredContents = getRequiredContents;
exports.filterContents = filterContents;
exports.fetchFromBeginning = fetchFromBeginning;
exports.fetchFromEnd = fetchFromEnd;
exports.runHead = runHead;
exports.runTail = runTail;
exports.runCommand = runCommand;
