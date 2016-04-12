import {version as gVersion, help as gHelp} from 'utilapp'

export let help = function (pkg, verbose, opts) {
	console.log(gHelp(pkg, {
		options: {
			'--verbose, -V': 'Shows more information.',
			'--version, -v': 'Print NDeploy version.',
			'--help, -h': 'Show this messsage.',
		},
		arguments: {
			'ab': 'abbbb',
		}
	}))
}

export let version = function ( pkg, verbose, opts ) {
	console.log(gVersion(pkg))
}
