const assert = require("assert");
const {read} = require("../src/headLib.js");

describe("read", function() {
  let readString = (file,encoding) => file;
  it("should return idnetical string", function() {
    assert(read("hello world", readString), "hello world");
  });
});
