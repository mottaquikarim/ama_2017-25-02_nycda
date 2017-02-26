const { fileMove, asyncFileMove } = require('./fs-move');

fileMove('./p4.json', './mv/p4.json')
	.then(() => {
		console.log('done!')
	})
	.catch((e) => {
		console.log(e)
	});

asyncFileMove('./fs-move.js', './mv/fs-move.js')
	.then(() => {
		console.log('done!')
	})
	.catch((e) => {
		console.log(e)
	});

