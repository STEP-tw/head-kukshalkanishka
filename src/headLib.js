const { parseInput } = require('./utilLib.js');
const { validate } = require('./errorHandling.js');

const read = function(reader, file, encoding) {
  return reader(file, encoding);
};

const createDetailsOf = function(reader, files, encoding, validater) {
  return files.map(fileName => {
    let content = null;
    if (validater(fileName)) {
      content = read(reader, fileName, encoding);
    }
    return { fileName, content };
  });
};

const getLinesFromTop = function(fileContent, numOfLines) {
  lines = fileContent.split('\n');
  requiredLines = lines.slice(0, numOfLines);
  return requiredLines.join('\n');
};

const getCharFromBeginning = function(fileContent, bytesRequired) {
  return fileContent.slice(0, bytesRequired);
};

const createHeading = function(file, delimiter) {
  return delimiter + '==> ' + file.fileName + ' <==';
};

const selector = function(option) {
  let func = getLinesFromTop;
  if (option == '-c') {
    func = getCharFromBeginning;
  }
  return func;
};

const head = function(fileDetails, { option, count = 10 }) {
  let delimiter = '';
  let fetcher = selector(option);
  let lines = fileDetails.reduce((texts, file) => {
    if (file.content == null) {
      texts.push('head: ' + file.fileName + ': No such file or directory');
      return texts;
    }
    if (fileDetails.length > 1) {
      texts.push(createHeading(file, delimiter));
    }
    delimiter = '\n';
    texts.push(fetcher(file.content, count));
    return texts;
  }, []);
  return lines.join('\n');
};

const runHead = function(reader, encoding, userArgs, validater) {
  let parsedInput = parseInput(userArgs);
  if (validate(parsedInput)) {
    return validate(parsedInput);
  }
  let fileDetails = createDetailsOf(
    reader,
    parsedInput.filePaths,
    encoding,
    validater
  );
  return head(fileDetails, parsedInput);
};

exports.read = read;
exports.createDetailsOf = createDetailsOf;
exports.getLinesFromTop = getLinesFromTop;
exports.getCharFromBeginning = getCharFromBeginning;
exports.head = head;
exports.selector = selector;
exports.runHead = runHead;
