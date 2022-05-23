const fs = require('fs')
const path = require('path')
const { stdout, stdin, exit } = process

console.log('Здравствуйте, введите текст для записи в файл text.txt')

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8')

stdin.on('data', chunk => {
	output.write(chunk)
	if (chunk.toString().trim() === 'exit') {
		process.exit()
	}
});

process.on('exit', () => stdout.write('Было весело! Пока!'))

process.on('SIGINT', exit)