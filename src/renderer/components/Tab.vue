<template>
	<div class='shigure-tab' style="">
		<div class="tabs is-centered is-fullwidth is-boxed" style="width:30%;float:right">
				<p>LV.{{basic.api_level}} {{ basic.api_nickname }} {{ chara }}/{{ basic.api_max_chara }} ?/{{ basic.api_max_slotitem }}</p>
			<ul class="nav nav-tabs navbar-inverse">
				<router-link tag='li' class="nav-item" to='/' exact>
					<a class="nav-link active">{{ $t('Overview') }}</a>
				</router-link>
				<router-link tag='li' class="nav-item" to='/fleets' exact>
					<a class="nav-link">{{ $t('Fleets') }}</a>
				</router-link>
				<router-link tag='li' class="nav-item" to='/setting' exact>
					<a class="nav-link"><router-link tag='i' to='/setting' class="fa fa-cog" active-class='fa-spin' aria-hidden="true" exact></router-link></a>
				</router-link>
			</ul>
		</div>
		<router-view></router-view>
	</div>
</template>


<script charset="utf-8">
export default {
	name: 'tab',
	computed: {
		basic() {
			return this.$store.state.api.basic
		},
		chara(){
			return this.$store.state.api.ship.length
		}
	}
}
</script>

<style>
	.shigure-tab {
		background-color: #333;
		color: #FFF;
	}
	.nav-link {
		color: #FFF
	}
</style>
