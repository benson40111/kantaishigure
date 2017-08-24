const state = {
    webviewWidth: 800,
    zoomLevel: 1,
    language: 'en-US',
    gameAudioMuted: false,
    webviewURL: "http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/"
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
    },
    UPDATE_WEBVIEWURL(state, res){
        state.webviewURL = res
    }
}

const actions = {
}

export default {
	state,
	mutations,
	actions
}
