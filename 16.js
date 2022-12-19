const {readLinesFromFile} = require("../helpers/read-lines-from-file");
const lines = readLinesFromFile('./16-input.txt');

const v = (key, rate, leadTo) => ({key, rate, leadTo, open: false, distanceToOthers: new Map()});

const valves = lines.map(l => {
  [_, valve, _, _, rateString, _, _, _, _, ...leadToOtherValves] = l.split(' ');
  const rate = Number(rateString.split('=')[1].split(';')[0]);
  return v(valve, rate, leadToOtherValves.map(v => v.slice(0, 2)));
});

const valveMap = new Map();
valves.forEach(valve => {
  valveMap.set(valve.key, valve);
  valve.distanceToOthers = valves
      .filter(x => x.key !== valve.key)
      .map(x => ({key: x.key, valve: x, d: distanceFrom([x], 0, valve.key)}));
});

function distanceFrom(valveList, acc, start) {
  if (valveList.some(v => v.key === start)) {
    return acc;
  }
  let nestedValveList = valveList.flatMap(v => v.leadTo).map(k => valves.find(v => v.key === k));
  return distanceFrom(nestedValveList, acc + 1, start);
}

function enrichWithMaxPressureAndAdditionalTurns(curValve, closedValve, turn) {
  if (curValve.key === closedValve.key) {
    const val = closedValve.rate * (MAX_TURNS - turn - 1);
    return {valve: closedValve, maxPressure: val, plusTurns: 1};
  } else {
    let x = curValve.distanceToOthers.find(d => d.key === closedValve.key);
    const val = x.valve.rate * (MAX_TURNS - turn - x.d - 1);
    return {valve: closedValve, maxPressure: val, plusTurns: x.d + 1};
  }
}

// PART ONE

let MAX_TURNS = 30;
let atValve = valveMap.get('AA');

function simulate(curValve, turn, openValveKeys, totalPressure) {
  return valves.filter(valve => !openValveKeys.some(k => k === valve.key) && valve.rate > 0)
      .map(closedValve => enrichWithMaxPressureAndAdditionalTurns(curValve, closedValve, turn))
      .reduce((acc, k) => {
        if (turn + k.plusTurns > MAX_TURNS) {
          return acc;
        }
        const result = simulate(k.valve, turn + k.plusTurns, [...openValveKeys, k.valve.key], totalPressure + k.maxPressure);
        if (result > acc) {
          acc = result;
        }
        return acc;
      }, 0) || totalPressure;
}

console.log('part one', simulate(atValve, 0, [], 0));


// PART TWO

function simulatePartTwo(curValve, elephantValve, myTurn, elephantTurn, openValveKeys, totalPressure) {
  console.log(myTurn, elephantTurn, openValveKeys.join(','));
  let closedValves = valves.filter(valve => !openValveKeys.some(k => k === valve.key) && valve.rate > 0);
  return closedValves
      .map(closedValve => enrichWithMaxPressureAndAdditionalTurns(curValve, closedValve, myTurn))
      .reduce((acc, myTarget) => {
        const result = closedValves
            .filter(cv => cv.key !== myTarget.valve.key)
            .map(closedValveForElephant => enrichWithMaxPressureAndAdditionalTurns(elephantValve, closedValveForElephant, elephantTurn))
            .reduce((nestedAcc, elephantTarget) => {
              if (myTurn + myTarget.plusTurns > MAX_TURNS || elephantTurn + elephantTarget.plusTurns > MAX_TURNS) {
                return nestedAcc;
              }

              const nestedResult = simulatePartTwo(myTarget.valve, elephantTarget.valve, myTurn + myTarget.plusTurns, elephantTurn + elephantTarget.plusTurns,
                  [...openValveKeys, myTarget.valve.key, elephantTarget.valve.key], totalPressure + myTarget.maxPressure + elephantTarget.maxPressure);
              if (nestedResult > nestedAcc) {
                return nestedResult;
              }
              return nestedAcc
            }, 0);
        if (result > acc) {
          acc = result;
        }
        return acc;
      }, 0) || totalPressure;
}


console.log('part two', simulatePartTwo(atValve, atValve, 4, 4, [], 0));
