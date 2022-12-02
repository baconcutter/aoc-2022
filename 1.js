const {readLinesFromFile} = require("../helpers/read-lines-from-file");

const lines = readLinesFromFile('./1-input.txt');

let ar = [];
ar.push(lines.reduce((acc, val) => {
  if(val === '') {
    ar.push(acc);
    return 0;
  } else {
    return acc + parseInt(val);
  }
}, 0));

const sorted = ar.sort(((a, b) => b-a));
console.log(sorted.slice(0, 3).reduce((acc, val) => acc + val, 0));
