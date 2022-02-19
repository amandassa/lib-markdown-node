const chalk = require('chalk');
const catchFile = require('./index');
const path = process.argv;

async function showText (filePath) {
    const result = await catchFile(filePath[2]);
    console.log(chalk.yellow('Links retrieved: '), result);
}
showText(path);