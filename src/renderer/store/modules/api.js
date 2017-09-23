const state = {
	resource: [],
	basic: [],
	ship: [],
	fleet: [],
	mission: [],
	ndock: [],
	kdock: [undefined,undefined,undefined,undefined],
	slotitem: [],
	quest: [],
	mst_ship: [],
	mst_stype: [],
	mst_mission: [],
	mst_slotitem: [],
	mst_slotitemtype: [],
	battleresult: {}
}

const mutations = {
	UPDATE_BATTLE(state,res){
		state.battleresult = res
	},
	UPDATE_FLEET_CHANGE(state, {api_id, api_ship_id, api_ship_idx}){
		api_ship_id = Number(api_ship_id)
		api_ship_idx = Number(api_ship_idx)
		let fleet = state.fleet[Number(api_id)-1].fleet
		if(api_ship_id == -1){
			fleet[api_ship_idx] = -1
			state.fleet[Number(api_id)-1].fleet = fleet.filter(x => x != -1)
			while(fleet.length <6) {
				fleet.push(-1)
			}
		} else if(api_ship_id == -2){
			for(let i = 1 ; i < fleet.length; i++){
				fleet[i] = -1
			}
		} else {
			let i = fleet.indexOf(api_ship_id)
			if(i != -1){
				let temp = fleet[api_ship_idx]
				fleet[api_ship_idx] = api_ship_id
				fleet[i] = temp
			} else {
				fleet[api_ship_idx] = api_ship_id
			}
		}
		state.fleet = state.fleet.map(x => x)
	},
	UPDATE_BATTLERESULT(state,res){
		state.battleresult = Object.assign({},state.battleresult,res)
	},
	UPDATE_QUEST(state, { res, count }) {
		let sort = false
		let x
		if(state.quest.filter(x => x.api_state ==2).length != count){
			state.quest = []
		}
		res.map( quest => {
			if( (x = state.quest.findIndex(x => x.api_no == quest.api_no)) != -1 ){
				Object.assign(state.quest[x], quest)
			} else {
				state.quest.push(quest)
				sort = true
			}
		})
		if(sort){
			state.quest.sort( (x,y) => x.api_no - y.api_no)
		}
	},
	UPDATE_QUEST_START(state, id){
		let x = state.quest.findIndex(quest => quest.api_no == id)
		if( x != -1) state.quest[x].api_state = 2
	},
	UPDATE_QUEST_CANCEL(state, id){
		let x = state.quest.findIndex(quest => quest.api_no == id)
		if( x != -1) state.quest[x].api_state = 1		
	},
	UPDATE_QUEST_CLEAR(state, id){
		let x = state.quest.findIndex(quest => quest.api_no == id)
		if( x != -1 && state.quest[x].api_type == 4){
			state.quest.splice(x,1)
		} else if( x != 1) state.quest[x].api_state = 0
	},
	UPDATE_QUEST_DAY(state,time){
		for(let i = 0; i < state.quest.length ; i++){
			if(state.quest[i].api_type == 1){
				state.quest[i].api_state = 1	
			} else if(new Date(time).getDay() == 1 && state.quest[i].qpi_type == 2 ){
				state.quest[i].api_state = 1				
			} else if(new Date(time).getDate() == 1 && state.quest[i].qpi_type == 3 ){
				state.quest[i].api_state = 1
			}
		}
	},
	UPDATE_SHIP_ARRAY(state, res){
		res.map( x => Object.assign(state.ship.find( ship => ship.api_id == x.api_id ), x))
	},
	UPDATE_SLOTITEM(state, res){
		state.slotitem = res
	},
	UPDATE_NDOCK(state, res){
		state.ndock = res
	},
	UPDATE_KDOCK(state, res){
		state.kdock = res
	},
	UPDATE_MISSION(state, res){
		state.mission = res
	},
	UPDATE_FLEET(state, res){
		state.fleet = res
	},
	UPDATE_SHIP(state, res){
		state.ship = res
	},
	UPDATE_MATERIAL(state, res){
		state.resource = res
	},
	UPDATE_ALL_MATERIAL(state, res){
		state.resource[0].api_value = res[0]
		state.resource[1].api_value = res[1]
		state.resource[2].api_value = res[2]
		state.resource[3].api_value = res[3]
		state.resource[4].api_value = res[4]
		state.resource[5].api_value = res[5]
		state.resource[6].api_value = res[6]
		state.resource[7].api_value = res[7]
	},
	UPDATE_FOUR_MATERIAL(state, res){
		state.resource[0].api_value = res[0]
		state.resource[1].api_value = res[1]
		state.resource[2].api_value = res[2]
		state.resource[3].api_value = res[3]
	},
	PLUSE_MATERIAL(state, res){
		state.resource[0].api_value += res[0]
		state.resource[1].api_value += res[1]
		state.resource[2].api_value += res[2]
		state.resource[3].api_value += res[3]
	},
	UPDATE_INFO(state, res){
		state.basic = res
	},
	STORE_MST_SHIP(state, res){
		state.mst_ship = res
	},
	STORE_MST_STYPE(state, res){
		state.mst_stype = res
	},
	STORE_MST_MISSION(state, res){
		state.mst_mission = res
	},
	STORE_MST_MAPINFO(state, res){
		state.mst_mapinfo = res
	},
	STORE_MST_SLOTITEM(state, res){
		state.mst_slotitem = res
	},
	STORE_MST_SLOTITEM_EQUIPTYPE(state, res){
		state.mst_slotitemtype = res
	}
}

const actions = {
}

const getters = {
	find_mst_ship: (state) => (id) => {
		return state.mst_ship.find(ship => ship.api_id == id)
	},
	find_ship: (state) => (id) => {
		return state.ship.find(ship => ship.api_id == id)
	},
	find_slot: (state) => (id) => {
		return state.slotitem.find(ship => ship.api_id == id)
	},
	getFleet: (state, getters) => (id) => {
		return state.fleet[id].fleet.map( id => (id != -1 && id != undefined) ? getters.find_ship(id) : undefined)
	},
	getAllFleet: (state, getters) => () => {
		return state.fleet.map( (x,i) => {
			return {
				'fleet_name': x.fleet_name,
				'fleet': getters.getFleet(i)
			}
		})
	},
	needSupply: (state, getters) => (id) => {
		return getters.getFleet(id).filter(x => x !=undefined).find(x => x.api_buil != x.api_buil_max || x.api_fuel != x.api_fuel_max) != undefined
	},
	needSupplys: (state, getters) => () =>  {
		return getters.getAllFleet().map( x => x.fleet).map( fleet => fleet.filter( x => x != undefined).find(x => x.api_buil != x.api_buil_max || x.api_fuel != x.api_fuel_max) != undefined)
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}
