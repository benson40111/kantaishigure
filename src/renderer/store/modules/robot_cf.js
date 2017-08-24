const state = {
    Expedition: [ [false,0] , [false,0], [false,0]],
    Sortie: false,
    Delayms: 2000, // ms
    isEnabled: false,
    sleepTime: { 
        'HH': '00',
        'mm': '00',
        'ss': '00'
    },
    sleepEnd: { 
        'HH': '06',
        'mm': '00',
        'ss': '00'
    },
    EnseiDelayMax: 2, // minutes
    EnseiDelayMin: 1 // mintes
}

const mutations = {
    UPDATE_EXPEDITION(state, res){
        state.Expedition = res
    },
    UPDATE_SORTIE(state, res){
        state.Sortie = res
    },
    UPDATE_DELAYMS(state, res){
        state.Delayms = res
    },
    UPDATE_SLEEPEND(state, res){
        state.sleepEnd = res
    },
    UPDATE_SLEEPTIME(state, res){
        state.sleepTime = res
    },
    UPDATE_ISENABLED(state, res){
        state.isEnabled = res
    },
    UPDATE_ENSEIDELAYMAX(state, res){
        state.EnseiDelayMax = res
    },
    UPDATE_ENSEIDELAYMIN(state, res){
        state.EnseiDelayMin = res
    }
}

const actions = {
}

export default {
	state,
	mutations,
	actions
}
