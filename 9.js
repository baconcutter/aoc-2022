const {readLinesFromFile} = require("../helpers/read-lines-from-file");

const instructions = readLinesFromFile('./9-input.txt').map(instruction => instruction.split(" "));

const p = (x, y) => ({x, y});
const isAdjacent = (a, b) => Math.abs(a.x - b.x) <= 1 && Math.abs(a.y - b.y) <= 1;
const sameRow = (a, b) => a.y === b.y;
const sameColumn = (a, b) => a.x === b.x;

const head = [p(0, 0)];
const tail1 = [p(0, 0)];
const tail2 = [p(0, 0)];
const tail3 = [p(0, 0)];
const tail4 = [p(0, 0)];
const tail5 = [p(0, 0)];
const tail6 = [p(0, 0)];
const tail7 = [p(0, 0)];
const tail8 = [p(0, 0)];
const tail9 = [p(0, 0)];

function letTailFollowHead(hList, tList) {
  const h = hList[hList.length - 1];
  const t = {...tList[tList.length - 1]};

  if (!isAdjacent(h, t)) {
    if (sameRow(h, t)) {
      t.x = h.x > t.x ? t.x + 1 : t.x - 1;
    } else if (sameColumn(h, t)) {
      t.y = h.y > t.y ? t.y + 1 : t.y - 1;
    } else {
      t.x = h.x > t.x ? t.x + 1 : t.x - 1;
      t.y = h.y > t.y ? t.y + 1 : t.y - 1;
    }
    tList.push(t);
  }
}

instructions.forEach(([direction, steps]) => {
  for (let i = 0; i < Number(steps); i++) {
    const newHead = {...head[head.length - 1]};
    switch (direction) {
      case 'R':
        newHead.x++;
        break;
      case 'L':
        newHead.x--;
        break;
      case 'U':
        newHead.y++;
        break;
      case 'D':
        newHead.y--;
        break;
      default:
        throw '??';
    }
    head.push(newHead);
    letTailFollowHead(head, tail1);
    letTailFollowHead(tail1, tail2);
    letTailFollowHead(tail2, tail3);
    letTailFollowHead(tail3, tail4);
    letTailFollowHead(tail4, tail5);
    letTailFollowHead(tail5, tail6);
    letTailFollowHead(tail6, tail7);
    letTailFollowHead(tail7, tail8);
    letTailFollowHead(tail8, tail9);
  }
});

// answer 1
console.log(new Set(tail1.map(t => JSON.stringify(t))).size);

// answer 2
console.log(new Set(tail9.map(t => JSON.stringify(t))).size);
