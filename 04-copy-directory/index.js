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


// async function clearFolder(...folders) {

// 	let pathToFolder = [__dirname]
// 	pathToFolder.push(...folders)
// 	filesArr = await fs.promises.readdir(path.join.apply(null, pathToFolder));
// 	console.log(...pathToFolder)
// 	if (filesArr.length > 0) {
// 		for await (file of filesArr) {
// 			let pathToFile = pathToFolder.slice()
// 			pathToFile.push(file)

// 			fs.stat(path.join.apply(null, pathToFile), (err, stats) => {


// 				if (stats.isFile()) {
// 					fs.promises.unlink(path.join.apply(null, pathToFile));

// 				} else if (stats.isDirectory()) {
// 					clearFolder(...folders, file);

// 				}

// 				pathToFile.pop()

// 			})
// 		}
// 	} else if (pathToFolder[pathToFolder.length - 1] != 'files-copy') {
// 		fs.promises.rmdir(path.join.apply(null, pathToFolder))
// 	}
// }