const {readLinesFromFile} = require("../helpers/read-lines-from-file");
const instructions = readLinesFromFile('./10-input.txt').map(instruction => instruction.split(" "));

// PART ONE
const cycles = instructions.reduce((acc, [operation, number]) => {
  const previousCycle = acc[acc.length-1] ?? 1;
  if(operation === 'noop'){
    return [...acc, previousCycle];
  } else {
    const addx = Number(number);
    return [...acc, previousCycle, previousCycle + addx];
  }
}, []);

let signalStrength = 0;

for (let i = 20; i <= 220; i+=40) {
  const strength = cycles[i - 2] * i;
  signalStrength = signalStrength + strength;
}
console.log(signalStrength);

// PART TWO
let xRegister = 1;
const registerOverlapsCycle = (cycleNr) => cycleNr === xRegister - 1 || cycleNr === xRegister || cycleNr === xRegister + 1;
let pixels = '';

function outputPixelRowAndReset() {
  if (pixels.length === 40) {
    console.log(pixels);
    pixels = '';
  }
}

function drawPixel() {
  pixels = pixels.concat(registerOverlapsCycle(pixels.length) ? '#' : '.');
}

for (let i = 0; i < instructions.length; i++) {
  const [operation, nr] = instructions[i];
  drawPixel();
  outputPixelRowAndReset();
  if (operation !== 'noop') {
    drawPixel();
    outputPixelRowAndReset();
    xRegister += Number(nr);
  }
}
