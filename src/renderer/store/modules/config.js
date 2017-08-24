const state = {
    webviewWidth: 800,
    zoomLevel: 1,
    language: 'en-US',
    gameAudioMuted: false
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
    },
    UPDATE_GAMEAUDIOMUTED(state, res){
        state.gameAudioMuted = res
    }        
}

const actions = {
}

export default {
	state,
	mutations,
	actions
}
