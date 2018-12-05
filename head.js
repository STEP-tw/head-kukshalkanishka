const fs = require('fs');
const {runHead} = require('./src/headLib.js');

const main = function(){

  console.log(runHead(fs.readFileSync, "utf-8", process.argv.slice(2)));
}

main();
