<template>
	<div class='shigure-tab'>
		<div class="tabs is-centered is-fullwidth is-boxed">
			<div class="per_status">
				LV.{{basic.api_level}} {{ basic.api_nickname }} {{ $t('Ship') }}：{{ chara }}/{{ basic.api_max_chara }} {{ $t('Equip') }}：{{ slot }}/{{ basic.api_max_slotitem }}
			</div>
			<ul class="nav nav-tabs nav-fill flex-content">
				<div class="flex-content" style="flex:8">
					<li class="nav-item" style="flex:1">
						<router-link to="/" class="nav-link" exact>
							<i class="fa fa-home" aria-hidden="true"></i>
								{{ $t('Overview') }}
							</i>
						</router-link>
					</li>
					<li class="nav-item" style="flex:1">
						<router-link to="fleets" class="nav-link" exact>
							<i class="fa fa-ship" aria-hidden="true"></i>
								{{ $t('Fleets') }}
						</router-link>
					</li>
					<li class="nav-item" style="flex:1">
						<router-link :to="order[0]" class="nav-link" v-html="sort[order[0]]" exact>
						</router-link>
					</li>
				</div>
				<div class="flex-content" style="flex:2">
					<li class="nav-item dropdown" @click="dropdown = !dropdown" style="flex:1">
						<a class="nav-link" >
							<i class="fa fa-caret-down" aria-hidden="true"></i>
						</a>
						<div class="dropdown-menu dropdown-menu-right" :class="{ show : dropdown } ">
							<a class="dropdown-item" v-for="(value,i) in order.slice(1)" @click="changeOrder(i+1,value)"> {{ $t(value.charAt(0).toUpperCase() + value.slice(1)) }}</a>
						</div>
					</li>
					<li class="nav-item" style="flex:1">
						<router-link to="setting" class="nav-link" exact>
							<router-link tag='i' to='/setting' class="fa fa-cog" active-class='fa-spin' aria-hidden="true" exact>
							</router-link>
						</router-link>
					</li>
				</div>
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
	data() {
		return {
			order: [ 'robot' , 'prophet'],
			dropdown: false
		}
	},
	computed: {
		basic() {
			return this.$store.state.api.basic
		},
		chara(){
			return this.$store.state.api.ship.length
		},
		slot() {
			return this.$store.state.api.slotitem.length
		},
		sort() { 
			return {
				robot: `
							<i class="fa fa-android " aria-hidden="true"></i>
							${ this.$t('Robot')}
			`,
				prophet: `
							<i class="fa fa-eye " aria-hidden="true"></i>
							${ this.$t('Prophet')}
			`
			}
		}
	},
	methods: {
		changeOrder(index,value) {
			let temp = this.order[0]
			this.order[0] = this.order[index]
			this.order[index] = temp
			location.href = `#/${value}`
		}
	}
}
</script>
