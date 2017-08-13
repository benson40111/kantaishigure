<template>
	<div class="kdock">
        <div class="kdock-inside" v-for="kdock in kdocks" :key="kdock.api_id" v-if="kdock.api_state != -1">
            <div v-if="kdock.api_created_ship_id==0">
                {{ $t('None-Use') }}
            </div>
            <div v-else>
                {{ ship_name(kdock.api_created_ship_id) }} <timer style="float:right" :endtime="kdock.api_complete_time"></timer>
            </div>
        </div>
        <div class="kdock-inside" v-else>
            {{ $t('Unopened')}}
        </div>
	</div>
</template>

<script>
import timer from '../models/Timer.vue'
export default {
    name: 'kdock',
    components: { timer },
    computed: {
        kdocks() {
            return this.$store.state.api.kdock
        },
        ships() {
            return this.$store.state.api.mst_ship
        }
    },
    methods: {
        ship_name(id) {
            for(let i = 0 ; i < this.ships.length ; i++)
            {
                if(id === this.ships[i].api_id){
                    return this.ships[i].api_name
                }
            }
            return "Error"
        }
    }
}

</script>

<style>
.kdock{
	border: 2px solid #3d3d3d;
	border-radius: 5px;
	margin: 10px;
	font-size: 16px;
}
.kdock-inside{
    margin: 5px 10px 5px 5px;
}
</style>
