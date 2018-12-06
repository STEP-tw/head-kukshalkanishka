const assert = require("assert");
const {read,
  createDetailsOf,
  getLinesFromTop,
  getCharFromBeginning,
  filter,
  head,
  runHead} = require("../src/headLib.js");

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

let validater = function(file) {
  if(file){
    return true;
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

    let actualOutput = createDetailsOf(readHelloWorld, ["../testFile"], "utf8", validater);
    let expectedOutput = [{fileName : "../testFile", content: "helloWorld"}];

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return an array of same length as num of files provided", function() {

    let files = ["../testFile1", "../testFile2"];
    let actualOutput = createDetailsOf(readHelloWorld, files, "utf8", validater);
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
    let actualOut = filter(getLinesFromTop, [{fileName : "file1" , content : file1Content}], 0, validater);

    assert.deepEqual(actualOut, "");
  });

  it("should return a string with num of lines equal to the required num of lines", function() {

    let actualOut = filter(getLinesFromTop, [{fileName : "file1" , content : file1Content}], 2, validater);
    let expectedOutput = "this is a line 1\n"+
                         "this is a line 2";


    assert.deepEqual(actualOut, expectedOutput);
  });

  it("should return an empty string when number of char required is 0", function() {
    let actualOut = filter(getCharFromBeginning, [{fileName : "file1" , content : file1Content}], 0, validater);

    assert.deepEqual(actualOut, "");
  });

  it("should return string of length equal to the num of char required", function() {
    let actualOut = filter(getCharFromBeginning, [{fileName : "file1" , content : file1Content}], 2, validater);

    assert.deepEqual(actualOut, "th");
  });
});

describe("head", function() {
  let file1Content = "this is a line 1\n" +
                     "this is a line 2\n" +
                     "this is a line 3\n" +
                     "this is a line 4 \n";

  it("should return an empty string when number of lines required is 0 ", function() {
    let actual = head([{fileName : "file1" , content : file1Content}], {numericOption: 0, option:"-n"}, validater);
    assert.deepEqual(actual, "");
  });

  it("should return a string with num of lines equal to the required num of lines", function() {

    let actualOutput = head([{fileName : "file1" , content : file1Content}], 
                       {numericOption: 2, option:"-n"}, validater);
    let expectedOutput = "this is a line 1\n"+
                         "this is a line 2";

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return an empty string when number of char required is 0", function() {
    let actual = head([{fileName : "file1" , content : file1Content}], {numericOption: 0, option:"-c"},validater);
    assert.deepEqual(actual, "");
  });

  it("should return string of length equal to the num of char required", function() {
    let actual = head([{fileName : "file1" , content : file1Content}], {numericOption: 2, option:"-c"},validater);
    assert.deepEqual(actual, "th");
  });
});

describe("runHead", function() {
  describe("error handling", function() {
    it("should provide error message when negative line count is given", function() {
      let actualOutput = runHead(readHelloWorld, "utf-8", ["-n", "-12", "file1"], validater);
      let expectedOutput = "head: illegal line count -- -12"

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should provide error message when negative byte count is given", function() {
      let actualOutput = runHead(readHelloWorld, "utf-8", ["-c", "-12", "file1"], validater);
      let expectedOutput = "head: illegal byte count -- -12"

      assert.deepEqual(actualOutput, expectedOutput);
    });
    
    it("should provide error message when invalid option is given", function() {
      let actualOutput = runHead(readHelloWorld, "utf-8", ["-v", "-12", "file1"], validater);
      let expectedOutput = "head: illegal option -- v\n" +
                           "usage: head [-n lines | -c bytes] [file ...]";
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should provide error message when invalid option is given", function() {
      let actualOutput = runHead(readHelloWorld, "utf-8", ["-v", "-12", "file1"], validater);
      let expectedOutput = "head: illegal option -- v\n" +
                           "usage: head [-n lines | -c bytes] [file ...]";
      assert.deepEqual(actualOutput, expectedOutput);
    });

     it("should provide error message when invalid line count is 0", function() {
      let actualOutput = runHead(readHelloWorld, "utf-8", ["-n", "0", "file1"], validater);
      let expectedOutput = "head: illegal line count -- 0";

         assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should provide error message when invalid line count is 0", function() {
      let actualOutput = runHead(readHelloWorld, "utf-8", ["-c", "0", "file1"], validater);
      let expectedOutput = "head: illegal byte count -- 0";

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should provide error message when invalid byte count is a alphabet", function() {
      let actualOutput = runHead(readHelloWorld, "utf-8", ["-c", "xy", "file1"], validater);
      let expectedOutput = "head: illegal byte count -- xy";

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should provide error message when invalid line count is a alphabet", function() {
      let actualOutput = runHead(readHelloWorld, "utf-8", ["-n", "xy", "file1"], validater);
      let expectedOutput = "head: illegal line count -- xy";

      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});

