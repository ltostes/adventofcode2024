import fs from 'fs';

async function readFileToArray(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    return data.split(/\r?\n/);
}

export default readFileToArray;