<template>
	<div id="game" style="height:auto;width:70%;float:left">
		<webview id="main" src="about:blank()" ondrop="event.preventDefault();" plugins disablewebsecurity></webview>
	</div>
</template>


<script>
export default {
	name: 'game'
}
</script>


<style>
	webview {
		height: 480px 
	}
</style>
