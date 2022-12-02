const {readLinesFromFile} = require("../helpers/read-lines-from-file");

const lines = readLinesFromFile('./2-input.txt');
const result = lines.reduce((acc, l) => {
  [opponent, outcome] = l.split(" ");
  let points = 0;

  if (outcome === 'X') {
    if (opponent === 'A') {
      points = 3;
    } else if (opponent === 'B') {
      points = 1;
    } else {
      points = 2;
    }
  } else if (outcome === 'Y') {
    if (opponent === 'A') {
      points = 3 + 1;
    } else if (opponent === 'B') {
      points = 3 + 2;
    } else {
      points = 3 + 3;
    }
  } else {
    points = 6;
    if(opponent === 'A'){
      points += 2;
    } else if(opponent ==='B'){
      points += 3;
    } else {
      points += 1;
    }
  }
  return acc + points;
}, 0);

console.log(result);
