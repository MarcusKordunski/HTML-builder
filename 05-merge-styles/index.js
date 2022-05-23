const fs = require('fs');
const path = require('path');
let filesArrProjectDist;
let filesArrStyles;

(async () => {
	try {
		filesArrProjectDist = await fs.promises.readdir(path.join(__dirname, 'project-dist'))
		filesArrStyles = await fs.promises.readdir(path.join(__dirname, 'styles'))

		for (let file of filesArrProjectDist) {
			if (path.extname(path.join(__dirname, 'project-dist', file)) === '.css') {
				fs.promises.unlink(path.join(__dirname, 'project-dist', file))
			}
		}

		await fs.promises.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });

		for await (let file of filesArrStyles) {
			if (path.extname(path.join(__dirname, 'styles', file)) === '.css') {
				let readableStream = fs.createReadStream(path.join(__dirname, 'styles', file))
				readableStream.on('data', chunk => fs.promises.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), chunk))
			}
		}

	} catch (err) {
		console.log('Произошла ошибка')
		console.log(err)
	}
})()