const state = {
	resource: {},
	basic: {},
	ship: {},
	fleet: {},
	mession: {},
	mst_ship: {},
	mst_mission: {},
	mst_slotitem: {},
	mst_slotitemtype: {}
}

const mutations = {
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

export default {
	state,
	mutations,
	actions
}
