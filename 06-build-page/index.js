const fs = require('fs');
const path = require('path')
let filesArrProjectDist;
let filesArrStyles;

(async () => {
	try {
		await fs.promises.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });

		filesArrProjectDist = await fs.promises.readdir(path.join(__dirname, 'project-dist'))
		filesArrStyles = await fs.promises.readdir(path.join(__dirname, 'styles'))

		await fs.promises.rm(path.join(__dirname, 'project-dist'), { recursive: true, force: true });
		await fs.promises.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });

		await copyFolder(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));

		for await (let file of filesArrStyles) {
			if (path.extname(path.join(__dirname, 'styles', file)) === '.css') {
				let readableStream = fs.createReadStream(path.join(__dirname, 'styles', file))
				readableStream.on('data', chunk => fs.promises.appendFile(path.join(__dirname, 'project-dist', 'style.css'), chunk))
			}
		}
		fs.open(path.join(__dirname, 'project-dist', 'index.html'), 'w', err => {
			if (err) throw err;
		}
		);

		let file = (await fs.promises.readFile(path.join(__dirname, 'template.html'), 'utf-8')).toString();

		const tempTags = file.match(/\{\{[a-z]+\}\}/gm);

		for (let i = 0; i < tempTags.length; i++) {
			const tempHTML = await fs.promises.readFile(path.join(__dirname, 'components', `${tempTags[i].slice(2, tempTags[i].length - 2)}.html`), 'utf-8');
			const temp = new RegExp(tempTags[i], 'gm');

			file = file.replace(temp, tempHTML);
		}

		await fs.promises.writeFile(path.join(__dirname, 'project-dist', 'index.html'), file);

	} catch (err) {
		console.log('Произошла ошибка')
		console.log(err)
	}
})()

async function copyFolder(src, dest) {
	await fs.promises.mkdir(dest, { recursive: true });
	const filesArr = await fs.promises.readdir(src);

	filesArr.forEach((file) => {
		fs.stat(path.join(src, file), (err, stats) => {
			if (stats.isFile()) {
				fs.promises.copyFile(path.join(src, file), path.join(dest, file));
			} else if (stats.isDirectory()) {
				copyFolder(path.join(src, file), path.join(dest, file));
			}
		}
		)
	});

}