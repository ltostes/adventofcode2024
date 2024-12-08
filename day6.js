import readFileToArray from './aux/readFileToArray.js';
import _ from 'lodash';
import * as d3 from 'd3';

// Inputs

const input = await readFileToArray('inputs/day6.txt')

const testInput = `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`.split(`\n`).slice(1)

const imap = input.map((l,l_i) => l.split('').map((c, c_i) => ({c, 
                                                                    block: c == '#', 
                                                                    guard: ['<','^','>','v'].includes(c) && c, 
                                                                    X: c_i, 
                                                                    Y:l_i,
                                                                    potential_circle_block: false}))).flat();

const rotatingDirections = [
    {key: ">", dir: [1,0]},
    {key: "v", dir: [0,1]},
    {key: "<", dir: [-1,0]},
    {key: "^", dir: [0,-1]},
]

const init_pos = imap.find(f => f.guard)
const init = {...init_pos, 
        dir_i: rotatingDirections.map(d => d.key).indexOf(init_pos.c)
    }

const getNext = ({X, Y, dir_i}) => {
    const next = {
        X: X + rotatingDirections[dir_i].dir[0],
        Y: Y + rotatingDirections[dir_i].dir[1],
        dir_i
    }
    next.tile = imap.find(f => f.X == next.X && f.Y == next.Y);
    return next;
}

const walk = ({X, Y, dir_i}) => {
    // Update that guard has passed on current pos
    const curpos = imap.find(f => f.X == X && f.Y == Y);
    curpos.guard = curpos.guard ? "+" : rotatingDirections[dir_i].key;

    // Get next tile
    const next = getNext({X, Y, dir_i});

    // If next is nothing, stop
    if (!next.tile) return;

    // If next is a block, turn to next direction
    const next_dir_i =  (dir_i + 1) % rotatingDirections.length
    if (next.tile.c == "#") return walk({X, Y, dir_i: next_dir_i})
    
    // Else we can walk. 
    // But first we can check if its a potential circle block ahead
    const potentialNext = getNext({X, Y, dir_i: next_dir_i});
    const potentialGuardDir = rotatingDirections[next_dir_i].key
    // We can consider it a potential if the guard has already passed that tile in that direction (after rotating from where we are)
    if ([potentialGuardDir, '+'].includes(potentialNext.tile?.guard)) {
        next.tile.potential_circle_block = true;
    }

    // Finally, walk
    return walk(next)
}

const getWalked = (map) => map.filter(f => f.guard)
const getPotential = (map) => map.filter(f => f.potential_circle_block)

walk(init);

// Solution 1
console.log(`Solution 1: ${getWalked(imap).length}`);

// Solution 2
console.log(`Solution 2: ${getPotential(imap).length}`); // Still incorrect :'(


