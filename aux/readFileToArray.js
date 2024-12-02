const fs = require('fs');

function readFileToArray(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    return data.split(/\r?\n/);
}

module.exports = readFileToArray;