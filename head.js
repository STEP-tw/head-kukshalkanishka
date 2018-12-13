const fs = require("fs");
const { runHead } = require("./src/lib.js");

const main = function() {
  let reader = fs.readFileSync;
  let userArgs = process.argv.slice(2);
  let validater = fs.existsSync;
  console.log(runHead(reader, userArgs, validater));
};

main();