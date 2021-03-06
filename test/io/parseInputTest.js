const assert = require("assert");
const { parseInput } = require("../../src/io/parseInput.js");

describe("parseInput", function() {
  it("should return an object with option as (c) when first index is (-c3)", function() {
    let expectedOutput = { option: "-c", count: 3, filePaths: ["file1"] };
    assert.deepEqual(parseInput(["-c3", "file1"]), expectedOutput);
  });

  it("should return an object with default option when there is no option specified", function() {
    let expectedOutput = { count: 3, filePaths: ["file1"], option: "-n" };
    assert.deepEqual(parseInput(["-3", "file1"]), expectedOutput);
  });

  it("should return an object when option as (n) when first index is (-n3)", function() {
    let expectedOutput = { option: "-n", count: 3, filePaths: ["file1"] };
    assert.deepEqual(parseInput(["-n3", "file1"]), expectedOutput);
  });

  it("should return an object with default values of option and count when array only has a file name", function() {
    let expectedOutput = { option: "-n", count: 10, filePaths: ["file1"] };
    assert.deepEqual(parseInput(["file1"]), expectedOutput);
  });

  it("should return an object with option as (c) when first index is (-c) and num at second index", function() {
    let expectedOutput = { option: "-c", count: 3, filePaths: ["file1"] };
    assert.deepEqual(parseInput(["-c", "3", "file1"]), expectedOutput);
  });

  it("should return an object with option as (n) when first index is (-n) and num at second index", function() {
    let expectedOutput = { option: "-n", count: 3, filePaths: ["file1"] };
    assert.deepEqual(parseInput(["-n", "3", "file1"]), expectedOutput);
  });
});
