const { parseInput, filterCommandOutput } = require("./io.js");
const { validateHead, validateTail } = require("./errorHandling.js");

const read = function(reader, file) {
  return reader(file, "utf-8");
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

const createHeading = file => "==> " + file.fileName + " <==";

const isNull = value => value == null;

const formatContents = function(
  fileDetails,
  { option, count },
  fetchFrom,
  command
) {
  let delimiters = { "-n": "\n", "-c": "" };
  let errorMessage = selectErrorMessage(command);
  let lines = fileDetails.reduce((texts, file) => {
    if (isNull(file.content)) {
      texts.push(errorMessage(file.fileName));
      return texts;
    }

    texts.push(createHeading(file));
    texts.push(fetchFrom(file.content, count, delimiters[option]));
    return texts;
  }, []);

  return lines;
};

const runCommand = function(reader, userArgs, doesExists) {
  let parsedInput = parseInput(userArgs);

  if (this.validator(parsedInput)) {
    return this.validator(parsedInput);
  }

  let fileDetails = createDetailsOf(reader, parsedInput.filePaths, doesExists);
  let contents = formatContents(fileDetails, parsedInput, this.filterFrom, this.command);
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
exports.createDetailsOf = createDetailsOf;
exports.formatContents = formatContents;
exports.runHead = runHead;
exports.filterContents = filterContents;
exports.fetchFromBeginning = fetchFromBeginning;
exports.fetchFromEnd = fetchFromEnd;
exports.runHead = runHead;
exports.runTail = runTail;
