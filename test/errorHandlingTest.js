const assert = require('assert');
const {isOptionInValid,
  isNegativeOrZero,
  isLineOption,
  isCharOption} = require('../src/errorHandling.js');

describe("isOptionInValid", function() {
  it("should return true when a number is given as a option", function() {
    assert.deepEqual(isOptionInValid("4"), true);
  });

  it("should return true when different alphanumeric values other than -n or -c is provided", function() {
    assert.deepEqual(isOptionInValid("sd"), true);
    assert.deepEqual(isOptionInValid("n"), true);
    assert.deepEqual(isOptionInValid("c"), true);
    assert.deepEqual(isOptionInValid("-23fdfd"), true);
  });

  it("should return false when -n or -c are provided as a option", function() {
    assert.deepEqual(isOptionInValid("-n"), false);
    assert.deepEqual(isOptionInValid("-c"), false);
  });
});

describe("isLineOption", function() {
  it("should return true when option is equal to -n", function() {
    assert.deepEqual(isLineOption("-n"), true);
  });

  it("should return false when option is any other than -n", function() {
    assert.deepEqual(isLineOption("-c"), false);
    assert.deepEqual(isLineOption("3"), false);
    assert.deepEqual(isLineOption("-n3"), false);
  });
});

describe("isCharOption", function() {
  it("should return true when option is equal to -c", function() {
    assert.deepEqual(isCharOption("-c"), true);
  });

  it("should return false when option is any other than -c", function() {
    assert.deepEqual(isCharOption("-n"), false);
    assert.deepEqual(isCharOption("3"), false);
    assert.deepEqual(isCharOption("-n3"), false);
  });
});

describe("isNegativeOrZero", function() {
  it("should return false when any whole num is given ", function() {
    assert.deepEqual(isNegativeOrZero(12), false);
  });

  it("should return true for negative and zero value", function() {
    assert.deepEqual(isNegativeOrZero(-12), true);
    assert.deepEqual(isNegativeOrZero(0), true);
  });
});