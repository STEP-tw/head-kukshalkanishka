const fs = require("fs");
const { runTail } = require("./src/lib.js");

const main = function() {
  let reader = fs.readFileSync;
  let encoding = "utf-8";
  let userArgs = process.argv.slice(2);
  let validater = fs.existsSync;
  console.log(runTail(reader, encoding, userArgs, validater));
};

main();