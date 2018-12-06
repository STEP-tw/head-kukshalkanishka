const {parseInput} = require('./utilLib.js');
const {validate} = require('./errorHandling.js');

const read = function(reader, file, encoding) {
  return reader( file, encoding);
}

const createDetailsOf = function(reader, files, encoding, validater) {
  return files.map((fileName) => {
    let content = null;
    if(validater(fileName)) {
    content = read(reader, fileName, encoding);
    }
    return {fileName, content};
  });
}

const getLinesFromTop = function(fileContent, numOfLines){
  lines = fileContent.split("\n");
  requiredLines = lines.slice(0,numOfLines);
  return requiredLines.join("\n");
}

const getCharFromBeginning = function(fileContent, bytesRequired) {
  return fileContent.slice(0, bytesRequired);
}

const createHeading = function(file, delimiter) {
  return delimiter + "==> " + file.fileName + " <==";
}

const filter = function(func, filesDetail, num) {
  let delimiter = "";
  let lines = filesDetail.reduce((texts, file) =>{
    if(file.content == null) {
      texts.push("head: "+file.fileName+": No such file or directory");
      return texts;
    }
    if(filesDetail.length > 1) {
      texts.push(createHeading(file, delimiter));
    }
    delimiter = "\n";
    texts.push(func(file.content, num));
    return texts;
  }, []);
  return lines.join("\n"); 
}

const head = function(filesDetail, {option, numericOption = 10}) {
  let func = getLinesFromTop;
  if(option == "-c") {
    func = getCharFromBeginning;
  }
  return filter(func, filesDetail, numericOption);
}

const runHead = function(reader, encoding, userArgs, validater) {
  let parsedInput = parseInput(userArgs);
  if(validate(parsedInput)){
    return validate(parsedInput);
  }
  let fileDetails = createDetailsOf(reader, parsedInput.filePaths, encoding, validater);
  return head(fileDetails, parsedInput);
}

exports.read = read;
exports.createDetailsOf = createDetailsOf;
exports.getLinesFromTop = getLinesFromTop;
exports.getCharFromBeginning = getCharFromBeginning;
exports.filter = filter;
exports.head = head;
exports.runHead = runHead;
