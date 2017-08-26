<template>
	<div class="ndock">
        <div class="ndock-inside" v-for="ndock in ndocks" :key="ndock.api_id" v-if="ndock.api_state != -1">
            <div v-if="ndock.api_complete_time==0">
                {{ $t('Unused') }}
            </div>
            <div class="ndock-item" v-else>
                <div class="ndock-name">
                    {{ ship_name(ndock.api_ship_id) }}
                </div>
                <div class="ndock-timer">
                    <timer :endtime="ndock.api_complete_time"></timer>
                </div>
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