const fs = require("fs");
const { parseInput } = require("./src/io/parseInput.js");
const { validateHead } = require("./src/library/errorHandling.js");
const { formatOutput } = require("./src/io/formatOutput.js");
const { head } = require("./src/library/fileUtil.js");

const main = function() {
  let parsedInput = parseInput(process.argv.slice(2));
  if (validateHead(parsedInput).isInvalid) {
    return validateHead(parsedInput).message;
  }
  let output = head(parsedInput, fs);
  return formatOutput(output, "head");
};

console.log(main());
