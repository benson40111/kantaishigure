<template>
	<div>
		<form action="#" @submit.prevent="onSubmit()">
			<input type="text" v-model="webviewURL"></input>
			<button type="submit">
				<i class="fa fa-chevron-left fa-lg" aria-hidden="true"></i>
			</button>
		</form>
		{{ $t('gamesize') }}
		<select class="custom-select" v-model="webviewWidth" :change="onChange(webviewWidth)">
  			<option value="400">50%</option>
  			<option value="800">100%</option>
  			<option value="1200">150%</option>
			<option value="1400">175%</option>
  			<option value="1600">200%</option>
		</select>
		zoomLevel
		<select class="custom-select" v-model="zoomLevel" :change="onChangeZoom(zoomLevel)">
  			<option value="0.5">50%</option>
  			<option value="1">100%</option>
  			<option value="1.5">150%</option>
			<option value="1.75">175%</option>
  			<option value="2">200%</option>
		</select>

	</div>
</template>

<script>
export default {
	name: 'Setting',
	data() {
		return {
		webviewURL: null,
		webviewWidth: this.$store.state.config.webviewWidth,
		zoomLevel: this.$store.state.config.zoomLevel
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
		}
	}
}
</script>
