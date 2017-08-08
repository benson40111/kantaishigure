<template>
	<div class="tab-cotent">
		<div class="tab-pane" id="fleets">
			<tabs>
					<tab v-for="(fleet,index) in fleets" :id="index" :key="fleet.id" :name="fleet[0].fleet_name" :selected="fleet === fleets[0] ? true : false">
						<div v-for="ship in fleet" :key="ship.id">
							{{ ship.api_name }} {{ ship.api_nowhp }}/{{ ship.api_maxhp }}  {{ ship.api_cond }}
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
export default {
	name: 'Fleets',
	components: { tab , tabs },
	computed: {
		fleets() {
			return this.$store.state.api.fleet
		}
	}
}
</script>
