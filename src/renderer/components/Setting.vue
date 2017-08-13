<template>
	<div class="flex-column setting">
		<div class="browser">
			<h3>{{ $t('Browser') }}</h3>
			<form action="#" @submit.prevent="onSubmit()">
				<input type="text" v-model="webviewURL"></input>
				<button type="submit">
					<i class="fa fa-chevron-left fa-lg" aria-hidden="true"></i>
				</button>
			</form>
		</div>
		<div class="gamesize">
			<h3>{{ $t('gamesize') }}</h3>
			<select class="custom-select" v-model="webviewWidth" @change="onChange(webviewWidth)">
  				<option value="400">50%</option>
  				<option value="800">100%</option>
  				<option value="1200">150%</option>
				<option value="1400">175%</option>
  				<option value="1600">200%</option>
			</select>
		</div>
		<div class="zoomLevel">
			<h3>zoomLevel</h3>
			<select class="custom-select" v-model="zoomLevel" @change="onChangeZoom(zoomLevel)">
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
  				<option value="en-US">English</option>
  				<option value="zh-TW">Chinese(traditional)</option>
			</select>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Setting',
	data() {
		return {
		webviewURL: null,
		webviewWidth: this.$store.state.config.webviewWidth,
		zoomLevel: this.$store.state.config.zoomLevel,
		language: this.$store.state.config.language
		}
	},
	methods: {
		onSubmit() {
			document.querySelector('webview').src = this.$data.webviewURL
		},
		onChange(width) {
			this.$store.commit('UPDATE_WIDTH', width)
		},
		onChangeZoom(zoom){
			this.$store.commit('UPDATE_ZOOMLEVEL', zoom)
		},
		onChangeLan(lan){
			this.$store.commit('UPDATE_LANGUAGE', lan)
			this.$http.get(`static/i18n/${lan}.json`)
				.then( (res) => this.$i18n.add(lan, res.data) )
				.catch( (err) => console.log(err) )
			this.$i18n.set(lan)
		}
	}
}
</script>

<style>
	.setting h3{
		color: aqua;
	}
	.setting {
		margin: 10px;
	}
</style>
