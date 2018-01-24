const Tray = require('electron').Tray
const ipcRenderer = require('electron').ipcRenderer

let clickBool = true

const createTray = () => {
	let tray = new Tray('logo.png')
	
	tray.on('right-click', () =>{
		if (clickBool) {
			clickBool = false
			ipcRenderer.send('open-window')
		}
		else {
			clickBool = true
			ipcRenderer.send('close-window')
		}
	})
}


exports.createTray = createTray
