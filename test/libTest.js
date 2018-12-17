const assert = require("assert");
const {
  read,
  filterContents,
  runHead,
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
    if (expectedFiles[actualPath]) {
      return true;
    }
    return false;
  };
};

describe("read", function() {
  it("should return a string i.e the whole content of provided file", function() {
    let readHelloWorld = mockReader({ "../testFile": "helloWorld" });

    assert.equal(read(readHelloWorld, "../testFile"), "helloWorld");
  });

  it("should return an empty string when an empty file is provided", function() {
    let readEmptyFile = mockReader({ "../testEmptyFile": "" });

    assert.equal(read(readEmptyFile, "../testEmptyFile"), "");
  });
});

describe.skip("formatContents", function() {
  let file1Content =
    "this is a line 1\n" +
    "this is a line 2\n" +
    "this is a line 3\n" +
    "this is a line 4 \n";

  it("should return an array with a file path and an empty string when required lines is 0 ", function() {
    let actual = formatContents(
      {
        count: 0,
        option: "-n"
      },
      filterContents.bind('null', fetchFromBeginning),      
      "head",
    );

    assert.deepEqual(actual, ["==> file1 <==", ""]);
  });

  it("should return an array with file path and lines of fileContent equal to the count", function() {
    let actualOutput = formatContents(
      [{ fileName: "file1", content: file1Content }],
      { count: 2, option: "-n" },
      filterContents.bind('null', fetchFromBeginning),      
      "head"
    );
    let expectedOutput = [
      "==> file1 <==",
      "this is a line 1\nthis is a line 2"
    ];

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return an array with file name and an empty string when char count is 0", function() {
    let actual = formatContents(
      [{ fileName: "file1", content: file1Content }],
      { count: 0, option: "-c" },
      filterContents.bind('null', fetchFromBeginning),      
      "head"
    );
    assert.deepEqual(actual, ["==> file1 <==", ""]);
  });

  it("should return an array of error message when file content is null ", function() {
    let actual = formatContents(
      [{ fileName: "file1", content: null }],
      { count: 0, option: "-n" },
      filterContents.bind('null', fetchFromBeginning),      
      "head"
    );

    assert.deepEqual(actual, ["head: file1: No such file or directory"]);
  });

  it("should return an array with file name  and string of length equal to char count", function() {
    let actual = formatContents(
      [{ fileName: "file1", content: file1Content }],
      { count: 2, option: "-c" },
      filterContents.bind('null', fetchFromBeginning),
       "head"
    );
    assert.deepEqual(actual, ["==> file1 <==", "th"]);
  });

  it("should return required file content with file names when multiple files are provided", function() {
    let actual = formatContents(
      [
        { fileName: "file1", content: file1Content },
        { fileName: "file2", content: file1Content }
      ],
      { count: 2, option: "-c" },
      filterContents.bind('null', fetchFromBeginning),
      "head"
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

    let readFile1 = mockReader({ file1: file1Content });
    let validator = mockValidator({ file1: file1Content });

    it("should return a single line string required num of line is 1", function() {
      let actual = runHead(readFile1, ["-n", "1", "file1"], validator);

      assert.equal(actual, "this is a line 1");
    });

    it("should return whole file content when required number of lines is equal to size of file", function() {
      let actual1 = runHead(readFile1, ["-n", "4", "file1"], validator);
      let expected1 =
        "this is a line 1\n" +
        "this is a line 2\n" +
        "this is a line 3\n" +
        "this is a line 4";

      assert.equal(actual1, expected1);
    });

    it("should return whole file content when line count is more than the size of file", function() {
      let actual1 = runHead(readFile1, ["-n", "4", "file1"], validator);
      let expected1 =
        "this is a line 1\n" +
        "this is a line 2\n" +
        "this is a line 3\n" +
        "this is a line 4";

      assert.equal(actual1, expected1);
    });

    it("should return a single charactor string when required num of chars is 1", function() {
      let actual = runHead(readFile1, ["-c", "1", "file1"], validator);

      assert.equal(actual, "t");
    });

    it("should return a string with num of chars equal to required num of chars", function() {
      let actual1 = runHead(readFile1, ["-c", "4", "file1"], validator);

      assert.equal(actual1, "this");
    });
  });

  describe("error handling", function() {
    let validator = mockValidator({ file1: "helloWorld" });
    let readHelloWorld = mockReader({ file1: "helloWorld" });

    it("should provide error message when negative line count is given", function() {
      let actualOutput = runHead(
        readHelloWorld,
        ["-n", "-12", "file1"],
        validator
      );
      let expectedOutput = "head: illegal line count -- -12";

      assert.equal(actualOutput, expectedOutput);
    });

    it("should provide error message when negative byte count is given", function() {
      let actualOutput = runHead(
        readHelloWorld,
        ["-c", "-12", "file1"],
        validator
      );
      let expectedOutput = "head: illegal byte count -- -12";

      assert.equal(actualOutput, expectedOutput);
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

      assert.equal(actualOutput, expectedOutput);
    });

    it("should provide error message when invalid line count is 0", function() {
      let actualOutput = runHead(
        readHelloWorld,
        ["-n", "0", "file1"],
        validator
      );
      let expectedOutput = "head: illegal line count -- 0";

      assert.equal(actualOutput, expectedOutput);
    });

    it("should provide error message when invalid line count is 0", function() {
      let actualOutput = runHead(
        readHelloWorld,
        ["-c", "0", "file1"],
        validator
      );
      let expectedOutput = "head: illegal byte count -- 0";

      assert.equal(actualOutput, expectedOutput);
    });

    it("should provide error message when byte count is a alphabet", function() {
      let actualOutput = runHead(
        readHelloWorld,
        ["-c", "xy", "file1"],
        validator
      );
      let expectedOutput = "head: illegal byte count -- xy";

      assert.equal(actualOutput, expectedOutput);
    });

    it("should provide error message when line count is a alphabet", function() {
      let actualOutput = runHead(
        readHelloWorld,
        ["-n", "xy", "file1"],
        validator
      );
      let expectedOutput = "head: illegal line count -- xy";

      assert.equal(actualOutput, expectedOutput);
    });
  });
});

describe("filterContents", function() {
  let file1Content =
    "this is a line 1\n" +
    "this is a line 2\n" +
    "this is a line 3\n" +
    "this is a line4";

  it("should return an empty string when lines required is 0", function() {
    assert.equal(filterContents(fetchFromBeginning, file1Content, 0, '\n'), "");
  });

  it("should return an empty string when lines required is 0 when fetcher is fetchFromBeginning", function() {
  assert.equal(filterContents(fetchFromBeginning,  file1Content, 0, '\n'), "");
  });

  it("should return an empty string when bytes required is 0 when fetcher is fetchFromBeginning", function() {
    assert.deepEqual(filterContents(fetchFromBeginning, file1Content, 0, ''), "");
  });

  it("should return an empty string when bytes required is 0 when fetcher is fetchFromEnd", function() {
    assert.equal(filterContents(fetchFromEnd, file1Content, 0, ''), "");
  });

  it("should return specified number of lines from bottom when fetcher is fetchFromEnd", function() {
    assert.deepEqual(filterContents(fetchFromEnd, file1Content, 2, ''), "e4");
  });
});

describe("fetchFromEnd", () => {
  let file1Content =
    ['t', 'h', 'i', 's', ' ']; 

  it("should return an array of length equal to specified number of chars", function() {
    assert.deepEqual(fetchFromEnd(file1Content, 2,''), ['s', ' ']);
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
    let readFile1 = mockReader({ file1: file1Content });
    let validator = mockValidator({ file1: file1Content });

    it("should return one line content from end of file when the required num of lines is 1", function() {
      let actual = runTail(readFile1, ["-n", "1", "file1"], validator);

      assert.equal(actual, "this is last line");
    });

    it("should return the whole file when required num of lines is equal to file length", function() {
      let actual = runTail(readFile1, ["-n", "4", "file1"], validator);
      let expected =
        "this is a line 1\n" +
        "this is a line 2\n" +
        "this is a line 3\n" +
        "this is last line";

      assert.equal(actual, expected);
    });

    it("should return the whole file when required num of lines is more than file length", function() {
      let actual = runTail(readFile1, ["-n", "10", "file1"], validator);
      let expected =
        "this is a line 1\n" +
        "this is a line 2\n" +
        "this is a line 3\n" +
        "this is last line";

      assert.equal(actual, expected);
    });

    it("should return a charactor required num of chars is 1", function() {
      let actual = runTail(readFile1, ["-c", "1", "file1"], validator);

      assert.equal(actual, "e");
    });

    it("should return required num of chars from end of the file", function() {
      let actual1 = runTail(readFile1, ["-c", "4", "file1"], validator);

      assert.equal(actual1, "line");
    });

    it("should return required chars with heading of each file when more than a file is given", function() {
      let reader = mockReader({ file1: file1Content, file2: file2Content });
      let validator = mockValidator({
        file1: file1Content,
        file2: file2Content
      });
      let actual = runTail(reader, ["-c", "2", "file1", "file2"], validator);

      assert.equal(actual, "==> file1 <==\nne\n==> file2 <==\nle");
    });
  });

  describe("error handling", function() {
    let validator = mockValidator({ file1: "helloWorld" });
    let readHelloWorld = mockReader({ file1: "helloWorld" });

    it("should provide error message when invalid option is given", function() {
      let actualOutput = runTail(
        readHelloWorld,
        ["-v", "-12", "file1"],
        validator
      );
      let expectedOutput =
        "tail: illegal option -- v\n" +
        "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";

      assert.equal(actualOutput, expectedOutput);
    });

    it("should provide error message when invalid byte count is a alphabet", function() {
      let actualOutput = runTail(
        readHelloWorld,
        ["-c", "xy", "file1"],
        validator
      );
      let expectedOutput = "tail: illegal offset -- xy";

      assert.equal(actualOutput, expectedOutput);
    });

    it("should provide error message when invalid line count is a alphabet", function() {
      let actualOutput = runTail(
        readHelloWorld,
        ["-n", "xy", "file1"],
        validator
      );
      let expectedOutput = "tail: illegal offset -- xy";

      assert.equal(actualOutput, expectedOutput);
    });
  });
});
