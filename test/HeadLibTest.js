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
      assert(read(readHelloWorld, "../testFile", "utf8"), "helloWorld");
    });

    it("should return an empty string when an empty file is provided", function() {
      assert.deepEqual(read(readEmptyFile, "../testFileEmpty", "utf8"), "");
    });
  });

describe("createDetailsOf", function() {

  it("should return an array of an object of file detail  when a file is provided", function() {

    let actualOutput = createDetailsOf(readHelloWorld, ["../testFile"], "utf8");
    let expectedOutput = [{fileName : "../testFile", content: "helloWorld"}];

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return an array of same length as num of files provided", function() {

    let files = ["../testFile1", "../testFile2"];
    let actualOutput = createDetailsOf(readHelloWorld, files, "utf8");
    let expectedOutput = [{fileName : "../testFile1", content: "helloWorld"},
                          {fileName : "../testFile2", content : "helloWorld"}];

    assert.deepEqual(actualOutput, expectedOutput);
  });
});
