import minimist from 'minimist'
import pkg from '../package.json'
import fs from 'fs'
import path from 'path'
import {help as Help, version as Version} from './util'
import {up} from './up'
import {install} from './install'

let originArgs

Promise
.resolve(minimist(originArgs = process.argv.splice(2), {
	'boolean': [
		'version',
		'verbose',
		'shell-interative',
	],
	'alias': {
		'version': 'v',
		'verbose': 'V',
		'help': 'h',
		'shell-interative': 's',
	},
}))
.then(({
	_: args,
	version: showVersion,
	v: _showVersion,
	verbose: showVerbose,
	V: _showVerbose,
	help: showHelp,
	h: _showHelp,
	'shell-interative': shellInterative,
	s: _shellInterative,
	...opts,
}) => {
	let action, verbose

	if (showVerbose) verbose = true

	if (showHelp) action = 'help'
	else if (showVersion) action = 'version'
	else if (args.length == 0) action = 'help'
	else action = args.shift()

	return {action, args, opts: {...opts, verbose, shellInterative}, verbose}
})
// Load local package.json
.then(({action, verbose, opts, args}) => {
	return new Promise (function (resolve, reject) {
		let pathLocalPackage
		fs.stat(pathLocalPackage = path.normalize(process.cwd() + '/package.json'), function (err, stat) {
			if (err && err.code && err.code === 'ENOENT') resolve({})
			else if (err) reject(err)
			else
				try { resolve(require(pathLocalPackage)) } 
				catch (err) { reject(err) }
		})
	})
	.catch(SyntaxError, function (err) {
		return {}
	})
	// find local parameters
	.then(({ndeploy = {}}) => {
		return ndeploy
	})
	.then(localOpts => {
		return {action, verbose, opts: {...localOpts, ...opts}, args}
	})
})
// run action
.then(({action, verbose, opts, args}) => {
	let {shellInterative} = opts
	switch (action) {
		case 'up':  
			if (shellInterative !== true) {
				console.log(`WARN: Use 'ndeploy install' to install auto eval script.`)
			}
			break
		default:
			if (shellInterative === true) {
				console.log(`ndeploy ${originArgs.filter(e => e !== '-s').join(' ')}`)
				process.exit(0)
			}
	}

	switch (action) {
		case 'version':
			return Version(pkg, verbose, opts)
			break
		case 'up':
			return up(opts, args)
			break
		case 'install':
			return install(opts, args)
			break
		case 'help':
		default:
			return Help(pkg, verbose, opts)
			break
	}
})
.catch( err => {
	console.log(err.stack)
	process.exit(1)
})

