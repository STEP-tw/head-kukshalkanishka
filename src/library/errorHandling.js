const isLineOption = option => option == "-n";

const isCharOption = option => option == "-c";

const isOptionInValid = option =>
  !(isLineOption(option) || isCharOption(option));

const isNegativeOrZero = num => num <= 0;

const isHeadCountInvalid = count => isNegativeOrZero(count) || isNaN(count);

const validateHead = function(params) {
  const usage = "usage: head [-n lines | -c bytes] [file ...]";
  let choices = { "-n": "line", "-c": "byte" };
  let message = "";
  let isInvalid = false;

  if (isOptionInValid(params.option)) {
    message =
      "head: illegal option -- " + params.option.substr(1) + "\n" + usage;
    isInvalid = true;
  }
  if (isHeadCountInvalid(params.count)) {
    message =
      "head: illegal " + choices[params.option] + " count -- " + params.count;
    isInvalid = true;
  }
  return { message, isInvalid };
};

const validateTail = function(params) {
  const usage =
    "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
  let message = "";
  let isInvalid = false;

  if (isOptionInValid(params.option)) {
    (message =
      "tail: illegal option -- " + params.option.substr(1) + "\n" + usage),
      (isInvalid = true);
  }

  if (isNaN(params.count)) {
    (message = "tail: illegal offset -- " + params.count), (isInvalid = true);
  }

  return { message, isInvalid };
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
