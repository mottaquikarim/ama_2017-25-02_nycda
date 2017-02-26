// OLD WAY:
// const fsPromise = require('./fs-promise');
// this, fsPromise.fileRead(), fsPromise.fileWrite()

// ALT WAY:
const {fileRead, fileWrite} = require('./fs-promise');

const filesToRead = [
	'./package.json', 
	'../file-cmds/app.js',
	'../file-cmds/asdfasdf.js',
	'../file-cmds/file-copy-v1.js',
];

let a = fileRead(filesToRead[0]);
a = a.then((data) => {
	console.log(`READ: ${filesToRead[0]}`)
	return fileRead(filesToRead[1])
});
a = a.then((data) => {
	console.log(`READ: ${filesToRead[1]}`)
	return fileRead(filesToRead[2])
});
a = a.then((data) => {
	console.log(`READ: ${filesToRead[2]}`)
	return fileRead(filesToRead[3])
}, (err) => {
	console.log('LOL I effed up');
	console.log(`ERR: ${filesToRead[2]}`)
});

a = a.then((data) => {
	console.log(`READ: ${filesToRead[3]}`)
})

Promise.all([a])
.then(() => {
	console.log('done');
})
.catch((e) => {
	console.log(e)
})
// let currentPromise = null;
// for(let i = 0; i < filesToRead.length; ++i) {
// 	if (currentPromise === null) {
// 		currentPromise = fileRead(filesToRead[i]);
// 	}
// 	else {
// 		currentPromise = currentPromise.then(() => fileRead(filesToRead[i]));
// 	}
// }

/*
const filesToReadAsPromise = filesToRead.map((currentFileToRead) => {
	return fileRead(currentFileToRead)
		.then((fileContents) => {
			console.log(`READ ${currentFileToRead}`);
			console.log(fileContents);
		})
		.catch((err) => {
			console.log(`ERR reading ${currentFileToRead}`);
			console.log(err);
		});
});

Promise.all(filesToReadAsPromise)
.then((results) => {
	console.log('all done');
})
.catch((e) => {
	console.log(e)
})
*/