const fs = require('fs');
const {createDetailsOf,
  head} = require('./src/headLib.js');
const {parseInput} = require('./src/utilLib.js');

const main = function(){
  let parsedInput = parseInput(process.argv);
  let fileDetails = createDetailsOf(fs.readFileSync, parsedInput.filePaths, "utf-8");
  console.log(head(fileDetails, parsedInput));
}

main();

/* 
  Usage:
  node ./head.js file1
  node ./head.js -n5 file1
  node ./head.js -n 5 file1
  node ./head.js -5 file1
  node ./head.js file1 file2
  node ./head.js -n 5 file1 file2
  node ./head.js -n5 file1 file2
  node ./head.js -5 file1 file2 
  node ./head.js -c5 file1
  node ./head.js -c 5 file1
  node ./head.js -c5 file1 file2
  node ./head.js -c 5 file1 file2
*/

