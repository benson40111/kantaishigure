<template>
	<div id="game" style="height:auto;margin-top:120px;">
		<webview id="main" src="about:blank()" ondrop="event.preventDefault();" plugins disablewebsecurity :preload="preload_js"></webview>
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
	webview {
		width: 100%;
		height: 480px;
	}
</style>
