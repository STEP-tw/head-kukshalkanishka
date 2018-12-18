const fs = require("fs");
const { runTail } = require("./src/library/lib.js");

const main = function() {
  let reader = fs.readFileSync;
  let userArgs = process.argv.slice(2);
  let validater = fs.existsSync;
  console.log(runTail(reader, userArgs, validater));
};

main();