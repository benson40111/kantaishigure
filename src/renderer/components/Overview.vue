<template>
	<div class="tab-content">
			<div class="flex-content">
				<div class="left-flex flex-column">
					<resource></resource>
					<ship_status></ship_status>
				</div>
				<div class="right-flex flex-column">
					<tabs>
					<tab id="Docking" :name="$t('Docking')" :selected="true">
						<ndock></ndock>
					</tab>
					<tab id="Building" :name="$t('Construction')">
						<kdock></kdock>
					</tab>
					</tabs>
					<mission></mission>
					<quest></quest>
				</div>
			</div>
	</div>
</template>

<script>
import resource from './overview/Resource.vue'
import ship_status from './overview/Ship_Status.vue'
import mission from './overview/Mission.vue'
import ndock from './overview/Ndock.vue'
import kdock from './overview/Kdock.vue'
import quest from './overview/Quest.vue'
import tab from './models/Tab.vue'
import tabs from './models/Tabs.vue'
export default {
	name: 'overview',
	components: { 
		resource, 
		ship_status , 
		mission,
		ndock,
		kdock,
		quest,
		tab,
		tabs
	}
}

</script>