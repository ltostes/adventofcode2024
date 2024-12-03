const readFileToArray = require('./aux/readFileToArray');

const input = readFileToArray('inputs/day3.txt').join('')

const testInput = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))"

// Part I

const regex1 = /mul\((\d{1,3}),(\d{1,3})\)/g; // Gets all ocurrences of mul(X,Y), with X and Y being 1 to 3 digit integers

// const matches1 = Array.from(testInput.matchAll(regex1))
const matches1 = Array.from(input.matchAll(regex1))

const multiplication_pairs = [...matches1.map(match => [parseInt(match[1]),parseInt(match[2])])]

// Solution 1
const solution1 = multiplication_pairs.reduce((acc, cur) => acc + cur[0]*cur[1], 0)

console.log(`Solution 1: ${solution1}`);

// Part II
const testInput2 = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5)"
const regex2 = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g; // Gets all ocurrences of mul(X,Y) but also do() and don't()

// const matches2 = Array.from(testInput2.matchAll(regex2));
const matches2 = Array.from(input.matchAll(regex2));
const matches2_processed = matches2.map(m => ({
    dodont: m[0] == 'do()' ? 1 :
            m[0] == "don't()" ? 2 :
            0,
    X: parseInt(m[1]),
    Y: parseInt(m[2]),
}))

// Solution 2
const solution2 = matches2_processed.reduce((acc, cur) => {
                                                            if (cur.dodont == 1) return {...acc, do: true}
                                                            if (cur.dodont == 2) return {...acc, do: false}
                                                            if (cur.dodont == 0 && acc.do) return {...acc, currentsum: acc.currentsum + cur.X * cur.Y}
                                                            return acc;
                                                        }
                                                        , {currentsum: 0, do: true})

console.log(`Solution 2: ${solution2.currentsum}`);
