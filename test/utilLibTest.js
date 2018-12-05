const assert = require("assert");
const {parseInput} = require('../src/utilLib.js');

describe("parseInput", function() {
  it("should return an object when an array of options is provided", function() {
    let expectedOutput = {option : "-c", numericOption: 3, filePaths: ["file1"]};
    assert.deepEqual(parseInput(["node","./head.js" ,"-c3", "file1"]), expectedOutput);
  });
});

