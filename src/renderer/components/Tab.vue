<template>
	<div class='shigure-tab'>
		<div class="tabs is-centered is-fullwidth is-boxed">
			<div class="per_status">
				LV.{{basic.api_level}} {{ basic.api_nickname }} {{ $t('Ship') }}：{{ chara }}/{{ basic.api_max_chara }} {{ $t('Equip') }}：{{ basic.api_max_slotitem }}
			</div>
			<ul class="nav nav-tabs nav-fill">
				<li class="nav-item">
					<router-link to="/" class="nav-link" exact>
						<i class="fa fa-home" aria-hidden="true"></i>
						{{ $t('Overview') }}
					</router-link>
				</li>
				<li class="nav-item">
				<router-link to="/fleets" class="nav-link" exact>
					<i class="fa fa-ship" aria-hidden="true"></i>
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
	.per_status{
		text-align: center;
		width: 100%;
		padding: 5px 5px 5px 5px;
		height: auto;
		border: 2px solid #3d3d3d;
		border-radius: 5px;
		font-size: 13px;
	}
</style>
