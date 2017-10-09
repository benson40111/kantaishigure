/*global init*/
import EventEmitter from 'events'
import store from '../renderer/store/index.js'
import position from './position.js'

const delay = (time = 3000) => {
	return new Promise( resolve => {
		setTimeout( () => { resolve()} , time)
	})
}
const checkDamage = (fleet, range) => {
	return fleet.map( ship => 
		ship ? (ship.api_nowhp*100/ship.api_maxhp) <= (range+1) * 25 ? true : false : false
	).includes(true) ? 1 : 0 // 1 return 0 keep
}

const checkRepair = (fleet, range) => {
	let findScnt = (id) => store.state.api.mst_stype.find( x => Number(x.api_id) == Number(id)).api_scnt
	let repair = fleet.map( ship => 
		ship ? (ship.api_nowhp*100/ship.api_maxhp) <= (range+1) * 25 ? ship : false : false
	)
	repair = repair.filter( x => x )
	if(repair.length == 0 ){ return false }
	repair = repair.map( ship => {
		let hp_loss = ship.api_maxhp - ship.api_nowhp
		let base_repair
		if(ship.api_lv > 11){
			base_repair = ship.api_lv * 5 + (Math.floor(Math.sqrt(ship.api_lv - 11)))*10 + 50
		} else {
			base_repair = ship.api_lv * 10
		}
		let scnt = findScnt(ship.api_stype)/2.0
		return [ ship.api_id , hp_loss * scnt * base_repair +30 ]
	})
	return repair.sort( (x,y) => x[1] - y[1])
}

const checkNdock = () => {
	return store.state.api.ndock.map( x => {
		switch(Number(x.api_state)){
			case -1:
				return false
			case 0:
				return true
			case 1:
				if(x.api_complete_time - (new Date().getTime()) > 0){
					return false
				} else {
					return true
				}
			default:
				return false
		}
	})
}


