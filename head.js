const fs = require('fs');
const {head, createDetailsOf} = require('./src/headLib.js');
const {parseInput} = require('./src/utilLib.js');
const {validate} = require('./src/errorHandling.js');

const main = function(){
  let parsedInput = parseInput(process.argv.slice(2));
  if(validate(parsedInput)){
    return validate(parsedInput);
  }
  let fileDetails = createDetailsOf(fs.readFileSync, parsedInput.filePaths, "utf-8");
  return head(fileDetails, parsedInput);
}

console.log(main());

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

