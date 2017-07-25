<template>
	<div id="game">
		<webview src="about:blank()" ondrop="event.preventDefault();" plugins disablewebsecurity :preload="preload_js"></webview>
	</div>
</template>


<script>
export default {
	name: 'game',
	computed: {
		preload_js() {
			return `file:${require('path').resolve(__dirname, '../assets/js/webview-preload.js')}`
		}
	}
}
</script>


<style>
</style>