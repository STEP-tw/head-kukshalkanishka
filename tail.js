const fs = require("fs");
const { parseInput } = require("./src/library/parseInput.js");
const { validateTail } = require("./src/library/errorHandling.js");
const { formatOutput } = require("./src/library/formatOutput.js");
const { runCommand } = require("./src/library/fileUtil.js");

const main = function() {
  let parsedInput = parseInput(process.argv.slice(2));
  if (validateTail(parsedInput).isInvalid) {
    return validateTail(parsedInput).message;
  }
  let output = runCommand(parsedInput, "tail", fs);
  return formatOutput(output, "tail");
};

console.log(main());
