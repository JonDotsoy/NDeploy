import fs from 'fs'
import path from 'path'

let binFolder = path.normalize(__dirname + '/../bin')

let scriptCliFile = ''
+ '#!/usr/bin/env node' + '\n'
+ '' + '\n'
+ 'require(\'../lib/cli\')' + '\n'
+ '' + '\n'

Promise.resolve(new Promise((resolve, reject) => {
	fs
		.mkdir(
			binFolder,
			0o777,
			(err, folder) => {
				if (err) reject(err)
				else resolve(folder)
			}
		)
}))
.catch(err => (err.code && err.code == 'EEXIST') ? Promise.resolve(binFolder) : Promise.reject(err) )
.then(folder => new Promise ((resolve, reject) => {
	fs
		.writeFile(
			path.normalize(folder + '/cli.js'),
			scriptCliFile,
			{
				'encoding': 'utf8',
				'mode': 0o766,
				'flag': 'w',
			},
			(err) => {
				if (err) reject(err)
				else resolve(true)
			}
		)
}))
.catch(err => {
	console.log(err.stack)
	process.exit(1)
})