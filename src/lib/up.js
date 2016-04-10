import path from 'path'

export let up = function (opts, args) {
	let {engine, shellInterative} = opts

	switch (engine) {
		case 'docker':
			return docker_deploy(opts, args)
			break
		case 'node':
		default:
			return node_deploy(opts, args)
			break
	}
}


export let node_deploy = function () {
	console.log(`npm start;`)
}


export let docker_deploy = function (opts = {}, args = {}) {
	let dm, dc, d
	let {docker = {}, shellInterative} = opts
	let {machine = 'default', 'node-start':nodeStart = false} = docker

	console.log(`docker-machine start ${machine};`)
	console.log(`eval $(docker-machine env ${machine});`)
	console.log(`docker-compose up -d;`)

	if (nodeStart) {
		console.log(`npm start;`)
	}
}


