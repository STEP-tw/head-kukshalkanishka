const filterOption = function(userInput) {
  let optionDetail = userInput.join(" ").match("-c|-n");
  if(optionDetail){
    return optionDetail[0];
  }
}

const filterNumber = function(userInput) {
  let numSearchDetail = userInput.join(" ").match(/[1-9]/);
  if(numSearchDetail){
    return +numSearchDetail[0];
  }
}

exports.filterNumber = filterNumber;
exports.filterOption = filterOption;
