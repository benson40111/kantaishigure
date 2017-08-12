<template>
	<div class="tab-content">
			<div class="flex-content">
				<div class="left-flex flex-column">
					<resource></resource>
					<ship_status></ship_status>
				</div>
				<div class="right-flex flex-column">
					<mission></mission>
					<ndock></ndock>
				</div>
			</div>
	</div>
</template>

<script>
import resource from './Resource.vue'
import ship_status from './Ship_Status.vue'
import mission from './Mission.vue'
import ndock from './Ndock.vue'
export default {
	name: 'overview',
	components: { 
		resource, 
		ship_status , 
		mission,
		ndock
		}
}

</script>