const assert = require("assert");
const { formatOutput } = require("../../src/library/output.js");
const { mockReader, mockValidator } = require("../helpers/mockFunctions.js");

describe("format output of tail command", function() {
  describe("formatOutput basic operation", function() {
    let file1Content =
      "this is a line 1\n" +
      "this is a line 2\n" +
      "this is a line 3\n" +
      "this is last line";

    let file2Content = "this is a single line file";
    let readFile1 = mockReader({ file1: file1Content });
    let validator = mockValidator({ file1: file1Content });

    it("should return one line content from end of file when the required num of lines is 1", function() {
      let actual = formatOutput(
        ["-n", "1", "file1"],
        readFile1,
        validator,
        "tail"
      );

      assert.equal(actual, "this is last line");
    });

    it("should return the whole file when required num of lines is equal to file length", function() {
      let actual = formatOutput(
        ["-n", "4", "file1"],
        readFile1,
        validator,
        "tail"
      );
      let expected =
        "this is a line 1\n" +
        "this is a line 2\n" +
        "this is a line 3\n" +
        "this is last line";

      assert.equal(actual, expected);
    });

    it("should return the whole file when required num of lines is more than file length", function() {
      let actual = formatOutput(
        ["-n", "10", "file1"],
        readFile1,
        validator,
        "tail"
      );
      let expected =
        "this is a line 1\n" +
        "this is a line 2\n" +
        "this is a line 3\n" +
        "this is last line";

      assert.equal(actual, expected);
    });

    it("should return a charactor required num of chars is 1", function() {
      let actual = formatOutput(
        ["-c", "1", "file1"],
        readFile1,
        validator,
        "tail"
      );

      assert.equal(actual, "e");
    });

    it("should return required num of chars from end of the file", function() {
      let actual1 = formatOutput(
        ["-c", "4", "file1"],
        readFile1,
        validator,
        "tail"
      );

      assert.equal(actual1, "line");
    });

    it("should return required chars with heading of each file when more than a file is given", function() {
      let reader = mockReader({ file1: file1Content, file2: file2Content });
      let validator = mockValidator({
        file1: file1Content,
        file2: file2Content
      });
      let actual = formatOutput(
        ["-c", "2", "file1", "file2"],
        reader,
        validator,
        "tail"
      );

      assert.equal(actual, "==> file1 <==\nne\n==> file2 <==\nle");
    });
  });

  describe("error handling", function() {
    let validator = mockValidator({ file1: "helloWorld" });
    let readHelloWorld = mockReader({ file1: "helloWorld" });

    it("should provide error message when invalid option is given", function() {
      let actualOutput = formatOutput(
        ["-v", "-12", "file1"],
        readHelloWorld,
        validator,
        "tail"
      );
      let expectedOutput =
        "tail: illegal option -- v\n" +
        "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";

      assert.equal(actualOutput, expectedOutput);
    });

    it("should provide error message when invalid byte count is a alphabet", function() {
      let actualOutput = formatOutput(
        ["-c", "xy", "file1"],
        readHelloWorld,
        validator,
        "tail"
      );
      let expectedOutput = "tail: illegal offset -- xy";

      assert.equal(actualOutput, expectedOutput);
    });

    it("should provide error message when invalid line count is a alphabet", function() {
      let actualOutput = formatOutput(
        ["-n", "xy", "file1"],
        readHelloWorld,
        validator,
        "tail"
      );
      let expectedOutput = "tail: illegal offset -- xy";

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
      let readFile1 = mockReader({ file1: file1Content });
      let validator = mockValidator({ file1: file1Content });
  
      it("should return one line content from end of file when the required num of lines is 1", function() {
        let actual = formatOutput(
          ["-n", "1", "file1"],
          readFile1,
          validator,
          "head"
        );
  
        assert.equal(actual, "this is a line 1");
      });
  
      it("should return the whole file when required num of lines is equal to file length", function() {
        let actual = formatOutput(
          ["-n", "4", "file1"],
          readFile1,
          validator,
          "head"
        );
        let expected =
          "this is a line 1\n" +
          "this is a line 2\n" +
          "this is a line 3\n" +
          "this is last line";
  
        assert.equal(actual, expected);
      });
  
      it("should return the whole file when required num of lines is more than file length", function() {
        let actual = formatOutput(
          ["-n", "10", "file1"],
          readFile1,
          validator,
          "head"
        );
        let expected =
          "this is a line 1\n" +
          "this is a line 2\n" +
          "this is a line 3\n" +
          "this is last line";
  
        assert.equal(actual, expected);
      });
  
      it("should return a charactor required num of chars is 1", function() {
        let actual = formatOutput(
          ["-c", "1", "file1"],
          readFile1,
          validator,
          "head"
        );
  
        assert.equal(actual, "t");
      });
  
      it("should return required num of chars from end of the file", function() {
        let actual1 = formatOutput(
          ["-c", "4", "file1"],
          readFile1,
          validator,
          "head"
        );
  
        assert.equal(actual1, "this");
      });
  
      it("should return required chars with heading of each file when more than a file is given", function() {
        let reader = mockReader({ file1: file1Content, file2: file2Content });
        let validator = mockValidator({
          file1: file1Content,
          file2: file2Content
        });
        let actual = formatOutput(
          ["-c", "2", "file1", "file2"],
          reader,
          validator,
          "head"
        );
  
        assert.equal(actual, "==> file1 <==\nth\n==> file2 <==\nth");
      });
    });
  
    describe("error handling", function() {
      let validator = mockValidator({ file1: "helloWorld" });
      let readHelloWorld = mockReader({ file1: "helloWorld" });
  
      it("should provide error message when invalid option is given", function() {
        let actualOutput = formatOutput(
          ["-v", "-12", "file1"],
          readHelloWorld,
          validator,
          "head"
        );
        let expectedOutput =
          "head: illegal option -- v\n" +
          "usage: head [-n lines | -c bytes] [file ...]";  
        assert.equal(actualOutput, expectedOutput);
      });
  
      it("should provide error message when invalid byte count is a alphabet", function() {
        let actualOutput = formatOutput(
          ["-c", "xy", "file1"],
          readHelloWorld,
          validator,
          "head"
        );
        let expectedOutput = "head: illegal byte count -- xy";
  
        assert.equal(actualOutput, expectedOutput);
      });
  
      it("should provide error message when invalid line count is a alphabet", function() {
        let actualOutput = formatOutput(
          ["-n", "xy", "file1"],
          readHelloWorld,
          validator,
          "head"
        );
        let expectedOutput = "head: illegal line count -- xy";
  
        assert.equal(actualOutput, expectedOutput);
      });
    });
  });
  