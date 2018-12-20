const { runCommand } = require("./fileUtil.js");
const { existanceErrorMessage } = require("./errorHandling");

const createHeader = function(filePath) {
  return `==> ${filePath} <==`;
};

const addHeaderIfMultipleFiles = function(files, command) {
  return files.map(function(file) {
    if (file.filteredContents == null) {
      return existanceErrorMessage(command, file.filePath);
    }
    if (files.length == 1) {
      return file.filteredContents;
    }
    return createHeader(file.filePath) + "\n" + file.filteredContents;
  });
};

const formatOutput = function(userArgs, command, fs) {
  let { isInputInvalid, files } = runCommand(userArgs, command, fs);
  if (isInputInvalid) {
    return files;
  }
  let formatedOutput = addHeaderIfMultipleFiles(files, command);
  return formatedOutput.join("\n");
};

exports.formatOutput = formatOutput;
