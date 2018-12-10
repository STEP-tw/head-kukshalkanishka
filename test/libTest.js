const assert = require('assert');
const {
  read,
  createDetailsOf,
  getLinesFromTop,
  getCharFromBeginning,
  head,
  runHead,
  selector
} = require('../src/lib.js');

const mockReader = function(expectedFile, expectedEncoding, expectedContent) {
  return function(actualFile, actualencoding) {
    const isFileValid = function() {
      return actualFile === expectedFile;
    };

    const isEncodingValid = function() {
      return actualencoding === expectedEncoding;
    };

    const areArgsValid = function() {
      return isFileValid() && isEncodingValid();
    };

    if (areArgsValid()) {
      return expectedContent;
    }
  };
};

const mockValidater = function(expectedFile) {
  return function(actualFile){
    if(actualFile == expectedFile){
      return true;
    }
  }
}

describe('read', function() {
  it('should return the content of provided file', function() {
    let readHelloWorld = mockReader('../testFile', 'utf8', 'helloWorld');

    assert.deepEqual(read(readHelloWorld, '../testFile', 'utf8'), 'helloWorld');
  });

  it('should return an empty string when an empty file is provided', function() {
    let readEmptyFile = mockReader('../testEmptyFile', 'utf8', '');

    assert.deepEqual(read(readEmptyFile, '../testEmptyFile', 'utf8'), '');
  });
});

describe('createDetailsOf', function() {

  let validater1 = (file) => true;
  let validator2 = (file) => false;

  it('should return an array of an object of file detail  when a file is provided', function() {

    let readHelloWorld = () => 'helloWorld';
    let actualOutput = createDetailsOf(
      readHelloWorld,
      ['../testFile'],
      'utf8',
      validater1
    );
    let expectedOutput = [{ fileName: '../testFile', content: 'helloWorld' }];

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return an array of same length as num of files provided', function() {

    let readHelloWorld = () => 'helloWorld';
    let files = ['../testFile1', '../testFile2'];
    let actualOutput = createDetailsOf(
      readHelloWorld,
      files,
      'utf8',
      validater1
    );
    let expectedOutput = [
      { fileName: '../testFile1', content: 'helloWorld' },
      { fileName: '../testFile2', content: 'helloWorld' }
    ];

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return null value for file content when file path is invalid', function() {

    let readHelloWorld = () => 'helloWorld';
    let files = ['../testFile1', '../testFile2'];
    let actualOutput = createDetailsOf(
      readHelloWorld,
      files,
      'utf8',
      validator2
    );
    let expectedOutput = [
      { fileName: '../testFile1', content: null },
      { fileName: '../testFile2', content: null }
    ];

    assert.deepEqual(actualOutput, expectedOutput);
  });

});

describe('getLinesFromTop', function() {

  let file1Content =
    'this is a line 1\n' +
    'this is a line 2\n' +
    'this is a line 3\n' +
    'this is a line 4 \n';

  it('should return an empty string when number of lines required is 0', function() {
    assert.deepEqual(getLinesFromTop(file1Content, 0), '');
  });

  it('should return a string of length equal to the num of lines', function() {
    let expectedOutput = 'this is a line 1\n' + 'this is a line 2';

    assert.deepEqual(getLinesFromTop(file1Content, 2), expectedOutput);
  });
});

describe('getCharFromBeginning', function() {

  let file1Content =
    'this is a line 1\n' +
    'this is a line 2\n' +
    'this is a line 3\n' +
    'this is a line 4 \n';

  it('should return an empty string when bytes required is 0', function() {
    assert.deepEqual(getCharFromBeginning(file1Content, 0), '');
  });

  it('should return string of length equal to the bytes required', function() {
    assert.deepEqual(getCharFromBeginning(file1Content, 2), 'th');
  });
});

describe('head', function() {

  let file1Content =
    'this is a line 1\n' +
    'this is a line 2\n' +
    'this is a line 3\n' +
    'this is a line 4 \n';

  it('should return an empty string when number of lines required is 0 ', function() {
    let actual = head([{ fileName: 'file1', content: file1Content }], {
      count: 0,
      option: '-n'
    });

    assert.deepEqual(actual, '');
  });

  it('should return a string with num of lines equal to the required num of lines', function() {
    let actualOutput = head(
      [{ fileName: 'file1', content: file1Content }],
      { count: 2, option: '-n'}
    );
    let expectedOutput = 'this is a line 1\n' + 'this is a line 2';

    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return an empty string when number of char required is 0', function() {
    let actual = head([{ fileName: 'file1', content: file1Content }], {
      count: 0,
      option: '-c'
    });
    assert.deepEqual(actual, '');
  });

  it('should return an error message when file content is null ', function() {
    let actual = head([{ fileName: 'file1', content: null }], {
      count: 0,
      option: '-n'
    });

    assert.deepEqual(actual, 'head: file1: No such file or directory');
  });

  it('should return string of length equal to the num of char required', function() {
    let actual = head([{ fileName: 'file1', content: file1Content }], {
      count: 2,
      option: '-c'
    });
    assert.deepEqual(actual, 'th');
  });

  it('should return reqired file content with file names when multiple files are provided', function() {
    let actual = head(
      [
        { fileName: 'file1', content: file1Content },
        { fileName: 'file2', content: file1Content }
      ],
      { count: 2, option: '-c' }
    );
    assert.deepEqual(actual, '==> file1 <==\nth\n\n==> file2 <==\nth');
  });
});

