import readFileToArray from './aux/readFileToArray.js';

const lines = await readFileToArray('inputs/day2.txt');
const sep = ' ';

const testLines = [
    '7 6 4 2 1',
    '1 2 7 8 9',
    '9 7 6 2 1',
    '1 3 2 4 5',
    '8 6 4 4 1',
    '1 3 6 7 9'
]

const reports = lines.map(line => line.split(sep).map(level => parseInt(level)))

const removeIndexFromArray = (array, index) => [...array.slice(0, index), ...array.slice(index + 1)]

function reportIsSafe(report) {

    const initialValue = report[0]
    let desc = (report[1] - initialValue) < 0;

    for (let [prev_i, level] of report.slice(1).entries()) {
        const diff = level - report[prev_i];
        if (diff >= 0 && desc) return false;
        if (diff < 0 && !desc) return false;
        if (![1,2,3].includes(Math.abs(diff))) return false;
    }
    return true;
}

const reportIsSafeWithDampener = report => reportIsSafe(report) || report.some((level, index) => reportIsSafe(removeIndexFromArray(report, index)))

// Solution 1
const solution1 = reports.map(reportIsSafe).reduce((acc, cur) => cur ? acc + 1 : acc, 0)

// Solution 2
const solution2 =  reports.map(reportIsSafeWithDampener).reduce((acc, cur) => cur ? acc + 1 : acc, 0)

console.log(`Solution 1: ${solution1}`);
console.log(`Solution 2: ${solution2}`);
