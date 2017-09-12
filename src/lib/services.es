import { remote } from 'electron'
import store from '../renderer/store/index.js'


remote.getCurrentWebContents().on('dom-ready', () => {
	document.querySelector('webview').addEventListener('dom-ready', (e) => {
		document.querySelector('webview').executeJavaScript(`
					document.cookie = "cklg=welcome;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/";
					document.cookie = "cklg=welcome;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame/";
					document.cookie = "cklg=welcome;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame_s/";
					document.cookie = "ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=osapi.dmm.com;path=/";
					document.cookie = "ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=203.104.209.7;path=/";
					document.cookie = "ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=www.dmm.com;path=/netgame/";
					document.cookie = "ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=log-netgame.dmm.com;path=/";
					document.cookie = "ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/";
					document.cookie = "ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame/";
					document.cookie = "ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame_s/";
				  `)
		document.querySelector('webview').executeJavaScript('DMM.netgame.reloadDialog=function(){}')
		document.querySelector('webview').setAudioMuted(store.state.config.gameAudioMuted)
	})
	document.querySelector('webview').loadURL(store.state.config.webviewURL)
})

const clearQuest = () => {
	let japanDate = new Date((new Date((new Date()).getTime() + (new Date().getTimezoneOffset())*60000 + 540 * 60000)).setHours(4,0,0))
	if(japanDate < (new Date())){
		japanDate = new Date(japanDate.setDate(japanDate.getDate()+1))
	}
	window.setTimeout( () => {
		store.commit('UPDATE_QUEST_DAY', japanDate.getTime())
		window.setInterval(() => {
			japanDate = (new Date((new Date()).getTime() + (new Date().getTimezoneOffset())*60000 + 540 * 60000)).setHours(4,0,0)
			store.commit('UPDATE_QUEST_DAY', japanDate)
		}, 86400000)
	} , japanDate.getTime() - (new Date().getTime()))
}

clearQuest()
