<template>
	<div class="row">
		<div class="col-9 no-padding">
			<game></game>
		</div>
		<div class="col-3 no-padding">
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

.no-padding{
	padding-right: 0px;
	padding-left: 0px;
}

</style>
