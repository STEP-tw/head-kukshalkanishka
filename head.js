const fs = require('fs');
const {createDetailsOf,
  head} = require('./src/headLib.js');
const {filterNumber,
  filterOption, 
  filterFilePaths} = require('./src/utilLib.js');

const main = function(){
  let filePaths = filterFilePaths(process.argv);
  let fileDetails = createDetailsOf(fs.readFileSync, filePaths, "utf-8");
  let option = filterOption(process.argv);  
  let numericChoice = filterNumber(process.argv);
  console.log(head(option, fileDetails, numericChoice));
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

