const isLineOption = option => option == "-n";

const isCharOption = option => option == "-c";

const isOptionInValid = option =>
  !isLineOption(option) && !isCharOption(option);

const isNegativeOrZero = num => num <= 0;

const isHeadCountInvalid = count =>
  isNegativeOrZero(count) || isNaN(count);

const validateHead = function(params) {
  const usage = "usage: head [-n lines | -c bytes] [file ...]";
  let choices = { "-n": "line", "-c": "byte" };

  if (isOptionInValid(params.option)) {
    return "head: illegal option -- " + params.option.substr(1) + "\n" + usage;
  }
  if (isHeadCountInvalid(params.count)) {
    return (
      "head: illegal " + choices[params.option] + " count -- " + params.count
    );
  }
};

const validateTail = function(params) {
  const usage =
    "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
  let choices = { "-n": "line", "-c": "byte" };
  
  if (isOptionInValid(params.option)) {
    return "tail: illegal option -- " + params.option.substr(1) + "\n" + usage;
  }
  if (isNaN(params.count)) {
    return "tail: illegal offset -- " + params.count;
  }
};

const existanceErrorMessage = function(command, filePath) {
  return command + ": " + filePath + ": No such file or directory";
};

exports.isOptionInValid = isOptionInValid;
exports.isNegativeOrZero = isNegativeOrZero;
exports.isLineOption = isLineOption;
exports.isCharOption = isCharOption;
exports.validateHead = validateHead;
exports.validateTail = validateTail;
exports.existanceErrorMessage = existanceErrorMessage;
