const fs = require("fs");
const { formatOutput } = require("./src/library/formatOutput.js");

const main = function() {
  let reader = fs.readFileSync;
  let userArgs = process.argv.slice(2);
  let validater = fs.existsSync;
  console.log(formatOutput(userArgs, reader, validater, "tail"));
};

main();
