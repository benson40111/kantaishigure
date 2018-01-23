import { app, BrowserWindow, ipcMain } from 'electron'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
	global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
	global.__resources = require('path').join(__dirname, '..', '..', '..').replace(/\\/g, '\\\\')
}

const proxy = require('../lib/proxy.es').default
require('../lib/flash.es')
proxy.setMaxListeners(30)
global.proxy = proxy

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
	? 'http://localhost:9080'
	: `file://${__dirname}/index.html`

function createWindow () {
	/**
	 * Initial window options
	 */
	mainWindow = new BrowserWindow({
		height: 600,
		useContentSize: true,
		width: 800,
	})

	mainWindow.loadURL(winURL)

	mainWindow.on('closed', () => {
		mainWindow = null
	})
	global.mainWindow = mainWindow
	require('../lib/data-resolver.es')
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})

ipcMain.on('close-window', () =>{
	mainWindow.hide()
})

ipcMain.on('open-window', () =>{
	mainWindow.show()
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
*/
