const read = function(stringRef, reader) {
  let content = reader(stringRef, "utf8");
  return content;
}

exports.read = read;
