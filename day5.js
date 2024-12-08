import readFileToArray from './aux/readFileToArray.js';
import _ from 'lodash';
import * as d3 from 'd3';

// Inputs

const input = await readFileToArray('inputs/day5.txt')

const testInput = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`.split(`\n`)

const processed = input.reduce((acc, cur) => {
    if (cur == '') return {...acc, stillSorters: false};
    if (acc.stillSorters) return {...acc, sorters: [...acc.sorters, [...cur.split('|')].map(d => parseInt(d))]}
    return {...acc, lines: [...acc.lines, [...cur.split(',')].map(d => parseInt(d))]}
}, {sorters:[], lines: [], stillSorters: true})

const sortFun = (a,b) => {
    const sorter = processed.sorters.find(f => f.includes(a) && f.includes(b))

    return sorter ? sorter[1] == a ? 1 : -1 : 0
}


// Solution 1
const checkList1 = (list) => {
    
        return _.isEqual([...list].sort(sortFun),list) ? 
            list[Math.floor(list.length / 2)] : 0
    }

console.log(`Solution 1: ${d3.sum(processed.lines.map(checkList1))}`);

// Solution 2
const checkList2 = (list) => {
    
    return _.isEqual([...list].sort(sortFun),list) ? 
        0 : [...list].sort(sortFun)[Math.floor(list.length / 2)]
}

console.log(`Solution 2: ${d3.sum(processed.lines.map(checkList2))}`);