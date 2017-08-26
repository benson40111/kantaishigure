<template>
	<div class="kdock">
        <div class="kdock-inside" v-for="kdock in kdocks" :key="kdock.api_id" v-if="kdock.api_state != -1">
            <div v-if="kdock.api_created_ship_id==0">
                {{ $t('Unused') }}
            </div>
            <div class="kdock-item" v-else>
                <div class="kdock-name">
                    {{ ship_mst_name(kdock.api_created_ship_id) }}
                </div>
                <div class="kdock-timer">
                    <timer :endtime="kdock.api_complete_time"></timer>
                </div>
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
        ship_mst_name(id) {
            return this.$store.getters.find_mst_ship(id).api_name
        }
    }
}

</script>

