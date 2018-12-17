 const assert = require("assert");
 const {
  read,
  createDetailsOf,
  getLines,
  filterRequiredContents,
  runHead,
  getChars,
  fetchFromBeginning,
  fetchFromEnd,
  runTail
} = require("../src/lib.js");

const mockReader = function(expectedFiles) {
  return function(actualPath) {
    return expectedFiles[actualPath];
  };
};

const mockValidator = function(expectedFiles) {
  return function(actualPath) {
    if(expectedFiles[actualPath]){
      return true;
    }
    return false;
  }
}

describe("read", function() {
  it("should return a string i.e the whole content of provided file", function() {
    let readHelloWorld = mockReader({"../testFile": "helloWorld"});

    assert.deepEqual(read(readHelloWorld, "../testFile"), "helloWorld");
  });

  it("should return an empty string when an empty file is provided", function() {
    let readEmptyFile = mockReader({"../testEmptyFile": ""});

    assert.deepEqual(read(readEmptyFile, "../testEmptyFile"), "");
  });
});

describe("createDetailsOf", function() {

  it("should return an array of an object of file detail when a file is provided", function() {
    let validator = mockValidator({'../testFile': 'helloWorld'});    
    let readHelloWorld = mockReader({'../testFile': "helloWorld"});
    let actualOutput = createDetailsOf(
      readHelloWorld,
      ["../testFile"],
      validator
    );
    let expectedOutput = [{ fileName: "../testFile", content: "helloWorld" }];

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return an array of file detail object of same length as num of files provided", function() {
    let validator = mockValidator({'../testFile1': 'helloWorld', '../testFile2': 'file2Content'});
    let readHelloWorld = mockReader({'../testFile1': 'helloWorld', '../testFile2': 'file2Content'});
    let files = ["../testFile1", "../testFile2"];
    let actualOutput = createDetailsOf(readHelloWorld, files, validator);
    let expectedOutput = [
      { fileName: "../testFile1", content: "helloWorld" },
      { fileName: "../testFile2", content: "file2Content" }
    ];

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return null value for file content when file path is invalid", function() {
    let readHelloWorld = mockReader({'../testFile1': 'helloWorld', '../testFile2': 'file2Content'});
    let validator = mockValidator({'../testFile1': 'helloWorld', '../testFile2': 'file2Content'});
    let files = ["../testFile", "../testFile3"];
    let actualOutput = createDetailsOf(readHelloWorld, files, validator);
    let expectedOutput = [
      { fileName: "../testFile", content: null },
      { fileName: "../testFile3", content: null }
    ];

    assert.deepEqual(actualOutput, expectedOutput);
  });
});

describe("filterRequiredContents", function() {
  let file1Content =
    "this is a line 1\n" +
    "this is a line 2\n" +
    "this is a line 3\n" +
    "this is a line 4 \n";

  it("should return an array with a file path and an empty string when required lines is 0 ", function() {
    let actual = filterRequiredContents(
      [{ fileName: "file1", content: file1Content }],
      {
        count: 0,
        option: "-n"
      },
      fetchFromBeginning,
      'head'
    );

    assert.deepEqual(actual, ["==> file1 <==", ""]);
  });

  it("should return an array with file path and lines of fileContent equal to the count", function() {
    let actualOutput = filterRequiredContents(
      [{ fileName: "file1", content: file1Content }],
      { count: 2, option: "-n" },
      fetchFromBeginning,
      'head'
    );
    let expectedOutput = [
      "==> file1 <==",
      "this is a line 1\nthis is a line 2"
    ];

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return an array with file name and an empty string when char count is 0", function() {
    let actual = filterRequiredContents(
      [{ fileName: "file1", content: file1Content }],
      {count: 0, option: "-c"},
      fetchFromBeginning,
      'head'
    );
    assert.deepEqual(actual, ["==> file1 <==", ""]);
  });

  it("should return an array of error message when file content is null ", function() {
    let actual = filterRequiredContents(
      [{ fileName: "file1", content: null }],
      {count: 0, option: "-n"},
      fetchFromBeginning,
      'head'
    );

    assert.deepEqual(actual, ["head: file1: No such file or directory"]);
  });

  it("should return an array with file name  and string of length equal to char count", function() {
    let actual = filterRequiredContents(
      [{ fileName: "file1", content: file1Content }],
      {count: 2, option: "-c"},
      fetchFromBeginning,
      'head'
    );
    assert.deepEqual(actual, ["==> file1 <==", "th"]);
  });

  it("should return required file content with file names when multiple files are provided", function() {
    let actual = filterRequiredContents(
      [
        { fileName: "file1", content: file1Content },
        { fileName: "file2", content: file1Content }
      ],
      { count: 2, option: "-c" },
      fetchFromBeginning,
      'head'
    );
    assert.deepEqual(actual, ["==> file1 <==", "th", "==> file2 <==", "th"]);
  });
});

