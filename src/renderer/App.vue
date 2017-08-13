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
	components: { game , tab },
	mounted() {
		this.$http.get(`static/i18n/${this.$store.state.config.language}.json`)
		.then( (res) => this.$i18n.add(this.$store.state.config.language, res.data) )
		.catch( (err) => console.log(err) )
		this.$i18n.set(this.$store.state.config.language)
	}
}
</script>

<style lang='css'>
@import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
html body {
	background-color: #222222;
	height: 100%;
	font-family:sans-serif;
}
.main {
	display: flex;
	flex-flow: row nowrap;
}
.main-tab{
	height:100%;
}
.flex-content {
	display: flex;
	flex-flow: row nowrap;
}
.flex-column {
	display: flex;
	flex-flow: column;
}
.left-flex {
	flex: 1
}
.right-flex {
	flex: 1
}
</style>
