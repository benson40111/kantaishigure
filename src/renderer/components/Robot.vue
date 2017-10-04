<template>
	<div class="tab-content">
		<div class="flex-column robot">
            <div class="robot-enable">
				<label class="btn btn-border" :class="{ 'btn-border-danger': !isEnabled }">
                	<input type="checkbox" class="btn-radio" v-model="isEnabled">
					<span v-if="isEnabled">{{ $t('Robot_enabled') }}</span>
					<span v-else>{{ $t('Robot_disabled') }}</span>
				</label>
            </div>
			<hr>
            <div class="auto-sortie">
				<label class="btn btn-border" :class="{ 'btn-border-danger': !Sortie }">
                	<input type="checkbox" class="btn-radio" v-model="Sortie">
						<span v-if="Sortie">{{ $t('Auto_sortie_enabled') }}</span>
						<span v-else>{{ $t('Auto_sortie_disabled') }}</span>
				</label>
            </div>
            <div v-show="Sortie">
                <div class="sortiefleet">
                    <select class="custom-select" v-model.number="sortieFleet" v-tooltip.top="$t('sortieFleet-info')">
                            <option disabled value="">{{$t('sortieFleet')}}</option>
  				            <option value="0">1</option>
                            <option value="1">2</option>
                            <option value="2">3</option>
			        </select>
                    <span>
                    	<label class="btn btn-border" v-tooltip.right="sortieFleetStatus ? $t('sortiefleetStatus-start-info') : $t('sortiefleetStatus-stop-info')" :class="{ 'btn-border-danger': !sortieFleetStatus }">
                	        <input type="checkbox" class="btn-radio" v-model="sortieFleetStatus">
						    <span v-if="sortieFleetStatus">{{ $t('sortiefleetStatus-start') }}</span>
						    <span v-else>{{ $t('sortiefleetStatus-stop') }}</span>
				        </label>
                    </span>
                </div>
                <div class="sortie-Area" style="margin-top:10px">
                    <select class="custom-select" v-model.number="sortieArea1">
                            <option disabled value="">{{$t('sortie-Area1')}}</option>
  				            <option v-for="index in sortieIndex" :key="index" :value="index">{{ `${index+1}` }}</option>
			        </select>
                    <select class="custom-select" v-model.number="sortieArea2">
                            <option disabled value="">{{$t('sortie-Area2')}}</option>
  				            <option v-for="index in sortieIndex" :key="index" :value="index">{{ `${index+1}` }}</option>
			        </select>
                </div>
                <div class="sortie-times">
                    <select class="custom-select" style="margin-top:10px" v-model.number="sortieTimes">
                            <option disabled value="">{{$t('attack-times')}}</option>
  				            <option v-for="index in sortieIndex2" :key="index" :value="index+1">{{ `${index+1}` }}</option>
			        </select>
                    <select class="custom-select" style="margin-top:10px" v-model.number="Formation">
                            <option disabled value="">{{$t('Formation')}}</option>
  				            <option value="0">{{$t('Line-ahead')}}</option>
                            <option value="1">{{$t('Double-line')}}</option>
                            <option value="2">{{$t('Diamond')}}</option>
                            <option value="3">{{$t('Echelon')}}</option>
                            <option value="4">{{$t('Line-abreast')}}</option>
			        </select>
                </div>
                <div>
                    <select class="custom-select" style="margin-top:10px" v-model.number="repair">
                            <option disabled value="">{{$t('repair-config')}}</option>
  				            <option value="0">{{$t('heavily-damaged')}}</option>
                            <option value="1">{{$t('moderate-damaged')}}</option>
                            <option value="2">{{$t('minor-damaged')}}</option>
			        </select>
                    <select class="custom-select" style="margin-top:10px" v-model.number="returnPort">
                            <option disabled value="">{{$t('return-config')}}</option>
  				            <option value="0">{{$t('heavily-damaged')}}</option>
                            <option value="1">{{$t('moderate-damaged')}}</option>
                            <option value="2">{{$t('minor-damaged')}}</option>
			        </select>
                </div>
                <div style="margin-top:10px;">
				    <label class="btn btn-border" :class="{ 'btn-border-danger': !fastRepair }">
                	    <input type="checkbox" class="btn-radio" v-model="fastRepair">
					    <span v-if="fastRepair">{{ $t('fastRepair-Enabled') }}</span>
				    	<span v-else>{{ $t('fastRepair-Disabled') }}</span>
				    </label>
                    <select v-tooltip="$t('fastRepair-info')" class="custom-select" style="margin-top:10px" v-model.number="fastRepairTime" v-if="fastRepair">
                            <option disabled value="">{{$t('fastRepair-config')}}</option>
  				            <option :value="value+1" v-for="value in condIndex" :key="value">{{ `${value+1} ${$t('minutes')}` }}</option>
			        </select>
                </div>
                <div style="margin-top:10px;">
				    <label class="btn btn-border" :class="{ 'btn-border-danger': !waitCond }">
                	    <input type="checkbox" class="btn-radio" v-model="waitCond">
					    <span v-if="waitCond">{{ $t('waitCond-Enabled') }}</span>
				    	<span v-else>{{ $t('waitCond-Disabled') }}</span>
				    </label>
                    <select class="custom-select" style="margin-top:10px" v-model.number="Cond" v-if="waitCond">
                            <option disabled value="">{{$t('return-config')}}</option>
  				            <option :value="value+1" v-for="value in condIndex" :key="value">{{ value+1 }}</option>
			        </select>
                </div>
                <div style="margin-top:10px;">
				    <label class="btn btn-border" :class="{ 'btn-border-danger': !SortieMidnight }">
                	    <input type="checkbox" class="btn-radio" v-model="SortieMidnight">
					    <span v-if="SortieMidnight">{{ $t('SortieMidnight-Enabled') }}</span>
				    	<span v-else>{{ $t('SortieMidnight-Disabled') }}</span>
				    </label>
                </div>
                <div style="margin-top:10px;">
				    <label class="btn btn-border" v-tooltip.right="$t('sortieSleepClear-info')" :class="{ 'btn-border-danger': !sortieSleepClear }">
                	    <input type="checkbox" class="btn-radio" v-model="sortieSleepClear">
					    <span>{{ $t('sortieSleepClear') }}</span>
				    </label>
                </div>
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
                                    <span class="auto-Ensei" data-toggle="button">
				                        <label class="btn btn-border" :class="{ 'btn-border-danger': !Expedition[i].enable }">
                                            <input type="checkbox" v-model="Expedition[i].enable" @change="onChangeExpedition">
						                        <span>{{ $t('Auto_expedition') }}</span>
				                        </label>
                                    </span>
                                    <span style="margin-right:10px">{{ $t('Ensei-ID') }}</span>
			                        <select class="custom-select" v-model="Expedition[i].id" @change="onChangeExpedition" :disabled="!Expedition[i].enable">
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
            condIndex: [...Array(49).keys()],
            delayIndex: [...Array(11).keys()],
            sortieIndex: [...Array(6).keys()],
            sortieIndex2: [...Array(10).keys()],
            Expedition: JSON.parse(JSON.stringify(this.$store.state.robot_cf.Expedition))
        }
    },
    computed: {
        Mission() {
            return this.$store.state.api.mission
        },
        Sortie: {
            get() { return this.$store.state.robot_cf.Sortie },
            set(value) { this.$store.commit('UPDATE_SORTIE', value) }
        },
        SortieMidnight: {
            get() { return this.$store.state.robot_cf.SortieMidnight },
            set(value) { this.$store.commit('UPDATE_SORTIEMIDNIGHT', value) }
        },
        Formation: {
            get() { return this.$store.state.robot_cf.Formation },
            set(value) { this.$store.commit('UPDATE_FORMATION', value) }
        },
        returnPort: {
            get() { return this.$store.state.robot_cf.returnPort },
            set(value) { this.$store.commit('UPDATE_RETURNPORT', value )}
        },
        waitCond: {
            get() { return this.$store.state.robot_cf.waitCond },
            set(value) { this.$store.commit('UPDATE_WAITCOND', value )}
        },
        Cond: {
            get() { return this.$store.state.robot_cf.Cond },
            set(value) { this.$store.commit('UPDATE_COND', value ) }
        },
        fastRepair: {
            get() { return this.$store.state.robot_cf.fastRepair },
            set(value) { this.$store.commit('UPDATE_FASTREPAIR', value) }
        },
        fastRepairTime: {
            get() { return this.$store.state.robot_cf.fastRepairTime },
            set(value) { this.$store.commit('UPDATE_FASTREPAIRTIME', value )}
        },
        Delayms: {
            get() { return this.$store.state.robot_cf.Delayms },
            set(value) { if(value >= 1000) this.$store.commit('UPDATE_DELAYMS', value);}
        },
        isEnabled: {
            get() { return this.$store.state.robot_cf.isEnabled },
            set(value) { this.$store.commit('UPDATE_ISENABLED', value); if(value) this.$robot.emit('network.on.checkMission');}
        },
        EnseiDelayMax: {
            get() { return this.$store.state.robot_cf.EnseiDelayMax },
            set(value) { this.$store.commit('UPDATE_ENSEIDELAYMAX', value) }
        },
        EnseiDelayMin: {
            get() { return this.$store.state.robot_cf.EnseiDelayMin },
            set(value) { this.$store.commit('UPDATE_ENSEIDELAYMIN', value) }
        },
        sortieArea1: {
            get() { return this.$store.state.robot_cf.sortieArea1 },
            set(value) { this.$store.commit('UPDATE_SORTIEAREA1', value)}
        },
        sortieArea2: {
            get() { return this.$store.state.robot_cf.sortieArea2 },
            set(value) { this.$store.commit('UPDATE_SORTIEAREA2', value)}
        },
        sortieTimes: {
            get() { return this.$store.state.robot_cf.sortieTimes },
            set(value) { this.$store.commit('UPDATE_SORTIETIMES', value) }
        },
        sortieSleepClear: {
            get() { return this.$store.state.robot_cf.sortieSleepClear },
            set(value) { this.$store.commit('UPDATE_SORTIESLEEPCLEAR', value)}
        },
        sortieFleet: {
            get() { return this.$store.state.robot_cf.sortieFleet },
            set(value) { this.$store.commit('UPDATE_SORTIEFLEET', value); this.$store.commit('UPDATE_SORTIEFLEETSTATUS', true); }
        },
        sortieFleetStatus: {
            get() { return this.$store.state.robot_cf.sortieFleetStatus },
            set(value) { this.$store.commit('UPDATE_SORTIEFLEETSTATUS', value) }
        },
        repair: {
            get() { return this.$store.state.robot_cf.repair },
            set(value) { this.$store.commit('UPDATE_REPAIR', value) }
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
            this.$store.commit('UPDATE_EXPEDITION', JSON.parse(JSON.stringify(this.Expedition)))
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
