const fs = require('fs');
const path = require('path');
let filesArrCopy;
let filesArr;

(async () => {
	try {
		await fs.promises.mkdir(path.join(__dirname, 'files-copy'), { recursive: true });
		filesArrCopy = await fs.promises.readdir(path.join(__dirname, 'files-copy'))
		filesArr = await fs.promises.readdir(path.join(__dirname, 'files'))
		if (filesArrCopy.length > 0) {
			for (let file of filesArrCopy) {
				fs.promises.unlink(path.join(__dirname, 'files-copy', file))
			}
		}

		if (filesArr.length > 0) {
			for (let file of filesArr) {
				fs.promises.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file))
			}
		}
		console.log('Файлы скопированы в папку files-copy')
	} catch (err) {
		console.log('Произошла ошибка')
		console.log(err)
	}
})()