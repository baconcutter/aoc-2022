const {readLinesFromFile} = require("../helpers/read-lines-from-file");

const lines = readLinesFromFile('./4-input.txt');

/*PART ONE*/
const answerPartOne = lines.reduce((acc, pairs) => {
  [first, second] = pairs.split(",");
  [firstStart, firstEnd] = first.split("-").map(i => parseInt(i));
  [secondStart, secondEnd] = second.split("-").map(i => parseInt(i));

  if ((firstStart >= secondStart && firstEnd <= secondEnd) || (secondStart >= firstStart && secondEnd <= firstEnd)) {
    return acc + 1;
  }
  return acc;
}, 0);
console.log(answerPartOne);

/*PART TWO*/
const answerPartTwo = lines.reduce((acc, pairs) => {
  [first, second] = pairs.split(",");
  [firstStart, firstEnd] = first.split("-").map(i => parseInt(i));
  [secondStart, secondEnd] = second.split("-").map(i => parseInt(i));

  for (let i = firstStart; i <= firstEnd; i++) {
    if(i >= secondStart && i <= secondEnd){
      return acc + 1;
    }
  }
  return acc;
}, 0);
console.log(answerPartTwo);
