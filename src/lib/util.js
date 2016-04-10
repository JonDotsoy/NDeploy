
export let help = function ( {version, name, title, gitHead}, verbose, opts) {
	let {shellInterative} = opts

	let template =
`
Usage: ${name} {OPTIONS} [action]
Version: ${getVersionStr(true, {version, title, gitHead}, verbose)}

Options:

    --verbose, -V    Shows more information.
    --version, -v    Print NDeploy version. 
    --help, -h       Show this messsage.

Actions:
`
	console.log(template)
}

export let getVersionStr = function (short, {version, gitHead, title} , verbose) {
	if (short) {
		return `${version}${gitHead?` (${gitHead})`:''}`
	} else {
		return `${title} v${getVersionStr(true, {version, gitHead, title}, verbose)}`
	}
}

export let version = function ( pkg, verbose, opts ) {
	console.log(getVersionStr(false, pkg, verbose))
}


