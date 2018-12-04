const assert = require("assert");
const {read,
  fileDetail} = require("../src/headLib.js");

let readHelloWorld = (file, encoding) => "helloWorld";
let readEmptyFile = (file, encoding) => "";

describe("read", function() {

  it("should return the content(\"string\") of provided file", function() {
    assert(read("../testFile", readHelloWorld, "utf8"), "helloWorld");
  });

  it("should return an empty string when an empty file is provided", function() {
    assert.deepEqual(read("../testFile", readEmptyFile, "utf8"), "");
  });
});
