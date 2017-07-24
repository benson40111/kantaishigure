<template>
	<div class='column'>
		<div class="tabs is-centered is-fullwidth is-boxed">
				<p>LV.{{basic.api_level}} {{ basic.api_nickname }} {{ chara }}/{{ basic.api_max_chara }} ?/{{ basic.api_max_slotitem }}</p>
			<ul class="nav nav-tabs">
				<router-link tag='li' class="active" to='/' exact>
					<a data-toggle="tab" id="overview">{{ $t('Overview') }}</a>
				</router-link>
				<router-link tag='li' class='nav-item is-tab' to='/fleets' exact>
					<a data-toggle="tab" id="fleets">{{ $t('Fleets') }}</a>
				</router-link>
				<router-link tag='li' class='nav-item is-tab' to='/setting' exact>
					<a data-toggle="tab"><router-link tag='i' to='/setting' class="fa fa-cog" active-class='fa-spin' aria-hidden="true" exact></router-link></a>
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
