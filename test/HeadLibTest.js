const assert = require("assert");
const {read,
  createDetailsOf,
  getLinesFromTop,
  getCharFromBeginning,
  filter,
  head} = require("../src/headLib.js");

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
      assert.deepEqual(read(readHelloWorld, "../testFile", "utf8"), "helloWorld");
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

describe("getLinesFromTop", function() {
  let file1Content = "this is a line 1\n" +
                     "this is a line 2\n" +
                     "this is a line 3\n" +
                     "this is a line 4 \n";

  it("should return an empty string when number of lines required is 0", function() {
    assert.deepEqual(getLinesFromTop(file1Content, 0), "");
  });

  it("should return a string of length equal to the num of lines", function() {

    let expectedOutput = "this is a line 1\n"+
                         "this is a line 2"; 

    assert.deepEqual(getLinesFromTop(file1Content, 2), expectedOutput);
  });
});

describe("getCharFromBeginning", function() {
  let file1Content = "this is a line 1\n" +
                     "this is a line 2\n" +
                     "this is a line 3\n" +
                     "this is a line 4 \n";

  it("should return an empty string when bytes required is 0", function() {
    assert.deepEqual(getCharFromBeginning(file1Content, 0), "");
  });

  it("should return string of length equal to the bytes required", function() {

    assert.deepEqual(getCharFromBeginning(file1Content, 2), "th");
  });
});

describe("filter", function() {
  let file1Content = "this is a line 1\n" +
                     "this is a line 2\n" +
                     "this is a line 3\n" +
                     "this is a line 4 \n";

  it("should return an empty string when number of lines required is 0 ", function() {
    assert.deepEqual(filter(getLinesFromTop, [{fileName : "file1" , content : file1Content}], 0), "");
  });

  it("should return a string with num of lines equal to the required num of lines", function() {

    let expectedOutput = "this is a line 1\n"+
                         "this is a line 2";

    assert.deepEqual(filter(getLinesFromTop, [{fileName : "file1" , content : file1Content}], 2), expectedOutput);
  });

  it("should return an empty string when number of char required is 0", function() {
    assert.deepEqual(filter(getCharFromBeginning, [{fileName : "file1" , content : file1Content}], 0), "");
  });

  it("should return string of length equal to the num of char required", function() {
    assert.deepEqual(filter(getCharFromBeginning, [{fileName : "file1" , content : file1Content}], 2), "th");
  });
});

describe("head", function() {
  let file1Content = "this is a line 1\n" +
                     "this is a line 2\n" +
                     "this is a line 3\n" +
                     "this is a line 4 \n";

  it("should return an empty string when number of lines required is 0 ", function() {
    assert.deepEqual(head([{fileName : "file1" , content : file1Content}], {numericOption: 0, option:"-n"}), "");
  });

  it("should return a string with num of lines equal to the required num of lines", function() {

    let actualOutput = head([{fileName : "file1" , content : file1Content}], 
                       {numericOption: 2, option:"-n"});
    let expectedOutput = "this is a line 1\n"+
                         "this is a line 2";

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return an empty string when number of char required is 0", function() {
    assert.deepEqual(head([{fileName : "file1" , content : file1Content}], {numericOption: 0, option:"-c"}), "");
  });

  it("should return string of length equal to the num of char required", function() {
    assert.deepEqual(head([{fileName : "file1" , content : file1Content}], {numericOption: 2, option:"-c"}), "th");
  });
});
