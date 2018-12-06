const validate = function(input, validater) {
  let choices = { '-n': 'line', '-c': 'byte' };
  if (
    input.option != undefined &&
    input.option != '-n' &&
    input.option != '-c'
  ) {
    return (
      'head: illegal option -- ' +
      input.option.substr(1) +
      '\nusage: head [-n lines | -c bytes] [file ...]'
    );
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
