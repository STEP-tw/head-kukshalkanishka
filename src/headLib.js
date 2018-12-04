const read = function(reader, file, encoding) {
  return reader( file, encoding);
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

const getCharFromBeginning = function(fileContent, bytesRequired) {
  return fileContent.slice(0, bytesRequired);
}

const filter = function(func, filesDetail, num) {
  let lines = filesDetail.reduce((texts, file) =>{
    if(filesDetail.length >1){
      texts.push(file.fileName);
    }
    texts.push(func(file.content, num));
    return texts;
  }, []);
  return lines.join("\n"); 
}

const head = function(option, filesDetail, num = 10) {
  let func = getLinesFromTop;
  if(option == "c") {
    func = getCharFromBeginning;
  }
  return filter(func, filesDetail, num);
}

exports.read = read;
exports.createDetailsOf = createDetailsOf;
exports.getLinesFromTop = getLinesFromTop;
exports.getCharFromBeginning = getCharFromBeginning;
exports.filter = filter;
exports.head = head;
