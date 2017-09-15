<template>
	<div>
		<div v-if="battleresult.fleet">
			<div class="ship-item" v-for="(ship,index) in battleresult.fleet" :key="index" v-if="ship">
				<div class="ship-title">
					<div class="d-flex flex-row" style="flex:1;">
						<div class="ship-info">
							<span class="ship-name" style="padding:3px;">
								{{ ship.api_name }}
							</span>
						</div>
						<div class="ship-damage" :style="mvp(index)">
							{{ ship.api_damage }}
						</div>
					</div>
					<div class="ship-stat"> 
						<div class="d-flex flex-row"> 
							<span class="ship-hp"> 
								{{ ship.api_nowhp >= 0 ? ship.api_nowhp : 0 }}/{{ ship.api_maxhp }}
								<span v-if="ship.api_originhp - ship.api_nowhp">
									(-{{ ship.api_originhp - ship.api_nowhp }})
								</span>
							</span>
							<span class="ship-cond fa fa-star" :style="{ 'color' : ship.api_cond > 49 ? '#FFFF40' : ship.api_cond < 40 ? (ship.api_cond < 20 ? '#d7211f' : '#e37b3c') : '#FFF' }">
								{{ ship.api_cond }}
							</span>
						</div>
						<div>
							<progressbar height="5px" :max="ship.api_maxhp" :now="ship.api_nowhp >= 0 ? ship.api_nowhp : 0"></progressbar>
						</div>
					</div>
				</div>
			</div>
			<hr>
		</div>
		<div v-if="battleresult.enemy">
			<div class="ship-item" v-for="ship in battleresult.enemy" :key="ship.id" v-if="ship">
				<div class="ship-title">
					<div class="d-flex flex-row" style="flex:1">
						<div class="ship-info">
							<span class="ship-name" style="padding:3px">
								{{ ship.api_name }}
							</span>
						</div>
						<div class="ship_damage">
							{{ ship.api_damage }}
						</div>
					</div>
					<div class="ship-stat"> 
						<div class="d-flex flex-row"> 
							<span class="ship-hp"> 
								{{ ship.api_nowhp >= 0 ? ship.api_nowhp : 0 }}/{{ ship.api_maxhp }}
								<span v-if="ship.api_originhp - ship.api_nowhp">
									(-{{ ship.api_originhp - ship.api_nowhp }})
								</span>
							</span>
						</div>
						<div>
							<progressbar height="5px" :max="ship.api_maxhp" :now="ship.api_nowhp >= 0 ? ship.api_nowhp : 0"></progressbar>
						</div>
					</div>
				</div>
			</div>
			<hr>
		</div>
		<center>
			<span v-show="battleresult.api_win_rank">
				{{ `${$t('battle_rank')} : ${battleresult.api_win_rank}` }}
			</span>
			<span v-show="battleresult.api_get_ship">
				{{ `${$t('get_ship')} : ${battleresult.api_get_ship}`}}
			</span>
		</center>
	</div>
</template>


<script>
import progressbar from './models/Progressbar.vue'
	export default{
		name: 'prophet',
		components: { progressbar },
		computed: {
			battleresult() {
				return this.$store.state.api.battleresult
			}
		},
		methods:{
			mvp(index) {
				return this.battleresult.api_mvp ? index+1 == this.battleresult.api_mvp ? 'color:#FFFF00' : undefined : false
			}
		}
	}
</script>
