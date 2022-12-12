const {readLinesFromFile} = require("../helpers/read-lines-from-file");
const lines = readLinesFromFile('./12-input.txt');
const elevationIndex = 'abcdefghijklmnopqrstuvwxyz';

// PART ONE
let grid = {};

const p = (x, y, el) => ({
  x,
  y,
  elevation: el,
  key: `${x}-${y}`,
  accessibleNeighbors: (grid) => [
    grid[`${x}-${y - 1}`],
    grid[`${x}-${y + 1}`],
    grid[`${x - 1}-${y}`],
    grid[`${x + 1}-${y}`]
  ].filter(p => p !== undefined && (p.elevation <= el || p.elevation - el < 2)),
  fromStart: undefined,
});
let start, destination;

function parseGrid() {
  lines.forEach((l, y) => {
    for (let x = 0; x < lines[y].length; x++) {
      const c = lines[y][x];
      if (c === 'S') {
        grid[`${x}-${y}`] = p(x, y, 0);
        start = grid[`${x}-${y}`];
      } else if (c === 'E') {
        grid[`${x}-${y}`] = p(x, y, 25);
        destination = grid[`${x}-${y}`];
      } else {
        grid[`${x}-${y}`] = p(x, y, elevationIndex.indexOf(c));
      }
    }
  });
}

parseGrid();

function findDestination(points) {
  while (points.length > 0) {
    const p = points.shift();
    if (p.key === destination.key) {
      console.log('Found destination in', p.fromStart, 'steps');
      break;
    }
    p.accessibleNeighbors(grid).forEach(n => {
      const newFromStart = p.fromStart + 1;
      if (n.fromStart === undefined || n.fromStart > newFromStart) {
        n.fromStart = newFromStart;
        points.push(n)
      }
    });
  }
}

start.fromStart = 0;
let points = [start];
findDestination(points);

// part two
findDestination(Object.values(grid).filter(v => v.elevation === 0).map(v => {
  v.fromStart = 0;
  return v;
}));

