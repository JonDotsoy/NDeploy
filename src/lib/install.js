
export let install = function (opts, args) {
	let {shellInterative} = opts
	let [shell] = args

	let cmdToInstall

	switch (shell) {
		case 'bash':
		default:
			cmdToInstall =
`# Node Deploy
function nd () { eval $(ndeploy -s $*); }`
			break
	}

	// if (shellInterative)
	// console.log(cmdToInstall)
	console.log(`Copy next script in \`.bashrc\`:

\`\`\`
${cmdToInstall}
\`\`\``)
}
