<template>
	<div class="flex-column setting">
		<div class="browser">
			<h3>{{ $t('Browser') }}</h3>
			<div class="input-group">
				<input type="url" v-model="webviewURL" @keyup.enter="onSearch" style="width:100%">
				<span class="input-group-btn">
					<button type="submit" class="btn btn-outline-primary" @click="onSearch">			
						<i class="fa fa-search fa-lg"></i>
					</button>
				</span>
			</div>
		</div>
		<div class="segment" style="display:flex">
			<div style="flex:1">
				<h3>{{ $t('flashsize') }}</h3>
				<select class="custom-select" v-model.number="webviewWidth">
					<option value="400">50%</option>
					<option value="800">100%</option>
					<option value="1200">150%</option>
					<option value="1400">175%</option>
					<option value="1600">200%</option>
				</select>
			</div>
			<div style="flex:1">
				<h3>zoomLevel</h3>
				<select class="custom-select" v-model.number="zoomLevel">
					<option value="0.5">50%</option>
					<option value="1">100%</option>
					<option value="1.5">150%</option>
					<option value="1.75">175%</option>
					<option value="2">200%</option>
				</select>
			</div>
		</div>
		<div class="segment">
			<h3>{{ $t('Language') }}</h3>
			<select class="custom-select" v-model="language" @change="onChangeLan(language)">
				<option value="en-US">{{$t('English')}}</option>
				<option value="zh-TW">{{$t('Chinese(traditional)')}}</option>
			</select>
		</div>
		<div class="segment">
			<h3>{{$t('clear_localStorage')}}</h3>
			<button class="btn btn-primary" @click="clearLocalStorage">{{$t('ClearLocalStore')}}</button>
			<button v-tooltip.right="'important clear cookies will let your setting clear'" class="btn btn-primary" @click="clearCookies">{{$t('ClearCookies')}}</button>
		</div>

		<div class="segment">
			<h3>{{$t('OpenDevTool')}}</h3>
			<button class="btn btn-primary" @click="toggleDevTools">{{$t('Toggle')}}</button>
		</div>
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
		}
	}
}
</script>
