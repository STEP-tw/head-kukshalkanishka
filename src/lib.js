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
  let lines = fileContent.split('\n');
  let requiredLines = lines.slice(0, numOfLines);
  return requiredLines.join('\n');
};

const getLinesFromBottom = function(fileContent, numOfLines) {
  let lines = fileContent.split('\n');
  let length = lines.length;
  let requiredLines = lines.slice(length-1 - numOfLines, length);
  return requiredLines.join('\n');
}

const getCharFromBeginning = function(fileContent, bytesRequired) {
  return fileContent.slice(0, bytesRequired);
};

const getCharFromEnd = function(fileContent, bytesRequired) {
  let length = fileContent.length;
  return fileContent.slice(length - bytesRequired, length);
}

const selector = function(option) {
  let func = getLinesFromTop;
  if (option == '-c') {
    func = getCharFromBeginning;
  }
  return func;
};

const createHeading = function(file, delimiter) {
  return delimiter + '==> ' + file.fileName + ' <==';
};

const noFileOrDirError = function(file){
  return 'head: ' + file + ': No such file or directory';
}

const isNull = function(value) {
  return value == null;
}

const isGreaterThan1 = function(num) {
  return num > 1;
}

const head = function(fileDetails, { option, count = 10 }) {
  let delimiter = '';
  let fetcher = selector(option);
  let lines = fileDetails.reduce((texts, file) => {

    if (isNull(file.content)) {
      texts.push(noFileOrDirError(file.fileName));
      return texts;
    }

    if (isGreaterThan1(fileDetails.length)) {
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
  let fileDetails = createDetailsOf(reader,parsedInput.filePaths,encoding, validater);
  return head(fileDetails, parsedInput);
};

exports.read = read;
exports.createDetailsOf = createDetailsOf;
exports.getLinesFromTop = getLinesFromTop;
exports.getCharFromBeginning = getCharFromBeginning;
exports.head = head;
exports.selector = selector;
exports.runHead = runHead;
exports.getLinesFromBottom = getLinesFromBottom;
exports.getCharFromEnd = getCharFromEnd;