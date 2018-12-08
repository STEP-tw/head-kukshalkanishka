const parseIfOptionProvided = function(option, count, userArgs) {
  let index = 1;
  if (count === '') {
    index = 2;
    count = userArgs[1];
  }
  filePaths = userArgs.slice(index);
  return { option, count, filePaths };
};

const matchAlphabet = function(value) {
  return value.match('-[a-z]');
}

const parseInput = function(userArgs) {
  let option;
  let count;
  let index = 0;
  let matchedDetail = matchAlphabet(userArgs[0]);

  if (matchedDetail) {
   let option = matchedDetail[0];
   let count = userArgs[0].substr(2);
    return parseIfOptionProvided(option, count, userArgs);
  }

  let num = userArgs[0].match(/^-[0-9]/);
  if (num) {
    count = userArgs[0].slice(1);
    index = 1;
  }

  filePaths = userArgs.slice(index);
  return { option, count, filePaths };
};

exports.parseInput = parseInput;
