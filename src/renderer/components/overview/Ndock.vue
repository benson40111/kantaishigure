<template>
	<div class="ndock">
        <div class="ndock-inside" v-for="ndock in ndocks" :key="ndock.api_id" v-if="ndock.api_state != -1">
            <div v-if="ndock.api_complete_time==0">
                {{ $t('None-Use') }}
            </div>
            <div v-else>
                {{ ship_name(ndock.api_ship_id) }} <timer style="float:right" :endtime="ndock.api_complete_time"></timer>
            </div>
        </div>
        <div class="ndock-inside" v-else>
            {{ $t('Unopened')}}
        </div>
	</div>
</template>

<script>
import timer from '../models/Timer.vue'
export default {
    name: 'ndock',
    components: { timer },
    computed: {
        ndocks() {
            return this.$store.state.api.ndock
        },
        ships() {
            return this.$store.state.api.ship
        }
    },
    methods: {
        ship_name(id) {
            return this.$store.getters.find_ship(id).api_name
        }
    }
}

</script>

<style>
.ndock{
	border: 2px solid #3d3d3d;
	border-radius: 5px;
	margin: 10px;
	font-size: 16px;
}
.ndock-inside{
    margin: 5px 10px 5px 5px;
}
</style>
