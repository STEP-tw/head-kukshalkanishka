const getOption = function(optionDetail, userArgs){
  option = optionDetail[0];
  count = userArgs[0].substr(2);
  index = 1;
  if(count === "") {
    index = 2
    count = userArgs[1];
  }
  filePaths = userArgs.slice(index);
  return {option, count, filePaths};
}

const parseInput = function(userArgs) {
  let option;
  let count;
  let index = 0;

  let optionDetail = userArgs[0].match("-[a-z]");
  if(optionDetail){
    return getOption(optionDetail, userArgs); 
  }

  let num = userArgs[0].match(/^-[0-9]/);
  if(num) {
    count = userArgs[0].slice(1);
    index = 1;
  }
  filePaths = userArgs.slice(index);
  return {option, count, filePaths};
}

exports.parseInput = parseInput;
