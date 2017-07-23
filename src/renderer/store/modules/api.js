const state = {
	resource: {}
}

const mutations = {
	UPDATE_MATERIAL(state, res){
		state.resource = res
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
	}
}

const actions = {
}

export default {
	state,
	mutations,
	actions
}
