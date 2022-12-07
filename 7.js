const {readLinesFromFile} = require("../helpers/read-lines-from-file");

const linesInput = readLinesFromFile('./7-input.txt');

const DIRECTORY = 'dir';
const FILE = 'file';

function parseStructure(lines, lineIndex, currentDirectory) {
  for (let i = lineIndex; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith(DIRECTORY)) {
      currentDirectory.content.push(dir(line.split(' ')[1]));
    } else if (line.startsWith('$')) {
      if (line === '$ cd ..') {
        return i;
      } else if (line.startsWith('$ cd')) {
        const dirName = line.split(' ')[2];
        const t = currentDirectory.content.find(c => c.type === DIRECTORY && c.name === dirName);
        i = parseStructure(lines, i + 2, t);
      }
    } else {
      // file
      const [fileSize, fileName] = line.split(" ");
      currentDirectory.content.push(file(fileName, Number(fileSize)));
    }
  }
}

function calcSize(dir) {
  dir.size = dir.content.reduce((acc, c) => {
    if (c.type === DIRECTORY) {
      return acc + calcSize(c);
    } else {
      return acc + c.size;
    }
  }, 0);
  return dir.size;
}

function dir(name) {
  return {type: DIRECTORY, name, size: 0, content: []};
}

function file(name, size) {
  return {type: FILE, name, size};
}

function sumDirSizeOfMaxSize(dir, maxSizeIncl) {
  return dir.content
      .filter(c => c.type === DIRECTORY)
      .reduce((acc, d) => {
        if (d.size <= maxSizeIncl) {
          return acc + d.size + sumDirSizeOfMaxSize(d, maxSizeIncl)
        }
        return acc + sumDirSizeOfMaxSize(d, maxSizeIncl);
      }, 0);
}

const root = dir("/");
parseStructure(linesInput, 2, root);
calcSize(root);
console.log(sumDirSizeOfMaxSize(root, 100000));

function dirList(dir) {
  return dir.content
      .filter(c => c.type === DIRECTORY)
      .reduce((acc, d) => acc.concat(dirList(d)), [dir]);
}

function findSmallestDirToRemove(){
  const sortedDirList = dirList(root).sort((a,b) => b.size - a.size);
  const totalSpace =       70000000;
  const totalSpaceNeeded = 30000000;
  const freeSpace = totalSpace - sortedDirList[0].size;
  const requiredSpace = totalSpaceNeeded - freeSpace;
  let smallestPossibleDir = 0;
  for (let sortedDirListElement of sortedDirList) {
    if(sortedDirListElement.size < requiredSpace){
      break;
    }
    smallestPossibleDir = sortedDirListElement.size;
  }
  return smallestPossibleDir;
}

console.log(findSmallestDirToRemove());
