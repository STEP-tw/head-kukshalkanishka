const assert = require("assert");
const {filterOption, 
  filterNumber} = require('../src/utilLib.js');

describe("filterOption", function() {
  it("should return a string of matched content", function() {
    assert.deepEqual(filterOption(["-c", "hello"]), "-c");
  });

  it("should return undefined when no option is present in string", function() {
    assert.deepEqual(filterOption(["", "hello"]), undefined);
  });
});

describe("filterOption", function() {
  it("should return a matched number", function() {
    assert.deepEqual(filterNumber(["3", "hello"]), 3);
  });

  it("should return undefined when no number is present in string", function() {
    assert.deepEqual(filterOption(["", "hello"]), undefined);
  });
});

