const state = {
    webviewWidth: 800,
    zoomLevel: 1
}

const mutations = {
    UPDATE_WIDTH(state, width){
        state.webviewWidth = width
    },
    UPDATE_ZOOMLEVEL(state, zoom){
        state.zoomLevel = zoom
    }
}

const actions = {
}

export default {
	state,
	mutations,
	actions
}
