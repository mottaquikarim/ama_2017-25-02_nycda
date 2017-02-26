const fsPromise = require('./fs-promise');

const rp = (argName, type) => {
	throw new Error(`${argName}<${type}> is required.`);
}
const move = (srcFile, destFile = rp('destFile', 'string')) => {
	const fileParts = destFile.split('/');
	const fileName = fileParts.pop();
	const dirPath = fileParts.join('/');

	// before anything, check to see if destFile dir exists
	const action0 = fsPromise.fileCheckDir(dirPath);

	// first, read the file
	const action1 = action0.then(() => fsPromise.fileRead(srcFile));
	// then, write the file
	const action2 = action1.then((fileContent) => {
		return fsPromise.fileWrite(destFile, fileContent);
	});
	// delete the o.g. file
	const lastAction = action2.then(() => fsPromise.fileDelete(srcFile));

	// return promise
	return lastAction;
};

const mvAsync = async (srcFile, destFile = rp('destFile', 'string')) => {
	const fileParts = destFile.split('/');
	const fileName = fileParts.pop();
	const dirPath = fileParts.join('/');

	// before anything, check to see if destFile dir exists
	const action0 = await fsPromise.fileCheckDir(dirPath);

	// first, read the file
	const fileContent = await fsPromise.fileRead(srcFile);

	// then, write the file
	const action2 = await fsPromise.fileWrite(destFile, fileContent);

	// delete the o.g. file
	const lastAction = await fsPromise.fileDelete(srcFile);

	// return promise
	return lastAction;
};

module.exports = {
	fileMove: move,
	asyncFileMove: mvAsync,
}