class Robot extends EventEmitter {
	constructor() {
		super()
		this.init()
		this.Expedition()
		this.base()
	}
	init = () => {
		this.isStart = true
		this.isActive = false
		this.isSleep = false
		this.isEnsei = false
		this.waitCond = false
		this.isSortie = false
		this.isReload = true
		this.isCheckMission = false
		this.needRefreshPort = false
		this.sortieFleetStatus = () => store.state.robot_cf.sortieFleetStatus		
		this.isEnable = () => store.state.robot_cf.isEnabled
		this.isSortieEnable = () => store.state.robot_cf.Sortie
		// waiting active
		this.waitActive = () => {
			return new Promise ( async promise_resolve => {
				if(this.isActive){
					await new Promise ( () => setTimeout( async () => { promise_resolve(await this.waitActive())}, 5000))
				} else {
					promise_resolve(false)
				}
			})
		}
		// waiting expedition
		this.waitEnsei = () => {
			return new Promise ( async promise_resolve => {
				if(this.isEnsei){
					await new Promise ( () => setTimeout( async () => { promise_resolve(await this.waitEnsei())}, 5000))
				} else {
					promise_resolve(false)
				}
			})
		}
		// waiting sortie
		this.waitSortie = () => {
			return new Promise ( async promise_resolve => {
				if(this.isSortie){
					await new Promise ( () => setTimeout( async () => { promise_resolve(await this.waitSortie())}, 5000))
				} else {
					promise_resolve(false)
				}
			})
		}
		this.Delayms = (time = store.state.robot_cf.Delayms) => Math.floor(Math.random()*(-time*0.1,time*0.1)+time)
		this.ExpeditionDelayTime = (max = store.state.robot_cf.EnseiDelayMax, min = store.state.robot_cf.EnseiDelayMin) => Math.floor(Math.random()*(Math.abs(max-min)) + min)*60000
		// timer for robot
		this.timer = async ({HH,mm,ss} = store.state.robot_cf.sleepTime, end = store.state.robot_cf.sleepEnd ) => {
			let sleepStart = (new Date()).setHours(Number(HH),Number(mm),Number(ss))
			let sleepEnd = (new Date()).setHours(Number(end.HH),Number(end.mm),Number(end.ss))
			let now = (new Date().getTime())
			if( now > sleepStart && now < sleepEnd){
				// in sleeping time
				this.isSleep = true
				if(!store.state.robot_cf.sortieFleetStatus){
					store.commit('UPDATE_SORTIEFLEETSTATUS', true)					
				}
				if(this.isEnable() && this.isSortieEnable() && store.state.robot_cf.sortieSleepClear && store.state.api.battleresult.fleet[1] && this.isStart){
					this.isStart = false
					await this.waitActive()
					await this.waitSortie()
					await this.waitEnsei()
					await this.AutoRun('clearFleet')
					this.isStart = true
				}
			} else {
				this.isSleep = false
				if(this.isEnable() && !this.isReload && this.isStart){
					if(this.needRefreshPort) { await this.AutoRun('refreshPort'); this.needRefreshPort = false }
					if(this.isSortieEnable() && !this.waitCond) { this.startSortie() }
				}
			}
		}
		// simulate a mouse click
		this.PromiseMoveClick = ([x,y], delay = this.Delayms()) => {
			return new Promise ( async resolve => {
				if(this.isEnable() && !this.isReload){
					setTimeout( () => {
						document.querySelector('webview').sendInputEvent({type:'mouseDown', x:x, y: y, button:'left', clickCount: 1})
						document.querySelector('webview').sendInputEvent({type:'mouseUp', x:x, y: y, button:'left', clickCount: 1});
						resolve()
					}, delay)
				} else {
					resolve()
				}
			})
		}
		// robot automate script
		this.AutoRun = (target, num) => {
			return new Promise ( async resolve => {
				if(this.isReload || !this.isEnable()){
					resolve()
					return
				}
				await this.waitActive()
				this.isActive = true
				let isWait = true
				let wait = (retries = 20, callback = () => true ) => {
					return new Promise ( async promise_resolve => {
						// robot disable
						if(!this.isEnable()){
							promise_resolve(false)
						} else if(retries == 0) {
							// retries failed , reload webview
							document.querySelector('webview').reload()
							this.isReload = true
							promise_resolve(true)
						} else if(isWait){
							// exec callback and delay 2s then retry
							await new Promise ( () => { callback(); setTimeout( async () => { promise_resolve(await wait(retries-1, callback))}, 2000 )})                        
						} else {
							promise_resolve(false)
						}
					})
				}
				switch(target){
					case 'refreshPort':
						this.once('network.on.port', () => isWait = false)
						await this.PromiseMoveClick(position.Sortie())
						await this.PromiseMoveClick(position.Port())
						if(await wait()) {
							this.isActive = false
							this.removeAllListeners('network.on.port')
							resolve()
							break
						}
						this.isActive = false
						await this.PromiseMoveClick(position.mainExpedition(), 1000)
						await delay()
						resolve()
						break
					case 'mainExpedition':
						this.once('network.on.mission', () => isWait = false)
						await delay()
						await this.PromiseMoveClick(position.Sortie())
						await this.PromiseMoveClick(position.mainExpedition())
						await wait()
						this.removeAllListeners('network.on.mission')
						this.isActive = false						
						resolve()
						break
					case 'startExpedition':
						this.once('network.on.missionStart', () => isWait = false)
						var Expedition = store.state.robot_cf.Expedition
						await this.PromiseMoveClick(position.RowExpedition[Math.floor(Expedition[num].id/8)](), 1000)
						await this.PromiseMoveClick(position.ColumnExpedition[Expedition[num].id%8](), 1000)
						await this.PromiseMoveClick(position.ConfirmExpedition[0](), 1000)
						await this.PromiseMoveClick(position.fleetExpedition[num](), 1000)
						await this.PromiseMoveClick(position.ConfirmExpedition[1]())
						await wait()
						this.isActive = false
						resolve()
						break
					case 'supply':
						var needSupply = store.getters.needSupplys()
						if(needSupply.includes(true)){
							await this.PromiseMoveClick(position.Supply())
							await delay()
							for(let i = 0; i < needSupply.length ; i++){
								isWait = true
								if(needSupply[i]){
									this.once('network.on.charge', () => isWait = false)
									await this.PromiseMoveClick(position.FleetSupply[i]())
									await this.PromiseMoveClick(position.FleetSupply[i](), 1000)
									if(await wait(10, () => this.PromiseMoveClick(position.FullSupply(), 1000) )) {
										this.isActive = false
										this.removeAllListeners('network.on.charge')
										resolve()
										break
									}
									this.removeAllListeners('network.on.charge')									
									await delay()
								}
							}
							isWait = true
							this.once('network.on.port', () =>  isWait = false )
							await this.PromiseMoveClick(position.Port())
							if(await wait()) {
								this.isActive = false
								this.removeAllListeners('network.on.port')								
								resolve()
								break
							}
							this.isActive = false
							await this.PromiseMoveClick(position.mainExpedition())
							await delay(3000)
							resolve()
							break
						}
						this.isActive = false												
						resolve()
						break
					case 'startSortie':
						this.once('network.on.mapinfo', () => isWait = false)
						await this.PromiseMoveClick(position.Sortie())
						await this.PromiseMoveClick(position.mainSortie())
						if(await wait()) {
							this.isActive = false
							this.removeAllListeners('network.on.mapinfo')
							resolve()
							break
						}
						this.removeAllListeners('network.on.mapinfo')						
						isWait = true
						this.once('network.on.sortieStart', () => isWait = false)						
						var area1 = store.state.robot_cf.sortieArea1
						var area2 = store.state.robot_cf.sortieArea2
						await this.PromiseMoveClick(position.RowSortie[area1]())
						if(area2 > 3){
							await this.PromiseMoveClick(position.ColumnSortie[4]())
							if(area2 == 4){
								await this.PromiseMoveClick(position.ColumnSortie[1]())
							} else {
								await this.PromiseMoveClick(position.ColumnSortie[3]())
							}
						} else {
							await this.PromiseMoveClick(position.ColumnSortie[area2]())
						}
						await this.PromiseMoveClick(position.ConfirmSortie[0]())
						await this.PromiseMoveClick(position.ConfirmSortie[1]())
						if(await wait()) {
							this.isActive = false
							this.removeAllListeners('network.on.sortieStart')
							resolve()
							break
						}
						this.removeAllListeners('network.on.sortieStart')						
						this.isActive = false
						resolve()
						break
					case 'sortieFleet':
						var fleet = store.state.robot_cf.sortieFleet
						this.once('network.on.preset_deck', () => isWait = false)
						if(await wait(20, () => this.PromiseMoveClick(position.Organize(), 1000) )) {
							this.isActive = false
							this.removeAllListeners('network.on.preset_deck')
							resolve(false)
							break
						}
						this.removeAllListeners('network.on.preset_deck')
						await delay()
						isWait = true
						this.once('network.on.preset_select', () => isWait = false)
						await this.PromiseMoveClick(position.fleetUnfolded())
						await this.PromiseMoveClick(position.ColumnUnfolded[fleet]())
						if(await wait()) {
							this.isActive = false
							this.removeAllListeners('network.on.preset_select')
							resolve(false)
							break
						}
						this.removeAllListeners('network.on.preset_select')						
						isWait = true
						this.once('network.on.port', () => isWait = false)
						await this.PromiseMoveClick(position.Port())
						if(await wait()) {
							this.isActive = false
							this.removeAllListeners('network.on.port')							
							resolve(false)
							break
						}
						this.isActive = false
						await this.PromiseMoveClick(position.mainExpedition())
						await delay()
						resolve(true)
						break
					case 'clearFleet':
						this.once('network.on.preset_deck', () => isWait = false)
						await this.PromiseMoveClick(position.Organize())
						if(await wait()) {
							this.isActive = false
							this.removeAllListeners('network.on.preset_deck')
							resolve(false)
							break
						}
						this.removeAllListeners('network.on.preset_deck')						
						isWait = true
						this.once('network.on.change', () => isWait = false)
						if(await wait(10, () => this.PromiseMoveClick(position.clearFleet(), 1000))){
							this.isActive = false
							this.removeAllListeners('network.on.change')
							resolve(false)
							break
						}
						this.removeAllListeners('network.on.change')						
						isWait = true
						this.once('network.on.port', () => isWait = false)
						await this.PromiseMoveClick(position.Port())
						if(await wait()) {
							this.isActive = false
							this.removeAllListeners('network.on.port')							
							resolve(false)
							break
						}
						this.isActive = false
						await this.PromiseMoveClick(position.mainExpedition())
						resolve(true)
						break
					case 'sortieBattle':
						var port = false
						if(checkDamage(store.state.api.battleresult.fleet, store.state.robot_cf.returnPort)){
							document.querySelector('webview').reload()
							this.isReload = true
							break
						}
						this.once('network.on.port', () => { isWait = false; port = true; })
						this.once('network.on.sortieBattle', () => isWait = false)
						if(await wait(50, () => this.PromiseMoveClick(position.SortieFormation[store.state.robot_cf.Formation](), 1000))) {
							this.isActive = false
							this.removeAllListeners('network.on.port')
							this.removeAllListeners('network.on.sortieBattle')
							resolve()
							break
						}
						this.removeAllListeners('network.on.sortieBattle')
						if(port){
							this.isActive = false							
							resolve()
							break
						}
						isWait = true
						var in_midnight = false
						this.once('network.on.sortieMidnight', () => {isWait = false; in_midnight = true})
						this.once('network.on.sortieResult', () => isWait = false)
						var midnight = store.state.robot_cf.SortieMidnight ? 1 : 0
						await wait(200, () => this.PromiseMoveClick(position.SortieLeftRight[midnight](), 1000))
						this.removeAllListeners('network.on.sortieMidnight')
						this.removeAllListeners('network.on.sortieResult')
						if(in_midnight){
							isWait = true
							this.once('network.on.sortieResult', () => isWait = false)
							await wait(100, () => this.PromiseMoveClick(position.SortieLeftRight[midnight](), 1000))
							this.removeAllListeners('network.on.sortieResult')
						}
						this.isActive = false
						resolve()
						break
					case 'sortieResult':
						this.once('network.on.port', () => isWait = false)
						this.once('network.on.sortieNext', () => isWait = false)
						var AtteckReturn = checkDamage(store.state.api.battleresult.fleet, store.state.robot_cf.returnPort)				
						AtteckReturn = num >= store.state.robot_cf.sortieTimes ? 1 : AtteckReturn
						if(await wait(50, () => this.PromiseMoveClick(position.SortieLeftRight[AtteckReturn](), 1000))){
							this.removeAllListeners('network.on.port')
						}
						this.removeAllListeners('network.on.sortieNext')
						this.isActive = false
						resolve()
						break
					case 'docking':
						var dock = checkNdock()
						if(dock.includes(true)){
							var repair = checkRepair(store.state.api.battleresult.fleet, store.state.robot_cf.repair)
							if(repair && this.isEnable()){
								this.once('network.on.ndock', () => isWait = false)
								await this.PromiseMoveClick(position.Dock())
								if(await wait()){
									this.isActive = false
									this.removeAllListeners('network.on.ndock')
									resolve()
									break
								}
								this.removeAllListeners('network.on.ndock')								
								dock = dock.map((x,i) => x ? String(i) : false).filter(x => x)
								var ship = store.state.api.ship	
								var end = Math.ceil(ship.length/10)
								var firstDock = true
								for(let id in repair){
									var dockIndex = dock.shift()
									if(dockIndex && store.state.api.ndock.findIndex(x => x.api_ship_id == repair[id][0]) == -1){
										await this.PromiseMoveClick(position.ColumnDock[dockIndex]())
										if(firstDock){
											await this.PromiseMoveClick(position.dockType(), 800)
											await this.PromiseMoveClick(position.dockType(), 800)
											await this.PromiseMoveClick(position.dockType(), 800)
											firstDock = false
										} else {
											await this.PromiseMoveClick(position.DockPage[0](), 800)
										}
										var isfastRepair = false
										var index = ship.findIndex( x => Number(x.api_id) == Number(repair[id][0]))+1
										index = (ship.length - index)
										for(let i = 0 ; i < Math.floor(index/10); i++){
											if(i+2 == end){
												await this.PromiseMoveClick(position.DockPage[5](), 800)
												break
											} else if(i == 0){
												await this.PromiseMoveClick(position.DockPage[2](), 800)									
											} else if(i == 1){
												await this.PromiseMoveClick(position.DockPage[3](), 800)																			
											} else {
												await this.PromiseMoveClick(position.DockPage[4](), 800)
											}
										}
										await this.PromiseMoveClick(position.ColumnShip[index%10]())
										if(store.state.robot_cf.fastRepair && store.state.robot_cf.fastRepairTime*60 < repair[id][1] && store.state.api.resource[5].api_value){
											await this.PromiseMoveClick(position.dockBucket[0]())
											dock.push(dockIndex)
											isfastRepair = true
										}
										isWait = true
										this.once('network.on.dockStart', () => isWait = false)
										await this.PromiseMoveClick(position.ConfirmDock[0]())
										await this.PromiseMoveClick(position.ConfirmDock[1]())
										if(await wait()){
											this.isActive = false
											this.removeAllListeners('network.on.dockStart')
											resolve()
											break
										}
										this.removeAllListeners('network.on.dockStart')										
										if(isfastRepair) { 
											await delay(10000)
										} else {
											setTimeout( async () => {
												if(this.isEnable() && !this.isActive && !this.isEnsei && !this.isSleep){
													await this.AutoRun('refreshPort')
												}
											}, repair[id][1]*1000)
										}
									}
								}
								isWait = true
								this.once('network.on.port', () => isWait = false)
								await this.PromiseMoveClick(position.Port())
								if(await wait()){
									this.isActive = false
									this.removeAllListeners('network.on.port')									
									resolve()
									break
								}
								this.isActive = false
								await this.PromiseMoveClick(position.mainExpedition())
								await delay()
								resolve()
								break
							}
						}
						this.isActive = false
						resolve()
						break
					default:
						this.isActive = true
						resolve()
				}
			})
		}
		this.Expedition = () => {
			let ensei = []
			let ensei_timeout = []
			let Expedition_list = () => store.state.robot_cf.Expedition
			const startMission = async () => {
				// run expeditions
				if(!this.isEnsei && ensei.length){
					this.isEnsei = true
					await this.waitActive()
					await this.waitSortie()
					await this.AutoRun('supply')
					if(this.isActive){
						this.isEnsei = false
						return
					}
					await this.AutoRun('mainExpedition')
					let e
					while((e = ensei.shift()) >=0 ){
						if(Expedition_list()[e].enable){
							await this.AutoRun('startExpedition',e)
							if(!this.isReload && this.isEnable()){
								await delay(6000)
							}
						}
					}
					this.isEnsei = false
					await this.PromiseMoveClick(position.Port(),2000)
					await this.PromiseMoveClick(position.mainExpedition())
				}
			}
			const missionReturn = () => {
				// check expedition return if has the next one
				return new Promise( async resolve => {
					this.isActive = true
					let hasNext = false
					this.once('network.on.missionReturnCheck', () => hasNext = true )
					await this.PromiseMoveClick(position.mainExpedition(),10000)
					for(let i = 0 ; i < 5 ; i++){
						await this.PromiseMoveClick(position.mainExpedition(),1000)
					}
					if(!hasNext) {
						this.isActive = false
						this.emit('network.on.checkMission')
						this.removeAllListeners('network.on.missionReturnCheck')						
					}
					resolve()
				})
			}
			this.on('network.on.checkMission',async () => {
				// check expedition and start
				if(this.isEnable() && !this.isCheckMission){
					this.isCheckMission = true
					await this.waitActive()
					await this.waitEnsei()
					ensei = []
					ensei_timeout.map(x => clearTimeout(x))
					store.state.api.mission.map( (e, i) => {
						if( e && e[2] != 0 && Expedition_list()[i].enable){
							this.emit('network.on.missionStart', e[2],i)
						} else if(e && e[2] == 0 && Expedition_list()[i].enable){
							ensei.push(i)
						}
					})
					await delay()
					if(ensei.length && this.isEnable()) await startMission()
					this.isCheckMission = false
				}
			})
			this.on('network.on.missionStart', (time,i) => {
				// when expedition start, set a timeout to refresh port
				ensei_timeout[i] = setTimeout( async () => {
					if(this.isEnable()){
						if(this.isSleep) {
							this.needRefreshPort = true
						}
						else if(this.isEnable() && !this.isActive && !this.isEnsei && !this.isSleep && !this.isSortie){
							await this.AutoRun('refreshPort')
						}
					}
				}, (Number(time) -(new Date()).getTime() + this.ExpeditionDelayTime()))
			})
			this.on('network.on.missionReturn', () => {
				if(this.isEnable()){
					this.emit('network.on.missionReturnCheck')
					missionReturn()
				}
			})
			this.on('network.on.checkNdock', () => {
				// check docking and set a timeout to refresh port
				let time = store.state.api.ndock.map( x => x.api_complete_time).filter(x => x)
				time.map( x => {
					setTimeout( async () => {
						if(this.isEnable() && !this.isActive && !this.isEnsei && !this.isSleep && !this.isSortie){
							await this.AutoRun('refreshPort')
						}
					}, x - (new Date().getTime()))
				})
			})
		}
		this.on('network.on.start', async () => {
			// when start reset all flag
			this.isReload = false
			this.isActive = false
			this.isEnsei = false
			this.waitCond = false
			this.isSortie = false
			this.isStart = false
			store.commit('UPDATE_SORTIEFLEETSTATUS', true)			
			if(this.isEnable()){
				this.once('network.on.port', async () => {
					await delay(1000)
					await this.PromiseMoveClick(position.mainExpedition(), 1000)
					await delay()
					this.isStart = true
					this.emit('network.on.checkMission')
					this.emit('network.on.checkNdock')
				})
				await delay()
				await this.PromiseMoveClick(position.Start())
			} else {
				this.isStart = true
			}
		})
		this.base = () => {
			this.startSortie = async () => {
				// run sortie script
				if(!this.isSortie && !this.isEnsei && !this.waitCond && !this.isActive){
					this.isSortie = true
					await this.waitActive()
					if(this.sortieFleetStatus()){
						if(await this.AutoRun('sortieFleet')){
							store.commit('UPDATE_SORTIEFLEETSTATUS', false)
							await this.waitActive()
						}
					}
					if(store.getters.needSupplys().includes(true)){
						await this.AutoRun('supply')
					}
					await this.waitActive()
					if(await this.docking()){
						return
					}
					if(store.state.robot_cf.waitCond){
						let cond = store.state.api.battleresult.fleet.filter( x => x).map( x => x.api_cond)
						cond = cond.filter( x => x < store.state.robot_cf.Cond).sort( (x,y) => x-y)
						if(cond.length){
							this.waitCond = true
							setTimeout( async () => {
								this.waitCond = false
								if(this.isEnable() && !this.isActive && !this.isEnsei && !this.isSleep && !this.isSortie){
									await this.AutoRun('refreshPort')
									this.startSortie()
								}
							}, (store.state.robot_cf.Cond - cond[0])*60*1000)
							this.isSortie = false
							return
						}
					}
					await this.AutoRun('startSortie')
					let port = false
					this.once('network.on.port', () => port = true)
					for(let i = 0 ; i < store.state.robot_cf.sortieTimes ; i++){
						if(port) break
						await this.AutoRun('sortieBattle')
						if(port) break						
						await this.AutoRun('sortieResult', i+1)
					}
					this.removeAllListeners('network.on.port')
					await delay(6000)
					this.PromiseMoveClick(position.mainExpedition(),1000) //check expedition return
					await delay(6000)
					await this.waitActive()
					await this.AutoRun('supply')
					await this.waitActive()
					await this.docking()
					this.isSortie = false
				}
			}
			this.docking = () => {
				return new Promise( async resolve => {
					// docking first fleet
					let fleet = store.state.api.battleresult.fleet
					let repair_config = store.state.robot_cf.repair
					let repair = checkRepair(fleet, repair_config)
					// need repair
					if(repair){
						let needDock = false
						let dock = checkNdock()
						if(dock.includes(true)){
							repair.map( id => {
								store.state.api.ndock.findIndex(x => x.api_ship_id == id[0]) == -1 ? needDock = true : false
							})
						}
						if(needDock){
							await delay()
							await this.AutoRun('docking')
						}
						await this.waitActive()
						this.isSortie = false
						resolve(true)
					} else {
						// Is ship already in ndock 
						let dock = checkNdock()
						let fleet_id = fleet.map( ship => ship ? ship.api_id : undefined ).filter( x => x)
						if(dock.includes(false)){
							for(let i = 0; i < dock.length; i++){
								if(!dock[i]){
									if(fleet_id.includes(store.state.api.ndock[i].api_ship_id)){
										resolve(true)
										this.isSortie = false
										return
									}
								}
							}
							resolve(false)
						} else {
							resolve(false)							
						}
					}
				})
			}
		}
		window.setInterval( () => this.timer(), 120000 )
	}
}



export default new Robot()