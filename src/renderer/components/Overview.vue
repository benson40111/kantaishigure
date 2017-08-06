<template>
		<resource style="height:150px;"></resource>
		<ship_status></ship_status>
</template>

<script>
import resource from './Resource.vue'
import ship_status from './Ship_Status.vue'
export default {
	name: 'overview',
	components: { resource, ship_status}
}

</script>
