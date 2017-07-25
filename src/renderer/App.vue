<template>
	<div class="main">
		<div class="main-game">
			<game></game>
		</div>
		<div class="main-tab">
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
.main {
	display: flex;
	flex-flow: row nowrap;
}
.main-game {
	flex: 5 0px;
}
.main-tab {
	flex: 2 0px;
}


</style>
