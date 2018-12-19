const assert = require("assert");
const {
  filterContents,
  fetchFromBeginning,
  fetchFromEnd,
  getRequiredContents
} = require("../../src/library/fileUtil.js");

const {mockReader,
  mockValidator} = require('../helpers/mockFunctions.js');

describe("getRequiredContents", function() {
  let file1Content =
    "this is a line 1\n" +
    "this is a line 2\n" +
    "this is a line 3\n" +
    "this is a line 4 \n";
  let file2Content = "this is a single line file";
  let reader = mockReader({'file1': file1Content, 'file2': file2Content});
  let doesExists = mockValidator({'file1': file1Content, 'file2': file2Content});

  it("should return filteredContents as empty string when line count is 0 for fetchFromBeginning", function() {
    let actual = getRequiredContents(
      {
        count: 0,
        option: "-n",
        filePaths: ['file1']
      },
      filterContents.bind('null', fetchFromBeginning),      
      
      doesExists,
      reader
    );

    assert.deepEqual(actual, [{filePath: 'file1', filteredContents: ''}]);
  });

  it("should return filteredContents as empty string when line count is 0 for fetchFromEnd", function() {
    let actual = getRequiredContents(
      {
        count: 0,
        option: "-n",
        filePaths: ['file1']
      },
      filterContents.bind('null', fetchFromEnd),      
      
      doesExists,
      reader
    );

    assert.deepEqual(actual, [{filePath: 'file1', filteredContents: ''}]);
  });

  it("should return an empty string when required chars is 0 for fetchFromBeginning", function() {
    let actual = getRequiredContents(
      {
        count: 0,
        option: "-c",
        filePaths: ['file1']
      },
      filterContents.bind('null', fetchFromBeginning),      
      
      doesExists,
      reader
    );

    assert.deepEqual(actual, [{filePath: 'file1', filteredContents: ''}]);
  });


  it("should return an empty string when required chars is 0 for fetchFromEnd", function() {
    let actual = getRequiredContents(
      {
        count: 0,
        option: "-c",
        filePaths: ['file1']
      },
      filterContents.bind('null', fetchFromEnd),      
      
      doesExists,
      reader
    );

    assert.deepEqual(actual, [{filePath: 'file1', filteredContents: ''}]);
  });

  it("should return an array with file path and lines of fileContent equal to the count", function() {
    let actualOutput = getRequiredContents(
      { count: 2, option: "-n", filePaths : ['file1'] },
      filterContents.bind('null', fetchFromBeginning),      
       doesExists,
      reader
    );
    let expectedOutput = [{filePath : 'file1',
      filteredContents: "this is a line 1\nthis is a line 2"}
    ];

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it("should return an array of error message when file content is null ", function() {
    let actual = getRequiredContents(
      { count: 0, option: "-n", filePaths:['file4'] },
      filterContents.bind('null', fetchFromBeginning),      
       doesExists,
      reader
    );

    assert.deepEqual(actual, [{filePath: 'file4', filteredContents: null}]);
  });

  it("should return an array with file name  and string of length equal to char count", function() {
    let actual = getRequiredContents(
      { count: 2, option: "-c", filePaths:['file1'] },
      filterContents.bind('null', fetchFromBeginning),
        doesExists,
       reader
    );
    assert.deepEqual(actual, [{filePath: 'file1', filteredContents: 'th'}]);
  });

  it("should return required file content with file names when multiple files are provided", function() {
    let actual = getRequiredContents(
      { count: 2, option: "-c", filePaths: ['file1', 'file2'] },
      filterContents.bind('null', fetchFromBeginning),
       doesExists,
      reader
    );
    assert.deepEqual(actual, [{filePath: 'file1', filteredContents:"th"},
  {filePath: 'file2', filteredContents: 'th'}]);
  });
});
 
describe("filterContents", function() {
  let file1Content =
    "this is a line 1\n" +
    "this is a line 2\n" +
    "this is a line 3\n" +
    "this is a line4";

  it("should return an empty string when lines required is 0", function() {
    assert.equal(filterContents(fetchFromBeginning, file1Content, 0, '\n'), "");
  });

  it("should return an empty string when lines required is 0 when fetcher is fetchFromBeginning", function() {
  assert.equal(filterContents(fetchFromBeginning,  file1Content, 0, '\n'), "");
  });

  it("should return an empty string when bytes required is 0 when fetcher is fetchFromBeginning", function() {
    assert.deepEqual(filterContents(fetchFromBeginning, file1Content, 0, ''), "");
  });

  it("should return an empty string when bytes required is 0 when fetcher is fetchFromEnd", function() {
    assert.equal(filterContents(fetchFromEnd, file1Content, 0, ''), "");
  });

  it("should return specified number of lines from bottom when fetcher is fetchFromEnd", function() {
    assert.deepEqual(filterContents(fetchFromEnd, file1Content, 2, ''), "e4");
  });
});

describe("fetchFromEnd", () => {
  let file1Content =
    ['t', 'h', 'i', 's', ' ']; 

  it("should return an array of length equal to specified number of chars", function() {
    assert.deepEqual(fetchFromEnd(file1Content, 2), ['s', ' ']);
  });
});

describe('fetchFromBeginning',() => {
  let file1Content =
    ['t', 'h', 'i', 's', ' ']; 

  it('should return an array of length equal to specified number of chars',() => {
    assert.deepEqual(fetchFromBeginning(file1Content, 2), ['t','h']);
  });
});