import 'colors'

const stringify = (str) => {
	if (typeof str === 'string') {
		return str
	}
	if (str.toString().startsWith('[object ')) {
		str = JSON.stringify(str)
	} else {
		str = str.toString()
	}
	return str
}



export function log(str) {
	str = stringify(str)
	return console.log('[INFO] ' + str)
}

export function  warn(str) {
	str = stringify(str)
	return console.warn(('[WARN] ' + str).yellow)
}

export function error(str) {
	str = stringify(str)
	return console.error(('[ERROR] ' + str).bold.red)
}
