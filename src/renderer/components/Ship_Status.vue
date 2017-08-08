<template>
	<div class="ship_status">
		<div class="ship_inside">
			<tabs>
				<tab v-for="(fleet,i) in fleets" :id="i" :key="fleet.id" :name="INDEX[i]" :selected="fleet === fleets[0] ? true : false">
					<div v-for="ship in fleet" :key="ship.id">
						{{ ship.api_name }} {{ ship.api_nowhp }}/{{ ship.api_maxhp }}  {{ ship.api_cond }}
					</div>
				</tab>
			</tabS>
		</div>
	</div>
</template>

<script>
import tab from './models/Tab.vue'
import tabs from './models/Tabs.vue'
export default {
	name: 'ship_status',
	components: { tab , tabs },
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

<style>
.ship_status{
	border: 2px solid #3d3d3d;
	border-radius: 5px;
	margin: 30px 10px 30px 10px;
	font-size: 13px;
}
</style>
