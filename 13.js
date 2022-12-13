const {readLinesFromFile} = require("../helpers/read-lines-from-file");
const lines = readLinesFromFile('./13-input.txt');

function sort(left, right) {
  const lc = [...left];
  const rc = [...right];
  while (true) {
    let l = lc.shift();
    let r = rc.shift();

    if (l === undefined && r === undefined) {
      return 0;
    } else if (l === undefined) {
      return -1;
    } else if (r === undefined) {
      return 1;
    } else if (typeof l === 'number' && typeof r === 'number') {
      if (l < r) {
        return -1;
      } else if (l > r) {
        return 1;
      } else {
        continue;
      }
    } else if (Array.isArray(l) && !Array.isArray(r)) {
      r = [r];
    } else if (!Array.isArray(l) && Array.isArray(r)) {
      l = [l];
    }
    const result = sort(l, r);
    if (result !== 0) {
      return result;
    }
  }
}

// part one
let pairIndex = 1;
let correctOrder = 0;
for (let i = 0; i < lines.length; i += 3, pairIndex++) {
  const left = eval(lines[i]);
  const right = eval(lines[i + 1]);

  if(sort(left, right) === -1){
    correctOrder += pairIndex;
  }
}
console.log(correctOrder);

// part two
const divider1 = [[2]];
const divider2 = [[6]];
const sorted = [divider1, divider2, ...lines]
    .filter(l => l !== '')
    .map(l => eval(l))
    .sort((a, b) => sort(a, b));

console.log((sorted.indexOf(divider1) + 1) * (sorted.indexOf(divider2) + 1));
