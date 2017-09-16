const { proxy, mainWindow } = global

// send response to renderer
const handleResponse = (method,[domain,path,url], body, reqBody, time) => {
	if(path.startsWith('/kcsapi')){
		mainWindow.webContents.send('network.on.api',path, body, reqBody)
	}
}

proxy.addListener('network.on.response', handleResponse)
