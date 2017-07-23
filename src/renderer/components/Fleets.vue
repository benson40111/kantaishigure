<template>
	<div>
		<ul>
			<div v-for="fleet in fleets">
			<li>
				{{ fleet.api_name }}
			</li>
			{{ fleet.api_ship }}
			</div>
		</ul>
	</div>
</template>


<script charset="utf-8">
export default {
	name: 'Fleets',
	computed: {
		fleets() {
			return this.$store.state.api.fleet
		},
		ships() {
			return this.$store.state.api.ship
		}
	}
}
</script>
