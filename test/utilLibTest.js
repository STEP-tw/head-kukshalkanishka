const assert = require("assert");
const {filterOption, 
  filterNumber,
  filterFilePaths} = require('../src/utilLib.js');

describe("filterOption", function() {
  it("should return a string of matched content", function() {
    assert.deepEqual(filterOption(["node", "hello", "-c"]), "-c");
  });

  it("should return undefined when no option is present in string", function() {
    assert.deepEqual(filterOption(["", "hello","4"]), undefined);
  });
});

describe("filterNumber", function() {
  it("should return a matched number", function() {
    assert.deepEqual(filterNumber(["3", "hello"]), 3);
  });

  it("should return undefined when no number is present in string", function() {
    assert.deepEqual(filterNumber(["", "hello"]), undefined);
  });
});

describe("filterFilePaths", function() {
  it("should return an array of a FileName after the number", function() {
    assert.deepEqual(filterFilePaths(["node", "./head.js", "-n3", "file1"]), ["file1"]);
  });
});
