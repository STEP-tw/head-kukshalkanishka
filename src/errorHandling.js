const isLineOption = option => option == "-n";

const isCharOption = option => option == "-c";

const isUndefined = option => option == undefined;

const isOptionInValid = option =>
  !isUndefined(option) && !isLineOption(option) && !isCharOption(option);

const isNegativeOrZero = num => num <= 0;

const isCountInvalid = count => !isUndefined(count) && isNaN(count);

const isHeadCountInvalid = count =>
  isNegativeOrZero(count) || isCountInvalid(count);

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
  if (isCountInvalid(params.count)) {
    return "tail: illegal offset -- " + params.count;
  }
};

exports.isOptionInValid = isOptionInValid;
exports.isCountInvalid = isCountInvalid;
exports.isUndefined = isUndefined;
exports.isNegativeOrZero = isNegativeOrZero;
exports.isLineOption = isLineOption;
exports.isCharOption = isCharOption;
exports.validateHead = validateHead;
exports.validateTail = validateTail;
