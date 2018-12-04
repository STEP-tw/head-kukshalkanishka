const assert = require("assert");
const {read} = require("../src/headLib.js");

describe("read", function() {
  let readString = (string, encoding) => string;

  it("should return a string identical to the string provided", function() {
    assert(read("hello world", readString), "hello world");
  });

  it("should return an empty string when an empty string is provided", function() {
    assert.deepEqual(read("", readString), "");
  });
});
