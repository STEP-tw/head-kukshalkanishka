const fs = require("fs");
const { formatOutput } = require("./src/library/formatOutput.js");

const main = function() {
  let userArgs = process.argv.slice(2);
  console.log(formatOutput(userArgs, "head", fs));
};

main();
