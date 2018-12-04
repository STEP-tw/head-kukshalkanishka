const read = function(reader, file, encoding) {
  return reader(file, encoding);
}

const createDetailsOf = function(reader, files, encoding) {
  return files.map((fileName) => {
    let content = read(reader, fileName, encoding);
    return {fileName, content};
  });
}

exports.read = read;
exports.createDetailsOf = createDetailsOf;
