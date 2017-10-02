<template>
	<div id="game">
		<webview src="about:blank()" ondrop="event.preventDefault();" plugins disablewebsecurity :preload="preload_js"></webview>
		<div>
            <button @click="capture" class="fa fa-camera-retro main-btn" aria-hidden="true"></button>
            <button @click="opendir" class="fa fa-folder-open-o main-btn" aria-hidden="true"></button>
			<button @click="toggleGameAudio" :class="volumeClass" aria-hidden="true"></button>
        </div>
	</div>
</template>


<script>
import fs from 'fs'
import path from 'path'
export default {
	name: 'game',
	computed: {
		preload_js() {
			return `file:${path.resolve(__static, 'js', 'webview-preload.js')}`
		},
		gameAudioMuted() {
			return this.$store.state.config.gameAudioMuted
		},
		volumeClass() {
			if(this.gameAudioMuted){
				return "fa fa-volume-off main-btn"
			} else {
				return "fa fa-volume-up main-btn"
			}
		}
	},
	methods: {
		capture() {
			document.querySelector('webview').capturePage( (img)=> {
				if(!img.isEmpty()){
					let jpgFile = img.toJPEG(90);
					let filename = ((new Date()).toISOString().replace(/:|\./g,'') + '.jpg')
					fs.writeFile(path.resolve(__resources, filename), jpgFile, (err) => {
						if(err) throw err
					})
				}
			})
		},
		opendir() {
			require('electron').shell.openExternal(`file://${path.resolve(__resources)}`,{}, (err) => {
				if(err) throw err
			})
		},
		toggleGameAudio() {
			document.querySelector('webview').setAudioMuted(!this.gameAudioMuted)
			this.$store.commit('UPDATE_GAMEAUDIOMUTED', !this.gameAudioMuted)
		}
	}
}
</script>