const read = function(file, reader, encoding) {
  let content = reader(file, encoding);
  return content;
}

exports.read = read;
