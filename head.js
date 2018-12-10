const fs = require("fs");
const { runHead } = require("./src/lib.js");

const main = function() {
  let reader = fs.readFileSync;
  let encoding = "utf-8";
  let userArgs = process.argv.slice(2);
  let validater = fs.existsSync;
  console.log(runHead(reader, encoding, userArgs, validater));
};

main();
