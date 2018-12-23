const isCountOption = function(option) {
  return isFinite(option.slice(1, 2)) && option.startsWith("-");
};

const isOptionWithCount = function(option) {
  let regex = /[0-9]/;
  return option.startsWith("-") && regex.test(option.substr(2));
};

const isOptionPresent = function(option) {
  return option.startsWith("-");
};

const parseUsingNum = function(userArgs) {
  let count = userArgs[0].slice(1);
  let filePaths = userArgs.slice(1);
  let option = "-n";
  return { count, filePaths, option };
};

const parseUsingOptionWithCount = function(args) {
  let option = args[0].slice(0, 2);
  let count = args[0].slice(2);
  let filePaths = args.slice(1);
  return { option, count, filePaths };
};

const parseUsingOption = function(args) {
  let option = args[0].slice(0, 2);
  let count = args[1];
  let filePaths = args.slice(2);
  return { option, count, filePaths };
};

const parseInput = function(userArgs) {
  let filePaths = userArgs.slice(0);
  let option = "-n";
  let count = 10;

  if (isCountOption(userArgs[0])) {
    return parseUsingNum(userArgs);
  }

  if (isOptionWithCount(userArgs[0])) {
    return parseUsingOptionWithCount(userArgs);
  }

  if (isOptionPresent(userArgs[0])) {
    return parseUsingOption(userArgs);
  }
  return { filePaths, option, count };
};

exports.parseInput = parseInput;
