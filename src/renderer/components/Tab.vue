<template>
	<div class='column'>
		<div class="tabs is-centered is-fullwidth is-boxed" style="width:30%;float:right">
				<p>LV.{{basic.api_level}} {{ basic.api_nickname }} {{ chara }}/{{ basic.api_max_chara }} ?/{{ basic.api_max_slotitem }}</p>
			<ul>
				<router-link tag='li' class='nav-item is-tab' to='/' exact>
					<a>{{ $t('Overview') }}</a>
				</router-link>
				<router-link tag='li' class='nav-item is-tab' to='/fleets' exact>
					<a>{{ $t('Fleets') }}</a>
				</router-link>
				<router-link tag='li' class='nav-item is-tab' to='/setting' exact>
					<a><router-link tag='i' to='/setting' class="fa fa-cog" active-class='fa-spin' aria-hidden="true" exact></router-link></a>
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
