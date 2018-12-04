const read = function(reader, file, encoding) {
  return reader(file, encoding);
}

const createDetailsOf = function(reader, files, encoding) {
  return files.map((fileName) => {
    let content = read(reader, fileName, encoding);
    return {fileName, content};
  });
}

const getLinesFromTop = function(fileContent, numOfLines){
  lines = fileContent.split("\n");
  requiredLines = lines.slice(0,numOfLines);
  return requiredLines.join("\n");
}

exports.read = read;
exports.createDetailsOf = createDetailsOf;
exports.getLinesFromTop = getLinesFromTop;
