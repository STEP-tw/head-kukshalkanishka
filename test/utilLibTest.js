const assert = require("assert");
const {parseInput} = require('../src/utilLib.js');

describe("parseInput", function() {
  it("should return an object with option as (c) when first index is (-c3)", function() {
    let expectedOutput = {option : "-c", count: 3, filePaths: ["file1"]};
    assert.deepEqual(parseInput(["-c3", "file1"]), expectedOutput);
  });

  it("should return an object with option as undefined when there is no option specified", function() {
    let expectedOutput = {option : undefined, count: 3, filePaths: ["file1"]};
    assert.deepEqual(parseInput(["-3", "file1"]), expectedOutput);
  });

  it("should return an object when option as (n) when first index is (-n3)", function() {
    let expectedOutput = {option : "-n", count: 3, filePaths: ["file1"]};
    assert.deepEqual(parseInput(["-n3", "file1"]), expectedOutput);

  });

  it("should return an object with option and count as undefined when array only has a file name", function() {
    let expectedOutput = {option : undefined, count: undefined, filePaths: ["file1"]};
    assert.deepEqual(parseInput(["file1"]), expectedOutput);
  });

  it("should return an object with option as (c) when first index is (-c) and num at second index", function() {
    let expectedOutput = {option : "-c", count: 3, filePaths: ["file1"]};
    assert.deepEqual(parseInput(["-c", "3" , "file1"]), expectedOutput);
  });

  it("should return an object with option as (n) when first index is (-n) and num at second index", function() {
    let expectedOutput = {option : "-n", count: 3, filePaths: ["file1"]};
    assert.deepEqual(parseInput(["-n", "3" , "file1"]), expectedOutput);
  });
});
