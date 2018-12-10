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

/* 
  Usage:
  node ./tail.js file1
  node ./tail.js -n5 file1
  node ./tail.js -n 5 file1
  node ./tail.js -5 file1
  node ./tail.js file1 file2
  node ./tail.js -n 5 file1 file2
  node ./tail.js -n5 file1 file2
  node ./tail.js -5 file1 file2 
  node ./tail.js -c5 file1
  node ./tail.js -c 5 file1
  node ./tail.js -c5 file1 file2
  node ./tail.js -c 5 file1 file2
*/



