const catchFile = require('../index.js');
const arrayResult = [{
    FileList: 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList'
}];

describe('catchFile::', () =>{
    it('Must be a function.', () => {
        expect(typeof catchFile).toBe('function');
    });

    it('Must return an array with results.', async () => {
        const result = await catchFile('C://Users//A//Documents//lib-markdown//tests//test-files//texto1.md');
        expect(result).toEqual(arrayResult);
    });

    it('Must return a string with "No links were found in file."', async () => {
        const result = await catchFile('tests//test-files//texto1_empty.md');
        expect(result).toBe('No links were found in file.');
    });

    it('Must warn that the given path is a dir', async () => {
    await expect(catchFile('C://Users//A//Documents//lib-markdown')).rejects.toThrow(/EISDIR The given path is a directory, not a file./)
    });

    it('Must throw an error when file not found', async () => {
        await expect(catchFile('C://Users//A//Documents//lib-markdown//tests//test-files//file-that-does-not-exist.md'))
        .rejects.toThrow(/ENOENT The given path does not refer to an existent file./)
      });
});
