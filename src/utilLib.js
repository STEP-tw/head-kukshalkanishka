const parseInput = function(userArgs) {
  let option = undefined;
  let numericOption = undefined;
  let index = 0;

  let optionDetail = userArgs[0].match("-n|-c");
  if(optionDetail){
    option = optionDetail[0];
    numericOption = userArgs[0].substr(2);
    index = 1;
    if(numericOption === "") {
      index = 2
      numericOption = userArgs[1];
    }
  }

  let num = userArgs[0].match(/^-[0-9]/);
  if(num) {
    numericOption = userArgs[0].slice(1);
    index = 1;
  }

  filePaths = userArgs.slice(index);
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