describe("Head", function() {
  
  describe("runHead for basic operations", function() {
    let file1Content =
      "this is a line 1\n" +
      "this is a line 2\n" +
      "this is a line 3\n" +
      "this is a line 4";
    
      let readFile1 = mockReader({'file1': file1Content});
      let validator = mockValidator({'file1': file1Content});

      it("should return a single line string required num of line is 1", function() {
      let actual = runHead(readFile1, ["-n", "1", "file1"], validator);

      assert.deepEqual(actual, "this is a line 1");
    });

    it('should return whole file content when required number of lines is equal to size of file', function() {
      let actual1 = runHead(readFile1, ["-n", "4", "file1"], validator);
      let expected1 = 
      "this is a line 1\n" +
      "this is a line 2\n" +
      "this is a line 3\n" +
      "this is a line 4";

      assert.deepEqual(actual1, expected1);
    });

    it("should return a single charactor string when required num of chars is 1", function() {
      let actual = runHead(readFile1, ["-c", "1", "file1"], validator);

      assert.deepEqual(actual, "t");
    });

    it("should return a string with num of chars equal to required num of chars", function() {
      let actual1 = runHead(readFile1, ["-c", "4", "file1"], validator);

      assert.deepEqual(actual1, "this");
    });
  });

  describe("error handling", function() {
  let validator = mockValidator({"file1": 'helloWorld'});
  let readHelloWorld = mockReader({"file1": "helloWorld"});

    it("should provide error message when negative line count is given", function() {
      let actualOutput = runHead(
        readHelloWorld,
        ["-n", "-12", "file1"],
        validator
      );
      let expectedOutput = "head: illegal line count -- -12";

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should provide error message when negative byte count is given", function() {
      let actualOutput = runHead(
        readHelloWorld,
        ["-c", "-12", "file1"],
        validator
      );
      let expectedOutput = "head: illegal byte count -- -12";

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should provide error message when invalid option is given", function() {
      let actualOutput = runHead(
        readHelloWorld,
        ["-v", "-12", "file1"],
        validator
      );
      let expectedOutput =
        "head: illegal option -- v\n" +
        "usage: head [-n lines | -c bytes] [file ...]";

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should provide error message when invalid option is given", function() {
      let actualOutput = runHead(
        readHelloWorld,
        ["-v", "-12", "file1"],
        validator
      );
      let expectedOutput =
        "head: illegal option -- v\n" +
        "usage: head [-n lines | -c bytes] [file ...]";

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should provide error message when invalid line count is 0", function() {
      let actualOutput = runHead(
        readHelloWorld,
        ["-n", "0", "file1"],
        validator
      );
      let expectedOutput = "head: illegal line count -- 0";

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should provide error message when invalid line count is 0", function() {
      let actualOutput = runHead(
        readHelloWorld,
        ["-c", "0", "file1"],
        validator
      );
      let expectedOutput = "head: illegal byte count -- 0";

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should provide error message when invalid byte count is a alphabet", function() {
      let actualOutput = runHead(
        readHelloWorld,
        ["-c", "xy", "file1"],
        validator
      );
      let expectedOutput = "head: illegal byte count -- xy";

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should provide error message when invalid line count is a alphabet", function() {
      let actualOutput = runHead(
        readHelloWorld,
        ["-n", "xy", "file1"],
        validator
      );
      let expectedOutput = "head: illegal line count -- xy";

      assert.deepEqual(actualOutput, expectedOutput);
    });
  });

});

