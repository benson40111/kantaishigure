<template>
	<div class="tab-content">
		<div class="flex-column robot">
            <div class="robot-enable">
				<label class="btn btn-primary" :class="{ 'btn-danger': isEnabled }">
                	<input type="checkbox" v-model="isEnabled">
                    	{{ $t('Robot_enable') }}
				</label>
            </div>
			<hr>
            <div class="robot-sortie">
				<label class="btn btn-success" :class="{ 'btn-danger': Sortie }">
                	<input type="checkbox" v-model="Sortie">
                    	{{ $t('Auto_sortie') }}
				</label>
            </div>
            <div class="click-delayms">
                <input type="number" v-model.number="Delayms">
                    {{ $t('Click_delayms') }}
            </div>
            <div class="Expedition-delay-time">
                <select class="custom-select" v-model="EnseiDelayMin">
                        <option disabled value="">{{$t('min-mintus')}}</option>
  				        <option v-for="index in enseiIndex" :key="index" :value="index+1">{{ `${index+1} ${$t('minutes')}` }}</option>
			    </select>
                <select class="custom-select" v-model="EnseiDelayMax">
                        <option disabled value="">{{$t('max-mintus')}}</option>
  				        <option v-for="index in enseiIndex" :key="index" :value="index+1"  :disabled="index < EnseiDelayMin">{{ `${index+1} ${$t('minutes')}` }}</option>
			    </select>
                <span>
                    {{$t('Expedition_delay_minutes')}}
                </span>
            </div>
            <div class="sleep-time">
                <timepicker format="HH:mm:ss" v-model="sleepTime" :second-interval="15" @change="onChangeSleepTime" hide-clear-button></timepicker>
                <span>
                    {{ $t('Sleep_start') }} <span style="color:#ff5286">{{$t('Sleep_info')}}</span>
                </span>
            </div>
            <div class="sleep-end">
                    <timepicker format="HH:mm:ss" v-model="sleepEnd" :second-interval="15" @change="onChangeSleepEnd" hide-clear-button></timepicker>
                    <span>
                        {{ $t('Sleep_end') }}
                    </span>
            </div>
			<hr>
            <div class="robot-expedition margin-content">
                <tabs>
                    <tab v-for="(mission,i) in Mission" :id="i" :name="index[i]" :key="i" v-if="mission != undefined" :selected="i === 0 ? true : false">
                            <div class="expedition-inside flex-content">
                                <div class="expedition">
                                    <input type="checkbox" v-model="Expedition[i][0]" @change="onChangeExpedition">
                                        <span style="margin-right:10px">{{ $t('Auto_expedition') }}</span>
                                        <span style="margin-right:10px">{{ $t('Ensei-ID') }}</span>
			                        <select class="custom-select" v-model="Expedition[i][1]" @change="onChangeExpedition" :disabled="!Expedition[i][0]">
                                        <option disabled value="">{{$t('Select-one')}}</option>
  				                        <option v-for="index in enseiIndex" :key="index" :value="index">{{ index+1 }}</option>
			                        </select>
                                </div>
                            </div>
                    </tab>
                    <tab v-else :id="i" :name="$t('Unopened')">
                    </tab>
                </tabs>
            </div>
		</div>
	</div>
</template>

<script>
import tab from './models/Tab.vue'
import tabs from './models/Tabs.vue'
import timepicker from './models/vue-timepicker.vue'
export default {
    name: 'robot',
    components: { tab , tabs , timepicker },
    data() {
        return {
            index: ['II', 'III', 'IV'],
            enseiIndex: [...Array(40).keys()]
        }
    },
    computed: {
        Mission() {
            return this.$store.state.api.mission
        },
        Sortie: {
            get () { return this.$store.state.robot_cf.Sortie },
            set (value) { this.$store.commit('UPDATE_SORTIE', value) }
        },
        Delayms: {
            get () { return this.$store.state.robot_cf.Delayms },
            set (value) { this.$store.commit('UPDATE_DELAYMS', value); if(value) this.$robot.emit('network.on.checkMission');}
        },
        isEnabled: {
            get () { return this.$store.state.robot_cf.isEnabled },
            set (value) { this.$store.commit('UPDATE_ISENABLED', value)}
        },
        EnseiDelayMax: {
            get() { return this.$store.state.robot_cf.EnseiDelayMax },
            set(value) { this.$store.commit('UPDATE_ENSEIDELAYMAX', value) }
        },
        EnseiDelayMin: {
            get() { return this.$store.state.robot_cf.EnseiDelayMin },
            set(value) { this.$store.commit('UPDATE_ENSEIDELAYMIN', value) }
        },
        Expedition() {
            return JSON.parse(JSON.stringify(this.$store.state.robot_cf.Expedition))
        },
        sleepTime() {
            return JSON.parse(JSON.stringify(this.$store.state.robot_cf.sleepTime))
        },
        sleepEnd() {
            return JSON.parse(JSON.stringify(this.$store.state.robot_cf.sleepEnd))
        }
    },
    methods: {
        onChangeExpedition() {
            this.$store.commit('UPDATE_EXPEDITION', this.Expedition)
        },
        onChangeSleepTime({data}) {
            this.$store.commit('UPDATE_SLEEPTIME', data)
        },
        onChangeSleepEnd({data}) {
            this.$store.commit('UPDATE_SLEEPEND', data)
        }
    }
}

</script>
