const {readLinesFromFile} = require("../helpers/read-lines-from-file");
const lines = readLinesFromFile('./15-input.txt');

const k = (x, y) => `${x}-${y}`;
const s = (x, y, beacon) => {
  let diffx = Math.abs(x - beacon.x);
  let diffy = Math.abs(y - beacon.y);
  let d = diffx + diffy;
  const yMin = y - d;
  const yMax = y + d;
  const xMin = x - d;
  const xMax = x + d;

  return {
    x,
    y,
    key: k(x, y),
    beacon,
    d,
    xMin,
    xMax,
    yMin,
    yMax,
    getTaken: (rowY) => {
      if (rowY >= yMin && rowY <= yMax) {
        let diff = rowY <= y ? Math.abs(yMin - rowY) : Math.abs(rowY - yMax);
        return [x - diff, x + diff];
      }
      return [];
    },
  };
};

const b = (x, y) => ({x, y, key: k(x, y)});

function parseLines(lines) {
  return lines.map(l => {
    const [sensorC, beaconC] = l.split(':')
        .map(p => p.split(' ')
            .filter(pp => pp.split('=').length === 2)
            .map(pp => Number(pp.split('=')[1].split(',')[0]))
        );
    let beacon = b(beaconC[0], beaconC[1]);
    return s(sensorC[0], sensorC[1], beacon);
  });
}

let sensors = parseLines(lines);


y = 2000000;
const taken = new Set();
const relevantSensors = sensors.filter(s => s.y - s.d <= y && s.y + s.d >= y);
const [maxLeft, maxRight] = relevantSensors.reduce((acc, rs) => [Math.min(acc[0], rs.x - rs.d), Math.max(acc[1], rs.x + rs.d)], [0, 0]);

for (let x = maxLeft; x <= maxRight; x++) {
  relevantSensors.forEach(s => {
    if (k(x, y) !== s.beacon.key && Math.abs(s.x - x) + Math.abs(s.y - y) <= s.d) {
      taken.add(k(x, y));
    }
  });
}
console.log('first answer', taken.size);

// part two
//
let start = new Date();

const MIN = 0, MAX = 4000000;

for (let y = MIN; y < MAX; y++) {
  let takenList = sensors.map(s => s.getTaken(y))
      .filter(ar => ar.length)
      .sort((a, b) => a[0] - b[0])
      .reduce((acc, v) => {
        if (acc.length === 0) {
          return [v];
        } else {
          let ts = acc.filter(a => v[0] >= a[0] && v[0] <= a[1] + 1);
          if (ts.length === 1) {
            if (v[1] > ts[0][1]) {
              //extend found range
              ts[0][1] = v[1];
            }
          } else {
            acc.push(v);
          }
          return acc;
        }
      }, []);
  if (takenList.length === 2) {
    const x = takenList[0][1] + 1;
    console.log('answer 2', x * 4000000 + y);
    break;
  }
}

console.log(new Date() - start);
