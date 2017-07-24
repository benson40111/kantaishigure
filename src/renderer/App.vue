<template>
	<div class="row">
		<div class="col-md-9 col-sm-9 col-xs-8">
			<game></game>
		</div>
		<div class="col-md-3 col-sm-2 col-xs-4">
			<tab></tab>
		</div>
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
  @import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
  html body {
	  background-color: #222222;
  }
</style>
