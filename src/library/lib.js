const { parseInput, formatCommandOutput } = require("./io.js");
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

const getRequiredContents = function(parsedInput,fetchFrom,doesExists,reader) {
  let {count, option, filePaths} = parsedInput;
  let delimiters = { "-n": "\n", "-c": "" };

  let requiredFiles = filePaths.reduce((texts, filePath) => {
    let filteredContents = null;
      if (doesExists(filePath)) {
      let  fileContent = reader(filePath, 'utf-8');
      filteredContents = fetchFrom(fileContent, count, delimiters[option]);
    }
    texts.push({filePath, filteredContents});
    return texts;
  }, []);

  return requiredFiles;
};

const createHeader = function(filePath) {
  return  `==> ${filePath} <==`;
}

const addHeaderIfMultipleFiles = function(files){
  if(files.length == 1){
    return files;
  }
  return  files.map(function(file){
    file.header = '';
    if(file.filteredContents != null){
      file.header = createHeader(file.filePath);
    }
    return file;
  })
}

const runCommand = function(reader, userArgs, doesExists, command) {
  let parsedInput = parseInput(userArgs);
  if (this.validator(parsedInput)) {
    return this.validator(parsedInput);
  }
  let requiredfiles = getRequiredContents(parsedInput, this.filterFrom, doesExists, reader);

  let output = addHeaderIfMultipleFiles(requiredfiles);
  return formatCommandOutput(output, command);
};

const runHead = function(reader, userArgs, doesExists) {
  let headParams = {
    validator: validateHead,
    command: "head",
    filterFrom: filterContents.bind("null", fetchFromBeginning)
  };
  return runCommand.bind(headParams)(reader, userArgs, doesExists, 'head');
};

const runTail = function(reader, userArgs, doesExists) {
  let tailParams = {
    validator: validateTail,
    command: "tail",
    filterFrom: filterContents.bind("null", fetchFromEnd)
  };
  return runCommand.bind(tailParams)(reader, userArgs, doesExists, 'tail');
};

exports.getRequiredContents = getRequiredContents;
exports.runHead = runHead;
exports.filterContents = filterContents;
exports.fetchFromBeginning = fetchFromBeginning;
exports.fetchFromEnd = fetchFromEnd;
exports.runHead = runHead;
exports.runTail = runTail;