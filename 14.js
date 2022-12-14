const {readLinesFromFile} = require("../helpers/read-lines-from-file");
const lines = readLinesFromFile('./14-input.txt');



const c = (s) => s ? s.split(',').map(Number) : null;
const r = (x, y) => ({x, y, v: '#'});
const s = (x, y) => ({x, y, v: 'o'});
let topBound = 0, leftBound = Infinity, rightBound = -Infinity, bottomBound = -Infinity;

function parseGrid() {
  const grid = new Map();
  lines.forEach((l) => {
    let coordinates = l.split(' -> ');
    coordinates.forEach((coordinate, i) => {
      const c1 = c(coordinate);
      leftBound = Math.min(leftBound, c1[0]);
      rightBound = Math.max(rightBound, c1[0]);
      bottomBound = Math.max(bottomBound, c1[1]);
      const c2 = c(coordinates[i + 1]);
      if (c2) {
        if (c1[0] === c2[0]) {
          const y1 = Math.min(c1[1], c2[1]);
          const y2 = Math.max(c1[1], c2[1]);
          //draw vertical
          for (let y = y1; y <= y2; y++) {
            grid.set(`${c1[0]}-${y}`, r(c1[0], y));
          }
        } else {
          const x1 = Math.min(c1[0], c2[0]);
          const x2 = Math.max(c1[0], c2[0]);
          for (let x = x1; x <= x2; x++) {
            grid.set(`${x}-${c1[1]}`, r(x, c1[1]));
          }
        }
      }
    });
  });
  return grid;
}

let grid = parseGrid();

function drawGrid() {
  for (let y = topBound; y <= bottomBound; y++) {
    let buffer = `${y} `;
    for (let x = leftBound; x < rightBound; x++) {
      buffer += grid.get(`${x}-${y}`)?.v || '.';
    }
    console.log(buffer);
    buffer = '';
  }
}

let count = 0;

function produceSand() {
  let x = 500, y = 0;

  while (true) {
    if (x < leftBound || x > rightBound || y > bottomBound) {
      return false;
    } else if (grid.has('500-0')) {
      return false;
    } else {
      const newY = y + 1;
      if (grid.has(`${x}-${newY}`)) {
        if (grid.has(`${x - 1}-${newY}`)) {
          if (grid.has(`${x + 1}-${newY}`)) {
            grid.set(`${x}-${y}`, s(x, y));
            count++;
            return true;
          } else {
            x = x + 1;
            y = newY;
          }
        } else {
          x = x - 1;
          y = newY;
        }
      } else {
        y = newY;
      }
    }
  }
}

do {
  // drawGrid()
} while (produceSand(true));

console.log('part one', count);

// part two
grid = parseGrid();
const floorY = bottomBound + 2;
rightBound = rightBound * 2; // practical infinity
leftBound = 0;
for (let x = 0; x < rightBound; x++) {
  grid.set(`${x}-${floorY}`, r(x, floorY));
}
bottomBound = floorY;

count = 0;
let x = true;
while(x){
  x = produceSand(true);
}
console.log('part two', count);
