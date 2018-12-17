/---------------------libTest.js---------------------//

 type: unnecessary counter : *done
   lineNum: 15, 27
   description: objects could be used in place of counter.

 type: variable name 
   lineNum: 49
   description: ‘createDetailsOf’ doesn’t convey what it does.

 type: more parameters
   lineNum: 99

 type: misleading test messages : *done
   lineNum: 91- 170
   desciption: return type is array but mentioned as string and fileNames are provided             at every output so no need to mention that.

   lineNum: 286: *done
   desciption: more information for option is required.

   lineNum: 337:  *done
   description: ‘getLinesFromBottom’ is ‘fetchFromEnd’

   lineNum: 343 - 359 :   *done
   description: return type is not correct.

 type: repeat similar test : *done
   lineNum: 246
   description: same test is copied twice

 type: case not tested *done
   lineNum: none
   desciption: ‘count greater than file length’ case is not handled.

//-------------------------lib.js-------------------//

 type: not pure function. *done
   lineNum: 22
   description: return type is not consistance.

 type: variable name
   lineNum: 53
   description: ‘fileName’ should be ‘filePath’.

 type: readibility
   description: bind should be used instead of passing same arguments in 2 or 3                     functions.

//--------------------------errorHandling.js---------------//

 type: unnecessary check
   lineNum: 8
   description: unnecessary check for undefined option.

   lineNum: 12
   description: unnecessary check for undefined count.

//----------------------errorHandlingTest.js------------------//

 type: less tests
   lineNum: 69
   description: no test cases for string type input.

//----------------------io.js-----------------------------//

 type: variable name
   lineNum: 1
   description: ‘isCountOption’ is not clear.