const isLineOption = function(option) {
  return option == "-n";
}

const isCharOption = function(option) {
  return option == "-c";
}

const isUndefined = function(option) {
  return option == undefined;
}

const isOptionInValid = function(option) {
  return !isUndefined(option) && !isLineOption(option) && !isCharOption(option);
}

const isNegativeOrZero = function(num) {
  return num <= 0;
}

const isCountInvalid = function(count) {
  return isNegativeOrZero(count) || !isUndefined(count) && isNaN(count);
}

const usage = 'usage: head [-n lines | -c bytes] [file ...]';

const validate = function(input, validater) {
  let choices = { '-n': 'line', '-c': 'byte' };

  if (isOptionInValid(input.option)) {
    return ('head: illegal option -- ' +input.option.substr(1) + '\n' +usage);
  }

  if (isCountInvalid(input.count)) {
    return (
      'head: illegal ' + choices[input.option] + ' count -- ' + input.count
    );
  }
};

exports.validate = validate;
