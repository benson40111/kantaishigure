<template>
	<div class="flex-column setting">
			<div class="browser">
				<h3>{{ $t('Browser') }}</h3>
				<input type="url" v-model="webviewURL" @keyup.enter="onSearch">
				<button type="submit" class="btn btn-outline-primary" @click="onSearch">
						<i class="fa fa-search fa-lg"></i>
				</button>
				<button type="submit" class="btn btn-outline-primary" @click="onRefresh">
					<i class="fa fa-refresh fa-lg" aria-hidden="true"></i>
				</button>
			</div>
			<div class="flashsize">
				<h3>{{ $t('flashsize') }}</h3>
				<select class="custom-select" v-model.number="webviewWidth">
  					<option value="400">50%</option>
  					<option value="800">100%</option>
  					<option value="1200">150%</option>
					<option value="1400">175%</option>
  					<option value="1600">200%</option>
				</select>
			</div>
			<div class="zoomLevel">
				<h3>zoomLevel</h3>
				<select class="custom-select" v-model.number="zoomLevel">
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
			<div class="devTool">
				<h3>{{$t('OpenDevTool')}}</h3>
					<button class="btn btn-primary" @click="toggleDevTools">{{$t('Toggle')}}</button>
			</div>
			<div class="game-AudioMuted">
				<h3>{{ $t('Game_Audio_Muted')}}</h3>
					<button type="checkbox" class="btn btn-primary" @click="toggleGameAudio">{{ gameAudioMuted ? $t('Unmuted') : $t('Muted') }}</button>
			</div>
	</div>
</template>

<script>
export default {
	name: 'Setting',
	data() {
		return {
		webviewURL: this.$store.state.config.webviewURL,
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
		onSearch() {
			document.querySelector('webview').loadURL(this.$data.webviewURL)
		},
		onRefresh() {
			document.querySelector('webview').reload()
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