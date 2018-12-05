const validate = function(inputs) {
  if(inputs.numericOption <= 0){
    return "head: illegal line count -- " + inputs.numericOption;
  }
}

exports.validate = validate;
