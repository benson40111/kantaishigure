/* global  load */
import store from '../renderer/store/index.js'

class sortie{
	constructor(){
		this.load()
	}
	load = () => {
		this.battle = ({ api_data }) => {  // for normal battle
			let { api_e_maxhps , api_e_nowhps , api_f_maxhps , api_f_nowhps } = api_data
			let api_e_onDamageHps = [...api_e_nowhps]
			let api_f_onDamageHps = [...api_f_nowhps]
			let api_e_countDamage = Array(api_e_maxhps.length).fill(0)
			let api_f_countDamage = Array(api_f_maxhps.length).fill(0)
			// compute Kouku damage
			const onDamageKouku = ({api_edam, api_fdam}) => {
				for(let i = 0 ; i < api_fdam.length ; i++){
					api_f_onDamageHps[i] -= Math.round(api_fdam[i])
					api_e_onDamageHps[i] -= Math.round(api_edam[i])
				}
			}
			// compute Hougeki damage
			const onDamageHougeki = ({ api_at_eflag, api_at_list, api_df_list, api_damage }) => {
				let hougeki  = []
				for(let i = 0 ; i < api_at_list.length ; i++){
					hougeki.push({ 'eflag': api_at_eflag[i] ,'attacker': api_at_list[i] , 'defender': api_df_list[i] , 'damage': api_damage[i] })
				}
				hougeki.map( kogeki => {
					for(let x = 0 ; x < kogeki.defender.length ; x++){
						if(kogeki.eflag){  // 0 => f , 1 => enemys attack
							api_f_onDamageHps[kogeki.defender[x]] -= Math.round(kogeki.damage[x])
							api_e_countDamage[kogeki.attacker] += Math.round(kogeki.damage[x])
						} else {
							api_e_onDamageHps[kogeki.defender[x]] -= Math.round(kogeki.damage[x])
							api_f_countDamage[kogeki.attacker] += Math.round(kogeki.damage[x])
						}
					}
				})
			}
			// fydam: attack enemys damage || fdam: our fleet onDamage || eydam: attack our fleet damage || edam: enemys onDamage
			// compute Raigeki damage
			const onDamageRaigeki = ({ api_fydam , api_fdam , api_eydam , api_edam}) => {
				for(let i = 0 ; i < api_fydam.length; i++){
					if(api_f_onDamageHps[i] != undefined){
						api_f_onDamageHps[i] -= Math.round(api_fdam[i])
						api_f_countDamage[i] += Math.round(api_fydam[i])
					}
					if(api_e_onDamageHps[i] != undefined){
						api_e_onDamageHps[i] -= Math.round(api_edam[i])
						api_e_countDamage[i] += Math.round(api_eydam[i])
					}
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
			let fleet = store.getters.getFleet(Number(api_data.api_deck_id)-1)
			let nowFleet = []
			for(let i = 0 ; i < fleet.length ; i++){
				if(fleet[i] != undefined){
					nowFleet.push(Object.assign({}, fleet[i], { 
						'api_nowhp': api_f_onDamageHps[i],
						'api_originhp': api_f_nowhps[i],
						'api_damage': api_f_countDamage[i]
					}))
				}
			}
			let nowEnemy = []
			for(let i = 0; i < api_data.api_ship_ke.length; i++){
				if(api_data.api_ship_ke[i] != -1 && api_data.api_ship_ke[i] !=0 ){
					nowEnemy.push(Object.assign({},{ 
						'api_name': store.getters.find_mst_ship(api_data.api_ship_ke[i]).api_name,
						'api_maxhp': api_e_maxhps[i],
						'api_nowhp': api_e_onDamageHps[i],
						'api_originhp': api_e_nowhps[i],
						'api_damage': api_e_countDamage[i],
						'api_lv': api_data.api_ship_lv[i]
					}))
				}
			}
			let battleresult = {
				'fleet': nowFleet,
				'enemy': nowEnemy
			}
			store.commit('UPDATE_BATTLE', battleresult)
		}
		this.midnight = ({ api_data }) => { // for normal midnight battle
			if(Object.keys(store.state.api.battleresult).length){
				let { api_e_maxhps , api_e_nowhps , api_f_maxhps , api_f_nowhps } = api_data
				let api_e_onDamageHps = [...api_e_nowhps]
				let api_f_onDamageHps = [...api_f_nowhps]
				let api_e_countDamage = Array(api_e_maxhps.length).fill(0)
				let api_f_countDamage = Array(api_f_maxhps.length).fill(0)
				let battleresult = store.state.api.battleresult
				// compute Hougeki damage
				const onDamageHougeki = ({ api_at_eflag, api_at_list, api_df_list, api_damage }) => {
					let hougeki  = []
					for(let i = 0 ; i < api_at_list.length ; i++){
						hougeki.push({ 'eflag': api_at_eflag[i] ,'attacker': api_at_list[i] , 'defender': api_df_list[i] , 'damage': api_damage[i] })
					}
					hougeki.map( kogeki => {
						for(let x = 0 ; x < kogeki.defender.length ; x++){
							if(kogeki.eflag){  // 0 => f , 1 => enemys attack
								api_f_onDamageHps[kogeki.defender[x]] -= Math.round(kogeki.damage[x])
								api_e_countDamage[kogeki.attacker] += Math.round(kogeki.damage[x])
							} else {
								api_e_onDamageHps[kogeki.defender[x]] -= Math.round(kogeki.damage[x])
								api_f_countDamage[kogeki.attacker] += Math.round(kogeki.damage[x])
							}
						}
					})
				}
				if(api_data.api_hougeki) onDamageHougeki(api_data.api_hougeki)
				let fleet = battleresult.fleet
				let nowFleet = []
				for(let i = 0 ; i < fleet.length ; i++){
					if(fleet[i] != undefined){
						nowFleet.push(Object.assign({}, fleet[i], { 
							'api_nowhp': api_f_onDamageHps[i],
							'api_damage': fleet[i].api_damage + api_f_countDamage[i]
						}))
					}
				}
				let enemy = battleresult.enemy
				let nowEnemy = []
				if(enemy){
					for(let i = 0; i < enemy.length; i++){
						if(enemy[i] != undefined){
							nowEnemy.push(Object.assign({}, enemy[i],{ 
								'api_nowhp': api_e_onDamageHps[i],
								'api_damage': enemy[i].api_damage + api_e_countDamage[i],
							}))
						}
					}
				}else{
					for(let i = 0; i < api_data.api_ship_ke.length; i++){
						if(api_data.api_ship_ke[i] != -1 && api_data.api_ship_ke[i] !=0 ){
							nowEnemy.push(Object.assign({},{
								'api_name': store.getters.find_mst_ship(api_data.api_ship_ke[i]).api_name,
								'api_maxhp': api_e_maxhps[i],
								'api_nowhp': api_e_onDamageHps[i],
								'api_originhp': api_e_nowhps[i],
								'api_damage': api_e_countDamage[i],
								'api_lv': api_data.api_ship_lv[i]
							}))
						}
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
