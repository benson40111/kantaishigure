const state = {
    webviewWidth: 800,
    zoomLevel: 1,
    language: 'en-US'
}

const mutations = {
    UPDATE_WIDTH(state, width){
        state.webviewWidth = width
    },
    UPDATE_ZOOMLEVEL(state, zoom){
        state.zoomLevel = zoom
    },
    UPDATE_LANGUAGE(state, lan){
        state.language = lan
    }
}

const actions = {
}

export default {
	state,
	mutations,
	actions
}
