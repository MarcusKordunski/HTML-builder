const fs = require('fs');
const path = require('path');
let filesArr;

(async () => {
	filesArr = await fs.promises.readdir(path.join(__dirname, 'secret-folder'));
	for (let file of filesArr) {
		fs.stat(path.join(__dirname, 'secret-folder', `${file}`), (err, stats) => {
			if (stats.isFile()) {
				console.log(`${path.parse(file).name} - ${path.extname(path.join(__dirname, `${file}`)).substring(1)} - ${stats.size}b`)
			}
		})
	}

})();
