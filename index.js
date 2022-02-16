import fs from 'fs';
import chalk from 'chalk';

function catchError (err) {
    let errorMsg = '';
    switch (err.code) {
        case 'EISDIR':
            errorMsg = 'The given path is a directory, not a file.';
            break;
        case 'ENOENT':
            errorMsg = 'The given path does not refer to an existent file.';
            break;
        default:
            errorMsg = 'There was an error while reading the file.';
            break;
    }
    throw new Error(chalk.red(err.code, errorMsg));
}

async function catchFile (path) {
    const encoding = 'utf-8';
    try {
        const data = await fs.promises.readFile(path, encoding);
        console.log(chalk.greenBright(data));
    } catch (error) {
        catchError(error);
    }
    
}

catchFile('./files/texto1.md')