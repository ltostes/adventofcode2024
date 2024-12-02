const readFileToArray = require('./aux/readFileToArray');

const lines = readFileToArray('inputs/day1.txt');
const sep = '  ';

const arrays = [lines.map(d => parseInt(d.split(sep)[0])), lines.map(d => parseInt(d.split(sep)[1]))]

const ordered_arrays = arrays.map(a => a.sort())


// Solution 1
const solution1 = arrays[0].reduce((acc, cur, idx) => acc + Math.abs(cur - arrays[1][idx]), 0);

// Solution 2
const solution2 = arrays[0].reduce((acc, cur, idx) => acc + cur * arrays[1].filter(f => f == cur).length, 0);

console.log(`Solution 1: ${solution1}`);
console.log(`Solution 2: ${solution2}`);
