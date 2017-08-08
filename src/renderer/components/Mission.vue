<template>
	<div class="mission">
        <div v-for="mission in missions" v-if="mission != undefined" :key="mission.id">
            {{ mission[1] | mission_format(mst_mission) }} <timer :endtime="mission[2]"></timer>
        </div>
        <div v-else>
            {{ $t('Unopened') }}
        </div>
	</div>
</template>

<script>
import timer from './models/Timer.vue'
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
            if(data == 0){
                return 
            } else {
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
