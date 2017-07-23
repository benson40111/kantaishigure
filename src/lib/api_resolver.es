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

const resolve_port = (body) => {
	let res
	res = compareUpdate(store.state.api.resource, body.api_data.api_material)
	store.commit('UPDATE_MATERIAL', res)

	res = compareUpdate(store.state.api.basic, body.api_data.api_basic)
	store.commit('UPDATE_INFO', res)

	res = compareUpdate(store.state.api.ship, body.api_data.api_ship)
	store.commit('UPDATE_SHIP', res)

	res = compareUpdate(store.state.api.fleet, body.api_data.api_deck_port)
	store.commit('UPDATE_FLEET', res)
}

ipcRenderer.on('network.on.api', (event, path, body) => {
	let res
	body = JSON.parse(body)
	console.log(path,body)
	switch(path){
		case '/kcsapi/api_port/port':
			resolve_port(body)
			break
		case '/kcsapi/api_get_member/material':
			res = compareUpdate(store.state.api.resource, body.api_data)
			store.commit('UPDATE_MATERIAL', res)
			break
		case '/kcsapi/api_req_kousyou/destroyship':
			store.commit('UPDATE_FOUR_MATERIAL', body.api_data.api_material)	
			break
		case '/kcsapi/api_req_kousyou/destroyitem2':
			store.commit('PLUSE_MATERIAL', body.api_data.api_get_material)	
			break
		case '/kcsapi/api_req_kousyou/createitem':
			store.commit('UPDATE_ALL_MATERIAL', body.api_data.api_material)	
			break
	}
})
