<template>
	<div class='shigure-tab'>
		<div class="tabs is-centered is-fullwidth is-boxed">
			<div class="per_status">
				LV.{{basic.api_level}} {{ basic.api_nickname }} {{ $t('Ship') }}：{{ chara }}/{{ basic.api_max_chara }} {{ $t('Equip') }}：{{ slot }}/{{ basic.api_max_slotitem }}
			</div>
			<ul class="nav nav-tabs nav-fill flex-content">
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
						<router-link to="/robot" class="nav-link" exact>
							<i class="fa fa-android " aria-hidden="true"></i>
							{{ $t('Robot') }}
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
		<transition name="fade">
			<router-view class="main-tab-view"></router-view>
		</transition>
	</div>
</template>


<script charset="utf-8">
export default {
	name: 'main_tab',
	computed: {
		basic() {
			return this.$store.state.api.basic
		},
		chara(){
			return this.$store.state.api.ship.length
		},
		slot() {
			return this.$store.state.api.slotitem.length
		}
	}
}
</script>

