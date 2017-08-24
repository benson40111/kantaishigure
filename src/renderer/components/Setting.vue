<template>
	<div class="flex-content">
		<div class="flex-column setting setting-left">
			<div class="browser">
				<h3>{{ $t('Browser') }}</h3>
				<form action="#" @submit.prevent="onSubmit()">
					<input type="text" v-model="webviewURL"></input>
					<button type="submit">
						<i class="fa fa-chevron-left fa-lg" aria-hidden="true"></i>
					</button>
				</form>
			</div>
			<div class="flashsize">
				<h3>{{ $t('flashsize') }}</h3>
				<select class="custom-select" v-model="webviewWidth">
  					<option value="400">50%</option>
  					<option value="800">100%</option>
  					<option value="1200">150%</option>
					<option value="1400">175%</option>
  					<option value="1600">200%</option>
				</select>
			</div>
			<div class="zoomLevel">
				<h3>zoomLevel</h3>
				<select class="custom-select" v-model="zoomLevel">
  					<option value="0.5">50%</option>
  					<option value="1">100%</option>
  					<option value="1.5">150%</option>
					<option value="1.75">175%</option>
  					<option value="2">200%</option>
				</select>
			</div>
			<div class="language">
				<h3>{{ $t('Language') }}</h3>
				<select class="custom-select" v-model="language" @change="onChangeLan(language)">
  					<option value="en-US">{{$t('English')}}</option>
  					<option value="zh-TW">{{$t('Chinese(traditional)')}}</option>
				</select>
			</div>
			<div class="localStorage">
				<h3>{{$t('clear_localStorage')}}</h3>
				<button class="btn btn-primary" @click="clearLocalStorage">{{$t('ClearLocalStore')}}</button>
				<button class="btn btn-primary" @click="clearCookies">{{$t('ClearCookies')}}</button>
			</div>
		</div>
		<div class="flex-column setting setting-right">
			<div class="setting">
				<h3>{{$t('OpenDevTool')}}</h3>
					<button class="btn btn-primary" @click="toggleDevTools">{{$t('Toggle')}}</button>
			</div>
			<div class="game-AudioMuted setting">
				<h3>{{ $t('Game_Audio_Muted')}}</h3>
					<button type="checkbox" class="btn btn-primary" @click="toggleGameAudio">{{ gameAudioMuted ? $t('Unmuted') : $t('Muted') }}</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Setting',
	data() {
		return {
		webviewURL: null,
		language: this.$store.state.config.language
		}
	},
	computed: {
		webviewWidth: {
			get() { return this.$store.state.config.webviewWidth },
			set(value) { this.$store.commit('UPDATE_WIDTH', value) }
		},
		zoomLevel: {
			get() { return this.$store.state.config.zoomLevel },
			set(value) { this.$store.commit('UPDATE_ZOOMLEVEL', value) }
		},
		gameAudioMuted() {
			return this.$store.state.config.gameAudioMuted
		}
	},
	methods: {
		onSubmit() {
			document.querySelector('webview').src = this.$data.webviewURL
		},
		onChangeLan(lan){
			this.$store.commit('UPDATE_LANGUAGE', lan)
			this.$http.get(`static/i18n/${lan}.json`)
				.then( (res) => this.$i18n.add(lan, res.data) )
				.catch( (err) => console.log(err) )
			this.$i18n.set(lan)
		},
		clearLocalStorage(){
			window.localStorage.clear()
		},
		clearCookies() {
			require('electron').remote.getCurrentWebContents().session.clearStorageData([], () => console.log('clearCookies'))
		},
		toggleDevTools() {
			require('electron').remote.getCurrentWindow().toggleDevTools();
		},
		toggleGameAudio() {
			document.querySelector('webview').setAudioMuted(!this.gameAudioMuted)
			this.$store.commit('UPDATE_GAMEAUDIOMUTED', !this.gameAudioMuted)
		}
	}
}
</script>