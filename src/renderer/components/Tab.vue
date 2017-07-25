<template>
	<div class='shigure-tab'>
		<div class="tabs is-centered is-fullwidth is-boxed">
				<p>LV.{{basic.api_level}} {{ basic.api_nickname }} {{ chara }}/{{ basic.api_max_chara }} ?/{{ basic.api_max_slotitem }}</p>
			<ul class="nav nav-tabs nav-fill">
				<li class="nav-item">
					<router-link to="/" class="nav-link" exact>
						{{ $t('Overview') }}
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/fleets" class="nav-link" exact>
						{{ $t('Fleets') }}
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/setting" class="nav-link" exact>
						<router-link tag='i' to='/setting' class="fa fa-cog" active-class='fa-spin' aria-hidden="true" exact>
						</router-link>
					</router-link>
				</li>
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
		color: #FFF;
	}
	.nav-link:hover{
		color: aqua;
		border-color: #333 !important;
		border-bottom-color: aqua !important;
	}
	.nav-link.active {
		background-color: #333 !important;
		color:aqua !important;
		border-color: #333 !important;
		border-bottom-color: aqua !important;
	}
</style>
