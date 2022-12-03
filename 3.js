const {readLinesFromFile} = require("../helpers/read-lines-from-file");

const lines = readLinesFromFile('./3-input.txt');
const priorities = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

/*PART ONE*/

const duplicates = [];
for (let line of lines) {
  const firstPart = new Set(line.substring(0, (line.length / 2)).split(""));
  const secondPart = line.substring((line.length / 2));

  for (let value of firstPart.values()) {
    if (secondPart.includes(value)) {
      duplicates.push(value);
    }
  }
}

console.log(duplicates.reduce((acc, d) => {
  return acc + priorities.indexOf(d) + 1;
}, 0));


/*PART TWO*/

const badges = [];
for (let i = 0; i < lines.length; i+=3) {
  for(let x = 0; x < lines[i].length; x++){
    const char = lines[i][x];
    if(lines[i+1].includes(char) && lines[i+2].includes(char)){
      badges.push(char);
      break;
    }
  }
}
console.log(badges.reduce((acc, b) => {
  return acc + priorities.indexOf(b) + 1;
}, 0));
