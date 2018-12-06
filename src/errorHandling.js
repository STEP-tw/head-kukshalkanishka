const validate = function(input, validater) {

  let choices = {"-n" : "line", "-c" : "byte"};
  if(input.option != undefined && input.option != "-n" && input.option != "-c"){
    return "head: illegal option -- " +
      input.option.substr(1) + 
      "\nusage: head [-n lines | -c bytes] [file ...]";
  }

  let isAlphaMatched = input.numericOption != undefined && input.numericOption.match(/[a-zA-Z]/);

  if(input.numericOption <= 0 || isAlphaMatched){
    return "head: illegal " + choices[input.option] + " count -- " + input.numericOption;
  }
}

exports.validate = validate;
