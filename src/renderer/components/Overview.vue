<template>
	<div>
		<div v-for="res in resource" :key="res.id">
			{{ res.api_value }}
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
