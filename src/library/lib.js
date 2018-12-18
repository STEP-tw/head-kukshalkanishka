const { parseInput, filterCommandOutput } = require("./io.js");
const { validateHead, validateTail } = require("./errorHandling.js");

const read = function(reader, file) {
  return reader(file, "utf-8");
};

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

const selectErrorMessage = function(command) {
  return filePath => command + ": " + filePath + ": No such file or directory";
};

const createHeading = filePath => "==> " + filePath + " <==";

const formatContents = function(
  { option, count, filePaths },
  fetchFrom,
  command,
  doesExists,
  reader
) {
  let delimiters = { "-n": "\n", "-c": "" };
  let errorMessage = selectErrorMessage(command);
  let lines = filePaths.reduce((texts, filePath) => {
    if (!doesExists(filePath)) {
      texts.push(errorMessage(filePath));
      return texts;
    }
    let  content = read(reader, filePath);
    texts.push(createHeading(filePath));
    texts.push(fetchFrom(content, count, delimiters[option]));
    return texts;
  }, []);

  return lines;
};

const runCommand = function(reader, userArgs, doesExists) {
  let parsedInput = parseInput(userArgs);

  if (this.validator(parsedInput)) {
    return this.validator(parsedInput);
  }

  let contents = formatContents(parsedInput, this.filterFrom, this.command, doesExists, reader);
  return filterCommandOutput(contents).join("\n");
};

const runHead = function(reader, userArgs, doesExists) {
  let headParams = {
    validator: validateHead,
    command: "head",
    filterFrom: filterContents.bind("null", fetchFromBeginning)
  };
  return runCommand.bind(headParams)(reader, userArgs, doesExists);
};

const runTail = function(reader, userArgs, doesExists) {
  let tailParams = {
    validator: validateTail,
    command: "tail",
    filterFrom: filterContents.bind("null", fetchFromEnd)
  };
  return runCommand.bind(tailParams)(reader, userArgs, doesExists);
};

exports.read = read;
exports.formatContents = formatContents;
exports.runHead = runHead;
exports.filterContents = filterContents;
exports.fetchFromBeginning = fetchFromBeginning;
exports.fetchFromEnd = fetchFromEnd;
exports.runHead = runHead;
exports.runTail = runTail;
