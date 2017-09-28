<template>
	<div id="game">
		<webview src="about:blank()" ondrop="event.preventDefault();" plugins disablewebsecurity :preload="preload_js"></webview>
		<div>
            <button @click="capture" class="fa fa-camera-retro" aria-hidden="true" style="background:transparent;color:aqua"></button>
            <button @click="opendir" class="fa fa-folder-open-o" aria-hidden="true" style="background:transparent;color:aqua"></button>
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
		}
	}
}
</script>