<template>
	<div class="mission">
        <div v-for="mission in missions" v-if="mission != undefined" :key="mission.id">
            <div v-if="mission[0] !== 0" class="mission-inside">
                <div class="mission-name">
                    {{ mission[1] | mission_format(mst_mission) }} 
                </div>
                <div class="mission-timer">
                    <timer :endtime="mission[2]"></timer>
                </div>
            </div>
            <div v-else class="mission-inside">
                {{ $t('Ready')}}
            </div>
        </div>
        <div v-else class="mission-inside">
            {{ $t('Unopened') }}
        </div>
	</div>
</template>

<script>
import timer from '../models/Timer.vue'
export default {
    name: 'mission',
    components: { timer },
    data() {
        return {
            mst_mission: this.$store.state.api.mst_mission
        }
    },
    filters: {
        mission_format: (data, mst) => {
            if(data !== 0){
                return mst[data-1].api_name
            }
        }
    },
    computed: {
        missions() {
            return this.$store.state.api.mission
        }
    }
}

</script>