describe('runHead', function() {

  let validater = mockValidater("file1");

  describe('error handling', function() {

    it('should provide error message when negative line count is given', function() {

      let readHelloWorld = mockReader('file1', 'utf8', 'helloWorld');
      let actualOutput = runHead(
        readHelloWorld,
        'utf-8',
        ['-n', '-12', 'file1'],
        validater
      );
      let expectedOutput = 'head: illegal line count -- -12';

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should provide error message when negative byte count is given', function() {

      let readHelloWorld = mockReader('file1', 'utf8', 'helloWorld');
      let actualOutput = runHead(
        readHelloWorld,
        'utf-8',
        ['-c', '-12', 'file1'],
        validater
      );
      let expectedOutput = 'head: illegal byte count -- -12';

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should provide error message when invalid option is given', function() {
      let readHelloWorld = mockReader('file1', 'utf8', 'helloWorld');
      let actualOutput = runHead(
        readHelloWorld,
        'utf-8',
        ['-v', '-12', 'file1'],
        validater
      );
      let expectedOutput =
        'head: illegal option -- v\n' +
        'usage: head [-n lines | -c bytes] [file ...]';
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should provide error message when invalid option is given', function() {
      let readHelloWorld = mockReader('file1', 'utf8', 'helloWorld');
      let actualOutput = runHead(
        readHelloWorld,
        'utf-8',
        ['-v', '-12', 'file1'],
        validater
      );
      let expectedOutput =
        'head: illegal option -- v\n' +
        'usage: head [-n lines | -c bytes] [file ...]';
      assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should provide error message when invalid line count is 0', function() {
      let readHelloWorld = mockReader('file1', 'utf8', 'helloWorld');
      let actualOutput = runHead(
        readHelloWorld,
        'utf-8',
        ['-n', '0', 'file1'],
        validater
      );
      let expectedOutput = 'head: illegal line count -- 0';

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should provide error message when invalid line count is 0', function() {
      let readHelloWorld = mockReader('file1', 'utf8', 'helloWorld');
      let actualOutput = runHead(
        readHelloWorld,
        'utf-8',
        ['-c', '0', 'file1'],
        validater
      );
      let expectedOutput = 'head: illegal byte count -- 0';

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should provide error message when invalid byte count is a alphabet', function() {
      let readHelloWorld = mockReader('file1', 'utf8', 'helloWorld');
      let actualOutput = runHead(
        readHelloWorld,
        'utf-8',
        ['-c', 'xy', 'file1'],
        validater
      );
      let expectedOutput = 'head: illegal byte count -- xy';

      assert.deepEqual(actualOutput, expectedOutput);
    });

    it('should provide error message when invalid line count is a alphabet', function() {
      let readHelloWorld = mockReader('file1', 'utf8', 'helloWorld');
      let actualOutput = runHead(
        readHelloWorld,
        'utf-8',
        ['-n', 'xy', 'file1'],
        validater
      );
      let expectedOutput = 'head: illegal line count -- xy';

      assert.deepEqual(actualOutput, expectedOutput);
    });
  });

  describe('runHead normal operation', function() {
    let file1 =
      'this is a line 1\n' +
      'this is a line 2\n' +
      'this is a line 3\n' +
      'this is a line 4';

    let readFile1Content = function(file, encoding) {
      if ((file, encoding)) {
        return (
          'this is a line 1\n' +
          'this is a line 2\n' +
          'this is a line 3\n' +
          'this is a line 4'
        );
      }
    };

    it('should return a string with num of lines equal to the required num of lines', function() {
      let readHelloWorld = mockReader('file1', 'utf8', 'helloWorld');
      let actual = runHead(
        readFile1Content,
        'utf-8',
        ['-n', '1', 'file1'],
        validater
      );

      assert.deepEqual(actual, 'this is a line 1');

      let actual1 = runHead(
        readFile1Content,
        'utf-8',
        ['-n', '4', 'file1'],
        validater
      );

      assert.deepEqual(actual1, file1);
    });

    it('should return a string with num of chars equal to the required num of chars', function() {
      let readHelloWorld = mockReader('file1', 'utf8', 'helloWorld');
      let actual = runHead(
        readFile1Content,
        'utf-8',
        ['-c', '1', 'file1'],
        validater
      );

      assert.deepEqual(actual, 't');

      let actual1 = runHead(
        readFile1Content,
        'utf-8',
        ['-c', '4', 'file1'],
        validater
      );

      assert.deepEqual(actual1, 'this');
    });
  });
});

describe('selector', function() {
  it('should return getLinesFromTop function when -n is given in option ', function() {
    assert.deepEqual(selector('-n'), getLinesFromTop);
  });

  it('should return getCharFromBeginning function when -c is given in option ', function() {
    assert.deepEqual(selector('-c'), getCharFromBeginning);
  });
});
