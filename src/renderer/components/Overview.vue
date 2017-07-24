<template>
	<div class="tab-content">
	<div class="tab-pane active" id="overview">
		<div v-for="res in resource" :key="res.id">
			{{ res.api_value }}
		</div>
	</div>
	</div>
</template>

<script>
export default {
	name: 'overview',
	computed: {
		resource() {
			return this.$store.state.api.resource
		}
	}
}
</script>

<style>
</style>
