const parseInput = function(userArgs) {
  let option = "";
  let numericOption = 10;
  let filePaths = userArgs.slice(2);

  let optionDetail = userArgs[2].match("-n|-c");
  if(optionDetail){
    option = optionDetail[0];
    numericOption = +userArgs[2].substr(2); 
    filePaths = userArgs.slice(3);
  }
  if(numericOption == ''){
    numericOption = userArgs[3];
    filePaths = userArgs.slice(4);
  }
  return {option, numericOption, filePaths};
}

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

exports.parseInput = parseInput;
