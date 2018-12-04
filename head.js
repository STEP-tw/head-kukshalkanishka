const fs = require('fs');
const {createDetailsOf,
  head} = require('./src/headLib.js');

const main = function(){
  let filePaths = process.argv.slice(2);
  let fileDetails = createDetailsOf(fs.readFileSync, filePaths, "utf-8");
  console.log(head("", fileDetails));
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

