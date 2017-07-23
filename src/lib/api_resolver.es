import store from '../renderer/store/index.js'
import { ipcRenderer } from 'electron'
const compareUpdate = (prevState, newState) => {
	if (typeof prevState !== typeof newState){
		return newState
	}
	if (prevState === newState){
		return prevState
	}
	return newState
}

const material = ({ api_material }) => {
	store.commit('UPDATE_MATERIAL', api_material)
}
 

ipcRenderer.on('network.on.api', (event, path, body) => {
	let res
	body = JSON.parse(body)
	console.log(path,body)
	switch(path){
		case '/kcsapi/api_port/port':
			res = compareUpdate(store.state.api.resource, body.api_data)
			material(res)
			break
		case '/kcsapi/api_get_member/material':
			res = compareUpdate(store.state.api.resource, body.api_data)
			material(res)
			break
		case '/kcsapi/api_req_kousyou/destroyship':
			store.commit('UPDATE_FOUR_MATERIAL', body.api_data.api_material)	
			break
		case '/kcsapi/api_req_kousyou/destroyitem2':
			store.commit('PLUSE_MATERIAL', body.api_data.api_get_material)	
			break
	}
})
