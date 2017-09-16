<template>
	<div class='shigure-tab'>
		<div class="tabs is-centered is-fullwidth is-boxed">
			<div class="per_status">
				LV.{{basic.api_level}} {{ basic.api_nickname }} {{ $t('Ship') }}：{{ chara }}/{{ basic.api_max_chara }} {{ $t('Equip') }}：{{ slot }}/{{ basic.api_max_slotitem }}
			</div>
			<ul class="nav nav-tabs nav-fill nav-shigure">
					<li class="nav-item" style="width:26%">
						<router-link to="/" id="home" class="nav-link" exact>
							<span>
								<span class="fa fa-home" aria-hidden="true"></span>
								{{ $t('Overview') }}
							</span>
						</router-link>
					</li>
					<li class="nav-item" style="width:26%">
						<router-link to="fleets" id="fleets" class="nav-link" exact>
							<span>
								<span class="fa fa-ship" aria-hidden="true"></span>
								{{ $t('Fleets') }}
							</span>
						</router-link>
					</li>
					<li class="nav-item" style="width:26%">
						<router-link :to="order[0]" :id="order[0]" class="nav-link" v-html="sort[order[0]]" exact>
						</router-link>
					</li>
					<li class="nav-item dropdown" @click="dropdown = !dropdown;tooltip_pos()" style="width:11%">
						<a class="nav-link">
							<i class="fa fa-caret-down" aria-hidden="true"></i>
						</a>
					</li>
					<li class="nav-item" style="width:11%">
						<router-link to="setting" id="setting" class="nav-link" exact>
							<router-link tag='i' to='/setting' class="fa fa-cog" active-class='fa-spin' aria-hidden="true" exact>
							</router-link>
						</router-link>
					</li>
			</ul>
			<div class="dropdown-shigure" :style="pos" :class="{ show : dropdown } ">
				<a class="dropdown-shigure-item" :id="value" v-for="(value,i) in order.slice(1)" @click="changeOrder(i+1,value);dropdown=false"> {{ $t(value.charAt(0).toUpperCase() + value.slice(1)) }}</a>
			</div>
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
			dropdown: false,
			pos: ''
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
						<span>
							<span class="fa fa-android " aria-hidden="true"></span>
							${ this.$t('Robot')}
						</span>
			`,
				prophet: `
						<span>
							<span class="fa fa-eye " aria-hidden="true"></span>
							${ this.$t('Prophet')}
						</span>
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
		},
		tooltip_pos(){
			let temp = document.querySelector('.nav-item.dropdown')
			this.pos = `top:${temp.offsetTop + temp.offsetHeight}px;left:${temp.offsetLeft - temp.offsetWidth}px;`
		}
	}
}
</script>
