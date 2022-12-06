const {readLinesFromFile} = require("../helpers/read-lines-from-file");

const input = readLinesFromFile('./6-input.txt')[0];

console.log('marker', findFirstMarker(input));
console.log('message', findFirstMessage(input));

function findFirstMarker(input) {
  return findFirstUniqueString(input, 4);
}

function findFirstMessage(input) {
  return findFirstUniqueString(input, 14);
}

function findFirstUniqueString(input, length) {
  for (let i = length; i < input.length; i++) {
    const previousFourCharacters = input.substring(i - length, i);
    if (!hasRepeats(previousFourCharacters)) {
      return i;
    }
  }
}

function hasRepeats(str) {
  return /(.).*\1/.test(str);
}
