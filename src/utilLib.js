const parseInput = function(userArgs) {
  let option = undefined;
  let numericOption = undefined;
  let index = 0;

  let optionDetail = userArgs[0].match("-[a-z]");
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

exports.parseInput = parseInput;
