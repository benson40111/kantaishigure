<template>
	<div class="tab-content">
		<div class="tab-pane active" id="overview">
			<resource></resource>
			<ship_status></ship_status>
		</div>
	</div>
</template>

<script>
import resource from './Resource.vue'
import ship_status from './Ship_Status.vue'
export default {
	name: 'overview',
	components: { resource, ship_status}
}

</script>
