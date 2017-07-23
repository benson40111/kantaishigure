const { ipcRenderer } = require('electron')

const { proxy, mainWindow } = global

const handleResponse = (method,[domain,path,url], body, reqBody, time) => {
	if(path.startsWith('/kcsapi')){
		mainWindow.webContents.send('network.on.api',path,body)
	}
}

proxy.addListener('network.on.response', handleResponse)
