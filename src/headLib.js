const read = function(file, reader, encoding) {
  let content = reader(file, encoding);
  return content;
}

const createDetailsOf = function(fileName, reader, encoding) {
  let content = read(fileName, reader, encoding);
  return {fileName, content};
}

exports.read = read;
exports.createDetailsOf = createDetailsOf;
