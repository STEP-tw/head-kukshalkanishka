const assert = require("assert");
const { formatOutput } = require("../../src/library/formatOutput.js");

describe("formatOutput", function() {
  it("should return error message when filteredContents is null for head command", function() {
    let actual = formatOutput(
      [{ filePath: "file1", filteredContents: null }],
      "head"
    );

    assert.equal(actual, "head: file1: No such file or directory");
  });

  it("should give header for valid file but not for invalid file", function() {
    let actual = formatOutput(
      [
        { filePath: "file1", filteredContents: null },
        { filePath: "file2", filteredContents: "hello" }
      ],
      "head"
    );
    let expected =
      "head: file1: No such file or directory\n==> file2 <==\nhello";

    assert.equal(actual, expected);
  });

  it("should return contents when single file is provided", function() {
    let actual = formatOutput(
      [{ filePath: "file1", filteredContents: "this" }],
      "head"
    );

    assert.equal(actual, "this");
  });

  it("should return required contents with heading of each file when more than a file is given", function() {
    let actual = formatOutput(
      [
        { filePath: "file1", filteredContents: "th" },
        { filePath: "file2", filteredContents: "is" }
      ],
      "head"
    );

    assert.equal(actual, "==> file1 <==\nth\n==> file2 <==\nis");
  });
});
