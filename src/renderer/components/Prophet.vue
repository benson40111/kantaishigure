<template>
	<div v-if="Object.keys(battleresult).length">
		<div class="ship-item" v-for="ship in battleresult.fleet" :key="ship.id" v-if="ship != undefined">
			<div class="ship-title">
				<div class="flex-content" style="flex:1">
					<div class="ship-info">
						<span class="ship-name">
							{{ ship.api_name }}
						</span>
						<span class="ship-lv">
							Lv. {{ ship.api_lv }}
						</span>
					</div>
					<div style="flex:1">
						{{ ship.api_damage }}	
					</div>
				</div>
				<div class="ship-stat"> 
					<div class="flex-content"> 
						<span class="ship-hp"> 
							{{ ship.api_nowhp >= 0 ? ship.api_nowhp : 0 }}/{{ ship.api_maxhp }} 
						</span>
						<div>
							<span class="ship-cond fa fa-star" :style="{ 'color' : ship.api_cond > 49 ? '#FFFF40' : ship.api_cond < 40 ? (ship.api_cond < 20 ? '#d7211f' : '#e37b3c') : '#FFF' }">
								{{ ship.api_cond }}
							</span>
						</div>
					</div>
					<div class="progress-hp">
						<progressbar height="10px" :max="ship.api_maxhp" :now="ship.api_nowhp >= 0 ? ship.api_nowhp : 0"></progressbar>
					</div>
				</div>
			</div>
		</div>
		<hr>
		<div class="ship-item" v-for="ship in battleresult.enemy" :key="ship.id" v-if="ship != undefined">
			<div class="ship-title">
				<div class="flex-content" style="flex:1">
					<div class="ship-info">
						<span class="ship-name">
							{{ ship.api_name }}
						</span>
						<span class="ship-lv">
							Lv. {{ ship.api_lv }}
						</span>
					</div>
					<div style="flex:1">
						{{ ship.api_damage }}	
					</div>
				</div>
				<div class="ship-stat"> 
					<div class="flex-content"> 
						<span class="ship-hp"> 
							{{ ship.api_nowhp >= 0 ? ship.api_nowhp : 0 }}/{{ ship.api_maxhp }} 
						</span>
					</div>
					<div class="progress-hp">
						<progressbar height="10px" :max="ship.api_maxhp" :now="ship.api_nowhp >= 0 ? ship.api_nowhp : 0"></progressbar>
					</div>
				</div>
			</div>
		</div>
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
		}
	}
</script>
