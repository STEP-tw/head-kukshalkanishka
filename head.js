const fs = require("fs");
const { parseInput } = require("./src/library/parseInput.js");
const { validateHead } = require("./src/library/errorHandling.js");
const { formatOutput } = require("./src/library/formatOutput.js");
const { runCommand } = require("./src/library/fileUtil.js");

const main = function() {
  let parsedInput = parseInput(process.argv.slice(2));
  if (validateHead(parsedInput).isInvalid) {
    return validateHead(parsedInput).message;
  }
  let output = runCommand(parsedInput, "head", fs);
  return formatOutput(output, "head");
};

console.log(main());
