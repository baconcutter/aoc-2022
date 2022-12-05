const {readLinesFromFile} = require("../helpers/read-lines-from-file");

const lines = readLinesFromFile('./5-input.txt');

/*PART ONE*/
//parse
let stackLines, instructions;
for (let i = 0; i < lines.length; i++) {
  if (lines[i] === ""){
    stackLines = lines.slice(0, i);
    instructions = lines.slice(i+1);
    break;
  }
}

function parseStackMap() {
  const stackMap = {};

  const stackNumbers = stackLines[stackLines.length - 1];
  for (let i = 0; i < stackNumbers.length; i++) {
    const stackNumber = parseInt(stackNumbers[i]);
    if (!isNaN(stackNumber)) {
      stackMap[stackNumber] = [];
      for (let x = stackLines.length - 2; x >= 0; x--) {
        const crate = stackLines[x][i];
        if (!!crate && !!crate.trim()) {
          stackMap[stackNumber].push(crate);
        }
      }
    }
  }
  return stackMap;
}

let stackMap = parseStackMap();

instructions.forEach(i => {
  [_, moveNr, _, fromStack, _, toStack] = i.split(" ");
  for(let x = 1; x <= parseInt(moveNr); x++){
    stackMap[toStack].push(stackMap[fromStack].pop());
  }
});

let answerPartOne = "";
for (let stackMapKey in stackMap) {
  answerPartOne = answerPartOne.concat(stackMap[stackMapKey][stackMap[stackMapKey].length -1]);
}
console.log(answerPartOne);

// PART TWO
stackMap = parseStackMap();
instructions.forEach(i => {
  [_, moveNr, _, fromStack, _, toStack] = i.split(" ");
  stackMap[toStack] = stackMap[toStack].concat(
      stackMap[fromStack].splice(stackMap[fromStack].length - moveNr, moveNr));
});

let accPartTwo = "";
for (let stackMapKey in stackMap) {
  accPartTwo = accPartTwo.concat(stackMap[stackMapKey][stackMap[stackMapKey].length -1]);
}
console.log(accPartTwo);
