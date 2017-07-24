<template>
	<div id="game" style="height:auto;width:70%;float:left">
		<webview id="main" src="about:blank()" ondrop="event.preventDefault();" plugins disablewebsecurity preload="C:\Users\madne\Downloads\kantaishigure\src\renderer\assets\js\webview-preload.js"></webview>
	</div>
</template>


<script>
export default {
	name: 'game'
}
</script>


<style>
	webview {
		height: 600px 
	}
</style>
