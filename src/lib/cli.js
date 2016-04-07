import minimist from 'minimist'
import pkg from '../package.json'
import {help as Help, version as Version} from './util'


Promise
.resolve(minimist(process.argv.splice(2), {
	'boolean': [
		'version',
		'verbose',
	],
	'alias': {
		'version': 'v',
		'verbose': 'V',
		'help': 'h'
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
	...opts,
}) => {
	let action, verbose

	if (showVerbose) verbose = true

	if (showHelp) action = 'help'
	else if (showVersion) action = 'version'
	else if (args.length == 0) action = 'help'
	else action = args.shift()

	return {action, args, opts: {...opts}, verbose}
})
.then(({action, verbose}) => {
	switch (action) {
		case 'version':
			Version(pkg, verbose)
			break
		case 'help':
		default:
			Help(pkg)
			break
	}
})
