const assert = require("assert");
const { formatOutput } = require("../../src/library/formatOutput.js");
const { mockReader, mockValidator } = require("../helpers/mockFunctions.js");

describe("format output of tail command", function() {
  describe("formatOutput basic operation", function() {
    let file1Content =
      "this is a line 1\n" +
      "this is a line 2\n" +
      "this is a line 3\n" +
      "this is last line";

    let file2Content = "this is a single line file";
    let readFileSync = mockReader({ file1: file1Content });
    let existsSync = mockValidator({ file1: file1Content });
    let fs = { readFileSync, existsSync };

    it("should return one line content from end of file when the required num of lines is 1", function() {
      let actual = formatOutput(["-n", "1", "file1"], "tail", fs);

      assert.equal(actual, "this is last line");
    });

    it("should return the whole file when required num of lines is equal to file length", function() {
      let actual = formatOutput(["-n", "4", "file1"], "tail", fs);
      let expected =
        "this is a line 1\n" +
        "this is a line 2\n" +
        "this is a line 3\n" +
        "this is last line";

      assert.equal(actual, expected);
    });

    it("should return the whole file when required num of lines is more than file length", function() {
      let actual = formatOutput(["-n", "10", "file1"], "tail", fs);
      let expected =
        "this is a line 1\n" +
        "this is a line 2\n" +
        "this is a line 3\n" +
        "this is last line";

      assert.equal(actual, expected);
    });

    it("should return a charactor required num of chars is 1", function() {
      let actual = formatOutput(["-c", "1", "file1"], "tail", fs);

      assert.equal(actual, "e");
    });

    it("should return required num of chars from end of the file", function() {
      let actual1 = formatOutput(["-c", "4", "file1"], "tail", fs);

      assert.equal(actual1, "line");
    });

    it("should return required chars with heading of each file when more than a file is given", function() {
      let readFileSync = mockReader({
        file1: file1Content,
        file2: file2Content
      });
      let existsSync = mockValidator({
        file1: file1Content,
        file2: file2Content
      });
      let fs = { readFileSync, existsSync };

      let actual = formatOutput(["-c", "2", "file1", "file2"], "tail", fs);

      assert.equal(actual, "==> file1 <==\nne\n==> file2 <==\nle");
    });
  });

  describe("error handling", function() {
    let existsSync = mockValidator({ file1: "helloWorld" });
    let readFileSync = mockReader({ file1: "helloWorld" });
    let fs = { existsSync, readFileSync };

    it("should provide error message when invalid option is given", function() {
      let actualOutput = formatOutput(["-v", "-12", "file1"], "tail", fs);
      let expectedOutput =
        "tail: illegal option -- v\n" +
        "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";

      assert.equal(actualOutput, expectedOutput);
    });

    it("should provide error message when invalid byte count is a alphabet", function() {
      let actualOutput = formatOutput(["-c", "xy", "file1"], "tail", fs);
      let expectedOutput = "tail: illegal offset -- xy";

      assert.equal(actualOutput, expectedOutput);
    });

    it("should provide error message when invalid line count is a alphabet", function() {
      let actualOutput = formatOutput(["-n", "xy", "file1"], "tail", fs);
      let expectedOutput = "tail: illegal offset -- xy";

      assert.equal(actualOutput, expectedOutput);
    });

    it("should return file not found log when invalid file is given", () => {
      let actualOutput = formatOutput(["-n", "2", "file2"], "tail", fs);
      let expectedOutput = "tail: file2: No such file or directory";

      assert.equal(actualOutput, expectedOutput);
    });
  });
});

describe("format output of head command", function() {
  describe("formatOutput basic operation", function() {
    let file1Content =
      "this is a line 1\n" +
      "this is a line 2\n" +
      "this is a line 3\n" +
      "this is last line";

    let file2Content = "this is a single line file";
    let readFileSync = mockReader({ file1: file1Content });
    let existsSync = mockValidator({ file1: file1Content });
    let fs = { readFileSync, existsSync };

    it("should return one line content from end of file when the required num of lines is 1", function() {
      let actual = formatOutput(["-n", "1", "file1"], "head", fs);

      assert.equal(actual, "this is a line 1");
    });

    it("should return the whole file when required num of lines is equal to file length", function() {
      let actual = formatOutput(["-n", "4", "file1"], "head", fs);
      let expected =
        "this is a line 1\n" +
        "this is a line 2\n" +
        "this is a line 3\n" +
        "this is last line";

      assert.equal(actual, expected);
    });

    it("should return the whole file when required num of lines is more than file length", function() {
      let actual = formatOutput(["-n", "10", "file1"], "head", fs);
      let expected =
        "this is a line 1\n" +
        "this is a line 2\n" +
        "this is a line 3\n" +
        "this is last line";

      assert.equal(actual, expected);
    });

    it("should return a charactor required num of chars is 1", function() {
      let actual = formatOutput(["-c", "1", "file1"], "head", fs);

      assert.equal(actual, "t");
    });

    it("should return required num of chars from end of the file", function() {
      let actual1 = formatOutput(["-c", "4", "file1"], "head", fs);

      assert.equal(actual1, "this");
    });

    it("should return required chars with heading of each file when more than a file is given", function() {
      let readFileSync = mockReader({
        file1: file1Content,
        file2: file2Content
      });
      let existsSync = mockValidator({
        file1: file1Content,
        file2: file2Content
      });
      let fs = { readFileSync, existsSync };
      let actual = formatOutput(["-c", "2", "file1", "file2"], "head", fs);

      assert.equal(actual, "==> file1 <==\nth\n==> file2 <==\nth");
    });
  });

  describe("error handling", function() {
    let existsSync = mockValidator({ file1: "helloWorld" });
    let readHelloWorld = mockReader({ file1: "helloWorld" });
    let fs = { readHelloWorld, existsSync };

    it("should provide error message when invalid option is given", function() {
      let actualOutput = formatOutput(["-v", "-12", "file1"], "head", fs);
      let expectedOutput =
        "head: illegal option -- v\n" +
        "usage: head [-n lines | -c bytes] [file ...]";
      assert.equal(actualOutput, expectedOutput);
    });

    it("should provide error message when invalid byte count is a alphabet", function() {
      let actualOutput = formatOutput(["-c", "xy", "file1"], "head", fs);
      let expectedOutput = "head: illegal byte count -- xy";

      assert.equal(actualOutput, expectedOutput);
    });

    it("should provide error message when invalid line count is a alphabet", function() {
      let actualOutput = formatOutput(["-n", "xy", "file1"], "head", fs);
      let expectedOutput = "head: illegal line count -- xy";

      assert.equal(actualOutput, expectedOutput);
    });

    it("should return file not found log when invalid file is given", () => {
      let actualOutput = formatOutput(["-n", "2", "file2"], "head", fs);
      let expectedOutput = "head: file2: No such file or directory";

      assert.equal(actualOutput, expectedOutput);
    });
  });
});
