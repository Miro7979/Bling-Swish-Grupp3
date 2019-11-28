// Cleaning up strange paths in index
// starting with /Miro7979/Bling-Swish-Grupp3

const fs = require('fs');
const path = require('path');

const indexPath = path.resolve(__dirname, './build', 'index.html');
let contents = fs.readFileSync(indexPath, 'utf-8');
contents = contents.split('/Miro7979/Bling-Swish-Grupp3').join('');
fs.writeFileSync(indexPath, contents, 'utf-8');
console.log('Cleaned paths in index.html');