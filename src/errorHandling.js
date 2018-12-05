const validate = function(inputs) {
  let isAlphaMatched = inputs.numericOption != undefined && inputs.numericOption.match(/[a-zA-Z]/);
  if(inputs.numericOption <= 0 || isAlphaMatched){
    return "head: illegal line count -- " + inputs.numericOption;
  }
}

exports.validate = validate;
