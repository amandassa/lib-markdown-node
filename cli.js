const chalk = require('chalk');
const checkURLs = require('./http-validacao');
const catchFile = require('./index');
const path = process.argv;

async function showText (filePath) {
    const result = await catchFile(filePath[2]);
    if (path[3] === 'check') {
        console.log(chalk.yellow('Validated links: '), await checkURLs(result));
    } else {
    console.log(chalk.yellow('Links retrieved: '), result);
    }
}
showText(path);