describe("getLines", function() {
  let file1Content =
    "this is a line 1\n" +
    "this is a line 2\n" +
    "this is a line 3\n" +
    "this is a line4";

  it("should return an empty string when lines required is 0", function() {
    assert.deepEqual(getLines(file1Content, 0, fetchFromBeginning), "");
    assert.deepEqual(getLines(file1Content, 0, fetchFromEnd), "");
  });

  it("should return specified number of lines from bottom when fetcher is getLinesFromBottom", function() {
    let expectedOutput = "this is a line 3\n" + "this is a line4";
    assert.deepEqual(getLines(file1Content, 2, fetchFromEnd), expectedOutput);
  });
});

describe("getChars", function() {
  let file1Content =
    "this is a line 1\n" +
    "this is a line 2\n" +
    "this is a line 3\n" +
    "this is a line4";

  it("should return an empty string when bytes required is 0", function() {
    assert.deepEqual(getChars(file1Content, 0, fetchFromBeginning), "");
  });

  it("should return an empty array when bytes required is 0", function() {
    assert.deepEqual(getChars(file1Content, 0, fetchFromEnd), [""]);
  });
  it("should return specified number of lines from bottom when fetcher is getLinesFromBottom", function() {
    assert.deepEqual(getChars(file1Content, 2, fetchFromEnd), "e4");
  });
});

describe("run tail", function() {

  describe("runTail basic operation", function() {
    let file1Content =
      "this is a line 1\n" +
      "this is a line 2\n" +
      "this is a line 3\n" +
      "this is last line";    

    let file2Content = "this is a single line file";
    let readFile1 = mockReader({'file1': file1Content});
    let validator = mockValidator({'file1': file1Content});

    it("should return one line content from end of file when the required num of lines is 1", function() {
      let actual = runTail(readFile1, ["-n", "1", "file1"], validator);

      assert.deepEqual(actual, "this is last line");
    });

    it('should return the whole file when required num of lines is equal to file length', function(){
      let actual = runTail(readFile1, ["-n", "4", "file1"], validator);
      let expected =
      "this is a line 1\n" +
      "this is a line 2\n" +
      "this is a line 3\n" +
      "this is last line"; 

      assert.deepEqual(actual, expected);
    });

    it("should return a charactor required num of chars is 1", function() {
      let actual = runTail(readFile1, ["-c", "1", "file1"], validator);

      assert.deepEqual(actual, "e");
    });

    it("should return required num of chars from end of the file", function() {
      let actual1 = runTail(readFile1, ["-c", "4", "file1"], validator);

      assert.deepEqual(actual1, "line");
    });

    it("should return required chars with heading of each file when more than a file is given", function() {
      let reader = mockReader({'file1':file1Content, 'file2': file2Content});
      let validator = mockValidator({'file1':file1Content, 'file2': file2Content});
      let actual = runTail(reader, ["-c", "2", "file1", "file2"],validator);

      assert.deepEqual(actual, "==> file1 <==\nne\n==> file2 <==\nle");
    });
  });

  describe("error handling", function() {
    let validator = mockValidator({'file1': 'helloWorld'});
    let readHelloWorld = mockReader({"file1": "helloWorld"});

    it("should provide error message when invalid option is given", function() {
      let actualOutput = runTail(
        readHelloWorld,
        ["-v", "-12", "file1"],
        validator
      );
      let expectedOutput =
        "tail: illegal option -- v\n" +
        "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should provide error message when invalid byte count is a alphabet", function() {
      let actualOutput = runTail(
        readHelloWorld,
        ["-c", "xy", "file1"],
        validator
      );
      let expectedOutput = "tail: illegal offset -- xy";

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it("should provide error message when invalid line count is a alphabet", function() {
      let actualOutput = runTail(
        readHelloWorld,
        ["-n", "xy", "file1"],
        validator
      );
      let expectedOutput = "tail: illegal offset -- xy";

      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});
