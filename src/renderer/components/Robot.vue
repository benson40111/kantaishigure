<template>
	<div class="tab-content">
		<div class="flex-column robot">
            <div class="robot-enable" data-toggle="buttons">
				<label class="btn btn-border" :class="{ 'btn-border-danger': !isEnabled }">
                	<input type="checkbox" v-model="isEnabled">
					<span v-if="isEnabled">{{ $t('Robot_enabled') }}</span>
					<span v-else>{{ $t('Robot_disabled') }}</span>
				</label>
            </div>
			<hr>
            <div class="auto-sortie" data-toggle="buttons">
				<label class="btn btn-border" :class="{ 'btn-border-danger': !Sortie }">
                	<input type="checkbox" v-model="Sortie">
						<span v-if="Sortie">{{ $t('Auto_sortie_enabled') }}</span>
						<span v-else>{{ $t('Auto_sortie_disabled') }}</span>
				</label>
            </div>
            <div class="click-delayms">
                <input type="number" v-model.number="Delayms" style="width:100px;text-align:center;">
                    {{ $t('Click_delayms') }}
            </div>
            <div class="Expedition-delay-time">
                <select class="custom-select" v-model="EnseiDelayMin">
                        <option disabled value="">{{$t('min-mintus')}}</option>
  				        <option v-for="index in delayIndex" :key="index" :value="index" :disabled="index >= EnseiDelayMax">{{ `${index} ${$t('minutes')}` }}</option>
			    </select>
                <select class="custom-select" v-model="EnseiDelayMax">
                        <option disabled value="">{{$t('max-mintus')}}</option>
  				        <option v-for="index in delayIndex" :key="index" :value="index"  :disabled="index < EnseiDelayMin">{{ `${index} ${$t('minutes')}` }}</option>
			    </select>
                <span>
                    {{$t('Expedition_delay_minutes')}}
                </span>
            </div>
            <div class="sleep-time">
                <timepicker format="HH:mm:ss" v-model="sleepTime" :second-interval="15" @change="onChangeSleepTime" hide-clear-button></timepicker>
                <span> {{ $t('Sleep_start') }} </span>
				<br>
				<span style="color:#ff5286">{{$t('Sleep_info')}}</span>
            </div>
            <div class="sleep-end">
                    <timepicker format="HH:mm:ss" v-model="sleepEnd" :second-interval="15" @change="onChangeSleepEnd" hide-clear-button></timepicker>
                    <span>
                        {{ $t('Sleep_end') }}
                    </span>
            </div>
			<hr>
            <div class="auto-expedition">
                <tabs>
                    <tab v-for="(mission,i) in Mission" :id="i" :name="index[i]" :key="i" v-if="mission != undefined" :selected="i === 0 ? true : false">
                            <div class="expedition-inside flex-content">
                                <div class="expedition">
                                    <span class="auto-Ensei" data-toggle="buttons">
				                        <label class="btn btn-border" :class="{ 'btn-border-danger': !Expedition[i][0] }">
                                            <input type="checkbox" v-model="Expedition[i][0]" @change="onChangeExpedition">
						                        <span>{{ $t('Auto_expedition') }}</span>
				                        </label>
                                    </span>
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
            enseiIndex: [...Array(40).keys()],
            delayIndex: [...Array(11).keys()],
            Expedition: this.$store.state.robot_cf.Expedition
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
            set (value) { if(value >= 1000) this.$store.commit('UPDATE_DELAYMS', value);}
        },
        isEnabled: {
            get () { return this.$store.state.robot_cf.isEnabled },
            set (value) { this.$store.commit('UPDATE_ISENABLED', value); if(value) this.$robot.emit('network.on.checkMission');}
        },
        EnseiDelayMax: {
            get() { return this.$store.state.robot_cf.EnseiDelayMax },
            set(value) { this.$store.commit('UPDATE_ENSEIDELAYMAX', value) }
        },
        EnseiDelayMin: {
            get() { return this.$store.state.robot_cf.EnseiDelayMin },
            set(value) { this.$store.commit('UPDATE_ENSEIDELAYMIN', value) }
        },
        sleepTime() {
            return this.$store.state.robot_cf.sleepTime
        },
        sleepEnd() {
            return this.$store.state.robot_cf.sleepEnd
        }
    },
    methods: {
        onChangeExpedition() {
            this.$store.commit('UPDATE_EXPEDITION', this.Expedition)
        },
        onChangeSleepTime({data}) {
            if(JSON.stringify(this.sleepTime) !== JSON.stringify(data)) this.$store.commit('UPDATE_SLEEPTIME', data)
        },
        onChangeSleepEnd({data}) {
            if(JSON.stringify(this.sleepEnd) !== JSON.stringify(data)) this.$store.commit('UPDATE_SLEEPEND', data)
        }
    }
}

</script>