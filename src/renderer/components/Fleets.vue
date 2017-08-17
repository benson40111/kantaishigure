<template>
	<div class="fleet-outer">
		<div class="fleet-inside">
			<tabs>
				<tab v-for="(fleet,i) in fleets" :id="i" :key="fleet.id" :name="fleet[0].fleet_name" :selected="i === 0 ? true : false">
					<div class="ship-item" v-for="ship in fleet" :key="ship.id" v-if="ship != undefined">
						<div class="ship-title">
							<div class="ship-info">
								<span class="ship-name">
									{{ ship.api_name }}
								</span>
								<span class="ship-lv">
									Lv. {{ ship.api_lv }}
								</span>
							</div>
							<div class="ship-stat"> 
								<div class="flex-content"> 
									<span class="ship-hp"> 
										{{ ship.api_nowhp }}/{{ ship.api_maxhp }} 
									</span>
									<div>
										<span class="ship-cond fa fa-star" :style="{ 'color' : ship.api_cond > 49 ? '#FFFF40' : ship.api_cond < 40 ? (ship.api_cond < 20 ? '#d7211f' : '#e37b3c') : '#FFF' }">
											{{ ship.api_cond }}
										</span>
									</div>
								</div>
								<div class="progress-hp">
									<progressbar height="10px" :max="ship.api_maxhp" :now="ship.api_nowhp"></progressbar>
								</div>
							</div>
						</div>
						<span class="ship-fb">
							<div style="flex:1">
								<progressbar height="8px" style="margin-top:10px" :max="ship.api_fuel_max" :now="ship.api_fuel"></progressbar>
							</div>
							<div style="flex:1">
								<progressbar height="8px" style="margin-top:10px" :max="ship.api_bull_max" :now="ship.api_bull"></progressbar>
							</div>
						</span>
						<div class="ship-slot">
							<div v-for="slot in ship.api_slot" :key="slot.api_id" v-if="slot != -1 && slotitemDone">
								{{ find_slot(slot).api_name }}
							</div>
						</div>
					</div>
					<div v-else>
						<br>
					</div>
					</tab>
			</tabS>
		</div>
	</div>
</template>
/*
api_lv 艦娘目前等級。
api_exp 艦娘目前經驗、下一級所需經驗。
api_nowhp 目前血量(耐久度)。
api_maxhp 最大血量。
api_slot 目前裝備，-1 代表未開放。
api_kyouka 已強化的數值。
api_backs 可搭載艦上機的數量。
api_fuel 燃料量。
api_bull 彈藥量。
api_slotnum 可用之裝備欄位。
api_cond 疲勞值。
api_karyoku 火力（かりょく），這邊開始以日文羅馬拼音命名變數。
api_raisou 雷装（らいそう）。
api_taiku 対空（たいくう）。
api_soukou 装甲（そうこう）。
api_kaihi 回避（かいひ）。
api_taisen 対潜（たいせん）。
api_sakuteki 索敵（さくてき）。
api_lucky 運（lucky），靠杯為什麼運氣就是用英文 XD (他爽啦 不然日文很長誒)
*/

<script charset="utf-8">
import tab from './models/Tab.vue'
import tabs from './models/Tabs.vue'
import progressbar from './models/Progressbar.vue'
export default {
	name: 'Fleets',
	components: { tab , tabs , progressbar },
	computed: {
		slotitemDone() {
			return this.$store.state.api.slotitem.length > 0 ? true : false
		},
		fleets() {
			return this.$store.state.api.fleet
		}
	},
	methods: {
		find_slot(id) {
			return this.$store.getters.find_slot(id)
		}
	}
}
</script>