import {version as gVersion, help as gHelp} from 'utilapp'

export let help = function (pkg, verbose, opts) {
	console.log(gHelp(pkg, {
		options: {
			'--verbose, -V': 'Shows more information.',
			'--version, -v': 'Print NDeploy version.',
			'--help, -h': 'Show this messsage.',
		},
		arguments: {
			'up': 'Prepares and raises the application.',
			'install': 'Displays a message such as installing bash NDeploy.',
		}
	}))
}

export let version = function ( pkg, verbose, opts ) {
	console.log(gVersion(pkg))
}
