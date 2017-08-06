import store from '../renderer/store/index.js'
import { ipcRenderer } from 'electron'

const resolve_fleet = (ship , { api_deck_port } , mst_ship) => {
	let fleets = []
	let arr_mst_ship = Object.values(mst_ship).map(x => x['api_sortno'])
	let arr_ship = Object.values(ship).map(x => x['api_id'])
	for(let x in api_deck_port){
		let fleet = []
		for(let i = 0; i < api_deck_port[x].api_ship.length; i++){
		let temp = arr_ship.indexOf(api_deck_port[x].api_ship[i])
		if(temp != -1){
			fleet.push(JSON.parse(JSON.stringify(ship[temp])))
			}
		}
		for(let i = 0; i < fleet.length; i++){
			let temp = arr_mst_ship.indexOf(fleet[i].api_sortno)
			if (temp != -1){
				Object.assign(fleet[i], mst_ship[temp], { fleet_name : api_deck_port[x].api_name })
			}
		}
		fleets.push(fleet)
	}
	store.commit('UPDATE_FLEET', fleets)
}

const resolve_port = (body) => {
	store.commit('UPDATE_MATERIAL', body.api_data.api_material)
	store.commit('UPDATE_INFO', body.api_data.api_basic)
	store.commit('UPDATE_SHIP', body.api_data.api_ship)
	store.commit('UPDATE_FLEET', body.api_data.api_deck_port)
}

const resolve_start = (body) => {
		store.commit('STORE_MST_SHIP', body.api_data.api_mst_ship)
		store.commit('STORE_MST_MISSION', body.api_data.api_mst_mission)
		store.commit('STORE_MST_MAPINFO', body.api_data.api_mst_mapinfo)
		store.commit('STORE_MST_SLOTITEM', body.api_data.api_mst_slotitem)
		store.commit('STORE_MST_SLOTITEM_EQUIPTYPE', body.api_data.api_mst_slotitem_equiptype)
}

ipcRenderer.on('network.on.api', (event, path, body, reqBody) => {
	let res
	body = JSON.parse(body)
	reqBody = JSON.parse(reqBody)
	delete reqBody.api_token
	console.log(path, body, reqBody)
	switch(path){
		case '/kcsapi/api_port/port':
			resolve_port(body)
			resolve_fleet(store.state.api.ship, body.api_data, store.state.api.mst_ship)
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
		case '/kcsapi/api_start2':
			resolve_start(body)
			break
	}
})
