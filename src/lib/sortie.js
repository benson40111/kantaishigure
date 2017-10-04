/* global  load */
import store from '../renderer/store/index.js'

class sortie{
	constructor(){
		this.load()
	}
	load = () => {
		this.battle = ({ api_data }) => {  // for normal battle
			let { api_maxhps, api_nowhps } = api_data
			let api_onDamageHps = [...api_nowhps] 
			let api_countDamage = Array(api_maxhps.length).fill(0)
			// compute Kouku damage
			const onDamageKouku = ({api_edam, api_fdam}) => {
				for(let i = 1 ; i < api_fdam.length ; i++){
					api_onDamageHps[i] -= Math.round(api_fdam[i])
					api_onDamageHps[6+i] -= Math.round(api_edam[i])					
				}
			}
			// compute Hougeki damage
			const onDamageHougeki = ({ api_at_list , api_df_list , api_damage }) => {
				let hougeki  = []
				for(let i = 1 ; i < api_at_list.length ; i++){
					hougeki.push({'attacker' : api_at_list[i] , 'defender': api_df_list[i] , 'damage': api_damage[i] })
				}
				hougeki.map( kogeki => {
					for(let x = 0 ; x < kogeki.defender.length ; x++){
						api_onDamageHps[kogeki.defender[x]] -= Math.round(kogeki.damage[x])
						api_countDamage[kogeki.attacker] += Math.round(kogeki.damage[x])
					}
				})
			}
			// fydam: attack enemys damage || fdam: our fleet onDamage || eydam: attack our fleet damage || edam: enemys onDamage
			// compute Raigeki damage
			const onDamageRaigeki = ({ api_fydam , api_fdam , api_eydam , api_edam}) => {
				for(let i = 1 ; i < api_fydam.length; i++){
					api_onDamageHps[i] -= Math.round(api_fdam[i])
					api_countDamage[i] += Math.round(api_fydam[i])
					api_onDamageHps[6+i] -= Math.round(api_edam[i])
					api_countDamage[6+i] += Math.round(api_eydam[i])
				}
			}
			// hougeki
			let battle_key = ["api_hougeki1", "api_hougeki2", "api_hougeki3", "api_hougeki" , "api_opening_taisen"]
			battle_key.map( x => {
				if(api_data[x]) onDamageHougeki(api_data[x])
			})
			// raigeki
			let raigeki_key = ["api_raigeki", "api_opening_atack"]
			raigeki_key.map( x => {
				if(api_data[x]) onDamageRaigeki(api_data[x])
			})
			// Kouku
			if(api_data['api_kouku'] && api_data['api_kouku']['api_stage3']){
				onDamageKouku(api_data.api_kouku.api_stage3)
			}
			let fleet = store.getters.getFleet(Number(api_data.api_dock_id)-1)
			let nowFleet = []
			for(let i = 0 ; i < fleet.length ; i++){
				if(fleet[i] != undefined){
					nowFleet.push(Object.assign({}, fleet[i], { 
						'api_nowhp': api_onDamageHps[i+1],
						'api_originhp': api_nowhps[i+1],
						'api_damage': api_countDamage[i+1]
					}))
				}
			}
			let nowenemy = []
			for(let i = 1; i < api_data.api_ship_ke.length; i++){
				if(api_data.api_ship_ke[i] != -1 && api_data.api_ship_ke[i] !=0 ){
					nowenemy.push(Object.assign({},{ 
						'api_name': store.getters.find_mst_ship(api_data.api_ship_ke[i]).api_name,
						'api_maxhp': api_maxhps[6+i],
						'api_nowhp': api_onDamageHps[6+i],
						'api_originhp': api_nowhps[6+i],
						'api_damage': api_countDamage[6+i],
						'api_lv': api_data.api_ship_lv[i]
					}))
				}
			}
			let battleresult = {
				'fleet': nowFleet,
				'enemy': nowenemy
			}
			store.commit('UPDATE_BATTLE', battleresult)
		}
		this.midnight = ({ api_data }) => { // for normal midnight battle
			if(Object.keys(store.state.api.battleresult).length){
				let { api_maxhps, api_nowhps } = api_data
				let api_onDamageHps = [...api_nowhps]
				let api_countDamage = Array(api_maxhps.length).fill(0)
				let battleresult = store.state.api.battleresult
				// hougeki
				const onDamageHougeki = ({ api_at_list , api_df_list , api_damage }) => {
					let hougeki  = []
					for(let i = 1 ; i < api_at_list.length ; i++){
						hougeki.push({'attacker' : api_at_list[i] , 'defender': api_df_list[i] , 'damage': api_damage[i] })
					}
					hougeki.map( kogeki => {
						for(let x = 0 ; x < kogeki.defender.length ; x++){
							api_onDamageHps[kogeki.defender[x]] -= Math.round(kogeki.damage[x])
							api_countDamage[kogeki.attacker] += Math.round(kogeki.damage[x])
						}
					})
				}
				if(api_data.api_hougeki) onDamageHougeki(api_data.api_hougeki)
				let fleet = battleresult.fleet
				let nowFleet = []
				for(let i = 0 ; i < fleet.length ; i++){
					if(fleet[i] != undefined){
						nowFleet.push(Object.assign({}, fleet[i], { 
							'api_nowhp': api_onDamageHps[i+1],
							'api_damage': fleet[i].api_damage + api_countDamage[i+1]
						}))
					}
				}
				let enemy = battleresult.enemy
				let nowEnemy = []
				for(let i = 0; i < enemy.length; i++){
					if(enemy[i] != undefined){
						nowEnemy.push(Object.assign({}, enemy[i],{ 
							'api_nowhp': api_onDamageHps[7+i],
							'api_damage': enemy[i].api_damage + api_countDamage[7+i],
						}))
					}
				}
				let midnightbattleresult = {
					'fleet': nowFleet,
					'enemy': nowEnemy
				}
				store.commit('UPDATE_BATTLE', midnightbattleresult)
			} else {
				this.battle({ api_data : api_data })
			}
		}
		this.next = () => { // clear battleresult
			store.commit('UPDATE_BATTLE', {'fleet': store.getters.getFleet(0)})
		}
		this.result = ({api_data}) => {
			// save result
			let result = { 
				api_win_rank : api_data.api_win_rank,
				api_mvp: api_data.api_mvp,
				api_get_ship: api_data.api_get_ship ? api_data.api_get_ship.api_ship_name : undefined
			}
			store.commit('UPDATE_BATTLERESULT', result)
		}
	}
}


export default new sortie()
