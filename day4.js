import readFileToArray from './aux/readFileToArray.js';
import _ from 'lodash';
import * as d3 from 'd3';

// Inputs

const input = await readFileToArray('inputs/day4.txt')

const testInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`.split(`\n`)

const imap = input.map((l,l_i) => l.split('').map((c, c_i) => ({st: c,X: l_i, Y:c_i}))).flat();

// Aux

const cartesianProduct = (array1, array2) => array1.map(i1 => array2.map(i2 => [i1,i2])).flat()

const prepareNextStep = ({st, X, Y, op, ...others}) => ({
    st,
    nextX: X + op[0],
    nextY: Y + op[1],
    op,
    ...others
})

const takeNextStep = ({st, nextX, nextY, op, ...others}) => ({
    st: st + imap.find(({next_st, X, Y}) => nextX == X && nextY == Y)?.st,
    X: nextX,
    Y: nextY,
    op,
    ...others
});

// Prep for Solution 1

const target1 = "XMAS"
const initialAdjacentsOperations = cartesianProduct([-1,0,1],[-1,0,1]);

// Step 0 is selecting all X and pointing to all directions
const step0_sol1 = imap
                .filter(f => f.st == target1[0])
                .map((step) => initialAdjacentsOperations.map(op => ({...step,op})))
                .flat()
                ;

// Forming the incremental steps we want
const stepsTargets_sol1 = _.range(1,target1.length).map(d => target1.slice(0,d+1))

// Taking each step
const final_sol1 = stepsTargets_sol1.reduce((step, cur_target) => step
                                                    .map(prepareNextStep)
                                                    .map(takeNextStep)
                                                    .filter(f => f.st == cur_target)
                                                , step0_sol1)

// Solution 1
console.log(`Solution 1: ${final_sol1.length}`);


// Prep for Solution 2

const target2 = "MAS"

// Step 0 is now different: selecting all A and attempting to build an X from adjacent edges, but keeping track of which pach belongs to which A so we can count later
const step0_sol2 = imap
                .filter(f => f.st == 'A')
                .map(({X, Y}, id) => [
                     {st: '', X: X - 2, Y: Y - 2, op: [1,1],id}, , //Top left
                     {st: '', X: X + 2, Y: Y - 2, op: [-1,1], id}, //Top right
                     {st: '', X: X - 2, Y: Y + 2, op: [1,-1], id}, //Bottom left
                     {st: '', X: X + 2, Y: Y + 2, op: [-1,-1], id}, //Bottom right
                ])
                .flat()
                ;


// Forming the incremental steps we want
const stepsTargets_sol2 = _.range(target2.length).map(d => target2.slice(0,d+1))

// // Taking each step
const interm_sol2 = stepsTargets_sol2.reduce((step, cur_target) => step
                                                    .map(prepareNextStep)
                                                    .map(takeNextStep)
                                                    .filter(f => f.st == cur_target)
                                                , step0_sol2)

// Now grouping by ID to check which ones actually form X (2 successes)
const final_sol2 = d3.groups(interm_sol2, d => d.id).filter(f => f[1].length == 2)

// Solution 2
console.log(`Solution 2: ${final_sol2.length}`);