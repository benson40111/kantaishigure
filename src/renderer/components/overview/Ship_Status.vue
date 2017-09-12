<template>
	<div class="ship_status">
		<div class="ship_inside">
			<tabs>
				<tab v-for="(fleet,i) in fleets" :id="i" :key="fleet.id" :name="INDEX[i]" :selected="i === 0 ? true : false">
					<div class="ship-item" v-for="ship in fleet.fleet" :key="ship.id" v-if="ship != undefined">
						<div class="ship-info">
							<span class="ship-name">
								{{ ship.api_name }}
							</span>
							<span class="ship-lv">
								Lv. {{ ship.api_lv }}
							</span>
						</div>
						<div class="ship-stat"> 
							<div class="flex-content"> 
								<span class="ship-hp"> 
									{{ ship.api_nowhp }}/{{ ship.api_maxhp }} 
								</span>
								<div>
									<span class="fa fa-database" style="margin-right:5px; background:red;" v-if="ship.api_bull != ship.api_bull_max || ship.api_fuel != ship.api_fuel_max">
									</span>
									<span class="ship-cond fa fa-star" :style="{ 'color' : ship.api_cond > 49 ? '#FFFF40' : ship.api_cond < 40 ? (ship.api_cond < 20 ? '#d7211f' : '#e37b3c') : '#FFF' }">
										{{ ship.api_cond }}
									</span>
								</div>
							</div>
							<div class="progress-hp">
								<progressbar height="8px" :max="ship.api_maxhp" :now="ship.api_nowhp"></progressbar>
							</div>
						</div>
					</div>
					<div v-else>
						<br>
					</div>
				</tab>
			</tabS>
		</div>
	</div>
</template>

<script>
import tab from '../models/Tab.vue'
import tabs from '../models/Tabs.vue'
import progressbar from '../models/Progressbar.vue' 
export default {
	name: 'ship_status',
	components: { tab , tabs , progressbar },
	data() {
		return {
			INDEX: ['I', 'II', 'III', 'IV']
		}
	},
	computed: {
		fleets() {
			return this.$store.state.api.fleet
		}
	}
}
</script>
