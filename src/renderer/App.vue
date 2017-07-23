<template>
	<div class="">
		<game></game>
		<tab></tab>
	</div>
</template>

<script>
	import game from './components/Game.vue'
	import tab from './components/Tab.vue'
	export default {
		name: 'kantaishigure',
		components: { game , tab }
	}
</script>

<style lang='css'>
  @import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
</style>
