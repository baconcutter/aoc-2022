const {readLinesFromFile} = require("../helpers/read-lines-from-file");

const lines = readLinesFromFile('./8-input.txt');

// part 1
let visibleTrees = (lines.length * 4) - 4;

function visibleFromLeft(rowIndex, columnIndex) {
  for (let i = 0; i < columnIndex; i++) {
    if (lines[rowIndex][columnIndex] <= lines[rowIndex][i]) {
      return false;
    }
  }
  return true;
}

function visibleFromRight(rowIndex, columnIndex) {
  for (let i = lines.length - 1; i > columnIndex; i--) {
    if (lines[rowIndex][columnIndex] <= lines[rowIndex][i]) {
      return false;
    }
  }
  return true;
}

function visibleFromTop(rowIndex, columnIndex) {
  for (let i = 0; i < rowIndex; i++) {
    if (lines[rowIndex][columnIndex] <= lines[i][columnIndex]) {
      return false;
    }
  }
  return true;
}

function visibleFromBottom(rowIndex, columnIndex) {
  for (let i = lines.length - 1; i > rowIndex; i--) {
    if (lines[rowIndex][columnIndex] <= lines[i][columnIndex]) {
      return false;
    }
  }
  return true;
}

for (let i = 1; i < lines.length - 1; i++) {
  for (let x = 1; x < lines.length - 1; x++) {
    if (visibleFromTop(i, x) || visibleFromRight(i, x) || visibleFromBottom(i, x) || visibleFromLeft(i, x)) {
      visibleTrees += 1;
    }
  }
}

console.log(visibleTrees);

// part 2

function getVisibleTreesTop(rowIndex, columnIndex) {
  visibleTrees = 0;
  for (let i = rowIndex -1; i >= 0; i--) {
    visibleTrees+=1;
    if (lines[rowIndex][columnIndex] <= lines[i][columnIndex]) {
      return visibleTrees;
    }
  }
  return visibleTrees;
}

function getVisibleTreesBottom(rowIndex, columnIndex) {
  visibleTrees = 0;
  for (let i = rowIndex+1; i < lines.length; i++) {
    visibleTrees+=1;
    if (lines[rowIndex][columnIndex] <= lines[i][columnIndex]) {
      return visibleTrees;
    }
  }
  return visibleTrees;
}

function getVisibleTreesLeft(rowIndex, columnIndex) {
  visibleTrees = 0;
  for (let i = columnIndex -1; i >=0; i--) {
    visibleTrees+=1;
    if (lines[rowIndex][columnIndex] <= lines[rowIndex][i]) {
      return visibleTrees;
    }
  }
  return visibleTrees;
}


function getVisibleTreesRight(rowIndex, columnIndex) {
  visibleTrees = 0;
  for (let i = columnIndex +1; i < lines.length; i++) {
    visibleTrees+=1;
    if (lines[rowIndex][columnIndex] <= lines[rowIndex][i]) {
      return visibleTrees;
    }
  }
  return visibleTrees;
}

let max = 0;
for (let i = 1; i < lines.length - 1; i++) {
  for (let x = 1; x < lines.length - 1; x++) {
    const visibleTreesTop = getVisibleTreesTop(i, x);
    const visibleTreesRight = getVisibleTreesRight(i, x);
    const visibleTreesBottom = getVisibleTreesBottom(i, x);
    const visibleTreesLeft = getVisibleTreesLeft(i,x);
    const result = visibleTreesTop * visibleTreesRight * visibleTreesBottom * visibleTreesLeft;
    if(max < result) {
      max = result;
    }
  }
}

console.log(max);
