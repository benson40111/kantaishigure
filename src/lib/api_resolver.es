/* global robot */
import store from '../renderer/store/index.js'
import sortie from './sortie.js'
import { ipcRenderer } from 'electron'

const resolve_fleet = ( api_deck_port ) => {
	let fleets = api_deck_port.map( fleet => {
	return {
		"fleet_name": fleet.api_name,
		"fleet": fleet.api_ship
	}})
	store.commit('UPDATE_FLEET', fleets)
}

const resolve_ship = ( { api_ship } , { api_deck_port } , mst_ship) => {
	let ships = api_ship.map(ship => Object.assign({}, mst_ship.find(mst => mst.api_sortno == ship.api_sortno), ship))
	store.commit('UPDATE_SHIP', ships)
	resolve_fleet(api_deck_port)
}

const resolve_mission = ( deck ) => {
	let mission = []
	for(let i = 1 ; i < 4 ; i++){
		if(deck[i] != undefined){
			mission.push(deck[i].api_mission)
		} else{
			mission.push(undefined)
		}
	}
	store.commit('UPDATE_MISSION', mission)
}

const resolve_port = (body) => {
	store.commit('UPDATE_MATERIAL', body.api_data.api_material)
	store.commit('UPDATE_INFO', body.api_data.api_basic)
	store.commit('UPDATE_NDOCK', body.api_data.api_ndock)
}

const resolve_slot = ( { api_data } , mst_slot) => {
	let slot = api_data.map( slotitem => Object.assign({}, mst_slot.find( mst => mst.api_id == slotitem.api_slotitem_id), slotitem) )
	store.commit('UPDATE_SLOTITEM', slot)
}

const resolve_start = (body) => {
		store.commit('STORE_MST_SHIP', body.api_data.api_mst_ship)
		store.commit('STORE_MST_STYPE', body.api_data.api_mst_stype)
		store.commit('STORE_MST_MISSION', body.api_data.api_mst_mission)
		store.commit('STORE_MST_MAPINFO', body.api_data.api_mst_mapinfo)
		store.commit('STORE_MST_SLOTITEM', body.api_data.api_mst_slotitem)
		store.commit('STORE_MST_SLOTITEM_EQUIPTYPE', body.api_data.api_mst_slotitem_equiptype)
}


ipcRenderer.on('network.on.api', (event, path, body, reqBody) => {
	body = JSON.parse(body)
	reqBody = JSON.parse(reqBody)
	delete reqBody.api_token
	if(process.env.NODE_ENV == 'development'){
		console.log(path, body, reqBody)
	}
	switch(path){
		case '/kcsapi/api_port/port':
			document.querySelector('#home').click()
			resolve_port(body)
			resolve_ship(body.api_data, body.api_data, store.state.api.mst_ship)
			resolve_mission(body.api_data.api_deck_port)
			sortie.next()
			robot.emit('network.on.port')
			break
		case '/kcsapi/api_get_member/slot_item':
			resolve_slot(body, store.state.api.mst_slotitem)
			break
		case '/kcsapi/api_get_member/preset_deck':
			robot.emit('network.on.preset_deck')
			document.querySelector('#fleets').click()
			break
		case '/kcsapi/api_req_hensei/preset_select':
			robot.emit('network.on.preset_select')
			break
		case '/kcsapi/api_get_member/material':
			store.commit('UPDATE_MATERIAL', body.api_data)
			break
		case '/kcsapi/api_req_kousyou/destroyship':
			store.commit('UPDATE_FOUR_MATERIAL', body.api_data.api_material)	
			break
		case '/kcsapi/api_req_mission/result':
			robot.emit('network.on.missionReturn')
			store.commit('PLUSE_MATERIAL', body.api_data.api_get_material)	
			break			
		case '/kcsapi/api_req_kousyou/destroyitem2':
			store.commit('PLUSE_MATERIAL', body.api_data.api_get_material)	
			break
		case '/kcsapi/api_req_kousyou/createitem':
			store.commit('UPDATE_ALL_MATERIAL', body.api_data.api_material)	
			break
		case '/kcsapi/api_get_member/deck':
			resolve_mission(body.api_data)
			break
		case '/kcsapi/api_get_member/ndock':
			store.commit('UPDATE_NDOCK', body.api_data)
			robot.emit('network.on.ndock')
			break
		case '/kcsapi/api_req_nyukyo/start':
		    robot.emit('network.on.dockStart')
			break
		case '/kcsapi/api_req_kousyou/getship':
			store.commit('UPDATE_KDOCK', body.api_data.api_kdock)
			break
		case '/kcsapi/api_get_member/kdock':
			store.commit('UPDATE_KDOCK', body.api_data)
			break
		case '/kcsapi/api_req_hokyu/charge':
			store.commit('UPDATE_FOUR_MATERIAL', body.api_data.api_material)
			store.commit('UPDATE_SHIP_ARRAY', body.api_data.api_ship)
			robot.emit('network.on.charge')
			break
		case '/kcsapi/api_get_member/ship3':
			store.commit('UPDATE_SHIP_ARRAY', body.api_data.api_ship_data)
			break
		case '/kcsapi/api_req_mission/start':
			robot.emit('network.on.missionStart', body.api_data.api_complatetime, Number(reqBody.api_deck_id)-2)
			break
		case '/kcsapi/api_get_member/mission':
			robot.emit('network.on.mission')
			break
		case '/kcsapi/api_req_quest/start':
			store.commit('UPDATE_QUEST_START',reqBody.api_quest_id)
			break
		case '/kcsapi/api_get_member/questlist':
			if(body.api_data.api_list != null) store.commit('UPDATE_QUEST', { res: body.api_data.api_list, count:body.api_data.api_exec_count})
			break
		case '/kcsapi/api_req_quest/clearitemget':
			store.commit('UPDATE_QUEST_CLEAR', Number(reqBody.api_quest_id))
			break
		case '/kcsapi/api_req_quest/stop':
			store.commit('UPDATE_QUEST_CANCEL', Number(reqBody.api_quest_id))
			break
		case '/kcsapi/api_req_practice/battle':
			document.querySelector('#prophet').click()
		case '/kcsapi/api_req_sortie/battle':
			sortie.battle(body)
			robot.emit('network.on.sortieBattle')
			break
		case '/kcsapi/api_req_battle_midnight/battle':
		case '/kcsapi/api_req_practice/midnight_battle':
			sortie.midnight(body)
			robot.emit('network.on.sortieMidnight')
			break
		case '/kcsapi/api_req_map/start':
			document.querySelector('#prophet').click()
			robot.emit('network.on.sortieStart')
			break
		case '/kcsapi/api_req_map/next':
			document.querySelector('#prophet').click()
			sortie.next()
			robot.emit('network.on.sortieNext')
			break
		case '/kcsapi/api_req_sortie/battleresult':
			sortie.result(body)
			robot.emit('network.on.sortieResult')
			break
		case '/kcsapi/api_get_member/mapinfo':
			robot.emit('network.on.mapinfo')
			break
		case '/kcsapi/api_get_member/ship_deck':
			store.commit('UPDATE_SHIP_ARRAY', body.api_data.api_ship_data)
			break
		case '/kcsapi/api_req_hensei/change':
		    store.commit('UPDATE_FLEET_CHANGE', reqBody)
			sortie.next()
			robot.emit('network.on.change')
			break
		case '/kcsapi/api_start2':
			resolve_start(body)
			robot.emit('network.on.start')
			break
	}
})
