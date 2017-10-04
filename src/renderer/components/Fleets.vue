<template>
	<div class="fleet-outer">
		<div class="fleet-inside">
			<tabs>
				<tab class="ship-column" v-for="(fleet,i) in fleets" :id="i" :key="fleet.id" :name="fleet.fleet_name" :selected="i === 0 ? true : false">
					<div class="ship-item" v-for="ship in fleet.fleet" :key="ship.id" v-if="ship != undefined">
						<div class="ship-title">
							<div class="ship-info nowrap">
								<span class="ship-name">
									{{ ship.api_name }}
								</span>
								<span class="ship-lv">
									Lv. {{ ship.api_lv }}
								</span>
							</div>
							<div class="ship-stat nowrap"> 
								<div class="d-flex flex-row"> 
									<span class="ship-hp"> 
										{{ ship.api_nowhp }}/{{ ship.api_maxhp }} 
									</span>
									<div>
										<span class="ship-cond fa fa-star" :style="{ 'color' : ship.api_cond > 49 ? '#FFFF40' : ship.api_cond < 40 ? (ship.api_cond < 20 ? '#d7211f' : '#e37b3c') : '#FFF' }">
											{{ ship.api_cond }}
										</span>
									</div>
								</div>
								<div class="progress-hp">
									<progressbar height="10px" :max="ship.api_maxhp" :now="ship.api_nowhp"></progressbar>
								</div>
								<div class="repair" v-if="repair(ship.api_id)">
									<timer :endtime="ndock[repair_index(ship.api_id)].api_complete_time"></timer>
								</div>
							</div>
						</div>
						<span class="ship-fb">
							<div style="flex:1">
								<progressbar height="8px" style="margin-top:10px" :max="ship.api_fuel_max" :now="ship.api_fuel"></progressbar>
							</div>
							<div style="flex:1">
								<progressbar height="8px" style="margin-top:10px" :max="ship.api_bull_max" :now="ship.api_bull"></progressbar>
							</div>
						</span>
						<div class="ship-slot">
							<div v-for="(slot,i) in ship.api_slot" :key="slot.api_id" v-if="slot != -1 && slotitemDone">
								<span v-tooltip.left ="find_slot(slot).api_name">
									{{ i+1 }}
								</span>
							</div>
							<div v-if="ship.api_slot_ex">
								<span v-tooltip.left ="find_slot(ship.api_slot_ex).api_name">
									{{ 5 }}
								</span>
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

<script charset="utf-8">
import tab from './models/Tab.vue'
import tabs from './models/Tabs.vue'
import timer from './models/Timer.vue'
import progressbar from './models/Progressbar.vue'
export default {
	name: 'Fleets',
	components: { tab , tabs , progressbar , timer },
	computed: {
		slotitemDone() {
			return this.$store.state.api.slotitem.length > 0 ? true : false
		},
		fleets() {
			return this.$store.getters.getAllFleet()
		},
		ndock() {
			return this.$store.state.api.ndock.filter(x => x.api_ship_id != 0)
		}
	},
	methods: {
		find_slot(id) {
			return this.$store.getters.find_slot(id)
		},
		repair(id) {
			if(this.ndock.map(x => x.api_ship_id).includes(id)){
				return true
			}
			return false
		},
		repair_index(id) {
			return this.ndock.map(x => x.api_ship_id).indexOf(id)
		}
	}
}
</script>