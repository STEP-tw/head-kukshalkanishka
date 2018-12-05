const filterOption = function(userInput) {
  optionDetail = userInput[2].match("-n|-c");
  if(optionDetail){
    return optionDetail[0];
  }
}

const filterNumber = function(userInput) {
  let numSearchDetail = userInput.join(" ").match(/[0-9]/);
  if(numSearchDetail){
    return +numSearchDetail[0];
  }
}

const filterFilePaths = function(userInput) {
  let matchedDetail = userInput.join(" ").match(/[0-9]/);
  if(matchedDetail) {
    numIndex = matchedDetail.index;
  return userInput.join(" ").slice(numIndex+2).split(" ");
  }
  return userInput.slice(2);
}

exports.filterNumber = filterNumber;
exports.filterOption = filterOption;
exports.filterFilePaths = filterFilePaths;
