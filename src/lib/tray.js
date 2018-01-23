const { Tray, Menu } = require('electron').remote
const ipcRenderer = require('electron').ipcRenderer

let clickBool = false

const createTray = () => {
	let tray = new Tray('logo.png')
	const trayTemplate = [
		{ label: 'Exit', click(){ tray.destroy() }}
	]
	let trayMenu = new Menu.buildFromTemplate(trayTemplate)
	tray.setContextMenu(trayMenu)
	
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
