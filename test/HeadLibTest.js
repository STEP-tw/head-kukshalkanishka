const assert = require("assert");
const {read,
  createDetailsOf} = require("../src/headLib.js");

let readHelloWorld = function(file, encoding) {
  if(file && encoding) {
    return "helloWorld"
  }
};

let readEmptyFile = function(file, encoding) {
  if(file && encoding) {
    return "";
  }
}

describe("read", function() {

  it("should return the content of provided file", function() {
      assert(read("../testFile", readHelloWorld, "utf8"), "helloWorld");
    });

    it("should return an empty string when an empty file is provided", function() {
      assert.deepEqual(read("../testFileEmpty", readEmptyFile, "utf8"), "");
    });
  });

describe("createDetailsOf", function() {

  it("should return an object with keys \"fileName\" and \"content\" when a file is provided", function() {

    let actualOutput = createDetailsOf(["../testFile"], readHelloWorld, "utf8");
    let expectedOutput = [{fileName : "../testFile", content: "helloWorld"}];

    assert.deepEqual(actualOutput, expectedOutput);
  });
});
