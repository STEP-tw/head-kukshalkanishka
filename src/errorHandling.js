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

const usage = 'usage: head [-n lines | -c bytes] [file ...]';


const validate = function(input, validater) {
  let choices = { '-n': 'line', '-c': 'byte' };

  if (isOptionInValid(input.option)) {
    return ('head: illegal option -- ' +input.option.substr(1) + '\n' +usage);
  }

  let isAlphaMatched =
    input.count != undefined && input.count.match(/[a-zA-Z]/);

  if (input.count <= 0 || isAlphaMatched) {
    return (
      'head: illegal ' + choices[input.option] + ' count -- ' + input.count
    );
  }
};

exports.validate = validate;
