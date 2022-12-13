const {readLinesFromFile} = require("../helpers/read-lines-from-file");
const lines = readLinesFromFile('./11-input.txt');

// PART ONE
const m = () => ({
  items: [],
  operation: '',
  division: 0,
  trueMonkeyIndex: 0,
  falseMonkeyIndex: 0,
  inspections: 0,
  inspect: function (index, division) {
    const old = this.items[index];
    this.inspections++;
    return division ? Math.floor(eval(this.operation) / 3) : Math.floor(eval(this.operation));
  },
  getNewDestination: function (worryLevel) {
    return worryLevel % this.division === 0 ? this.trueMonkeyIndex : this.falseMonkeyIndex
  },
});

function parseMonkeys(lines) {
  const monkeys = [];
  let currentMonkey;

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (l === '') {
      monkeys.push(currentMonkey);
    }
    if (l.startsWith('Monkey')) {
      currentMonkey = m();
      currentMonkey.items = lines[i + 1].split(':')[1].split(', ').map(Number);
      currentMonkey.operation = lines[i + 2].split('=')[1].trim();
      currentMonkey.division = Number(lines[i + 3].split(' ').pop());
      currentMonkey.trueMonkeyIndex = Number(lines[i + 4].split(' ').pop());
      currentMonkey.falseMonkeyIndex = Number(lines[i + 5].split(' ').pop());
      i += 5;
    }
  }
  monkeys.push(currentMonkey);
  return monkeys;
}

let monkeys = parseMonkeys(lines);

function playRoundPartOne() {
  monkeys.forEach(m => {
    m.items.forEach((item, index) => {
      const newWorryLevel = m.inspect(index, true);
      const newDestination = m.getNewDestination(newWorryLevel);
      monkeys[newDestination].items.push(newWorryLevel);
    });
    m.items = [];
  })
}

for (let i = 0; i < 20; i++) {
  playRoundPartOne();
}

function getTopTwoSumInspections() {
  return monkeys
      .map((m) => m.inspections)
      .sort((a, b) => b - a)
      .slice(0, 2).reduce((a,b) => a*b, 1);
}

console.log(getTopTwoSumInspections());

// part two

const prodDiv = monkeys.reduce((acc, m) => acc * m.division, 1); // learned this from https://www.youtube.com/watch?v=W9vVJ8gDxj4
console.log('prodDiv', prodDiv);
monkeys = parseMonkeys(lines);
function playRoundPartTwo() {
  monkeys.forEach(m => {
    m.items.forEach((item, index) => {
      const newWorryLevel = m.inspect(index, false);
      const newDestination = m.getNewDestination(newWorryLevel);
      monkeys[newDestination].items.push(newWorryLevel%prodDiv);
    });
    m.items = [];
  })
}

for (let i = 0; i < 10000; i++) {
  playRoundPartTwo();
}
console.log(getTopTwoSumInspections());
