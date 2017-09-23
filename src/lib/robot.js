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
		ship ? (ship.api_nowhp*100/ship.api_maxhp) < (range+1) * 25 ? true : false : false
	).includes(true) ? 1 : 0 // 1 return 0 keep
}

const checkRepair = (fleet, range) => {
	let findScnt = (id) => store.state.api.mst_stype.find( x => Number(x.api_id) == Number(id)).api_scnt
	let repair = fleet.map( ship => 
		ship ? (ship.api_nowhp*100/ship.api_maxhp) < (range+1) * 25 ? ship : false : false
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
				if((new Date().getTime()) - x.api_complete_time > 0){
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
		this.isActive = false
		this.isSleep = false
		this.isEnsei = false
		this.waitCond = false
		this.isSortie = false
		this.sortieFleet = true
		this.isReload = true
		this.needRefreshPort = false
		this.isEnable = () => store.state.robot_cf.isEnabled
		this.isSortieEnable = () => store.state.robot_cf.Sortie
		this.waitActive = () => {
			return new Promise ( async promise_resolve => {
				if(this.isActive){
					await new Promise ( () => setTimeout( async () => { promise_resolve(await this.waitActive())}, 5000))                        
				} else {
					promise_resolve(false)
				}
			})
		}
		this.waitEnsei = () => {
			return new Promise ( async promise_resolve => {
				if(this.isEnsei){
					await new Promise ( () => setTimeout( async () => { promise_resolve(await this.waitEnsei())}, 5000))                        
				} else {
					promise_resolve(false)
				}
			})
		}
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
		this.timer = async ({HH,mm,ss} = store.state.robot_cf.sleepTime, end = store.state.robot_cf.sleepEnd ) => {
			let sleepStart = (new Date()).setHours(Number(HH),Number(mm),Number(ss))
			let sleepEnd = (new Date()).setHours(Number(end.HH),Number(end.mm),Number(end.ss))
			let now = (new Date().getTime())
			if( now > sleepStart && now < sleepEnd){
				this.isSleep = true
				if(this.isEnable() && this.isSortieEnable() && store.state.robot_cf.sortieSleepClear && store.state.api.battleresult.fleet.length>1){
					await this.waitActive()
					await this.waitSortie()
					await this.waitEnsei()
					this.sortieFleet = true
					await this.AutoRun('clearFleet')
				}
			} else {
				this.isSleep = false
				if(this.isEnable() && !this.isReload){
					if(this.needRefreshPort) { await this.AutoRun('refreshPort'); this.needRefreshPort = false }
					if(this.isSortieEnable() && !this.waitCond) { this.startSortie() }
				}
			}
		}
		this.PromiseMoveClick = ([x,y], time = this.Delayms()) => {
			return new Promise ( async resolve => {
				if(this.isEnable() && !this.isReload){
					setTimeout( async () => {
						await document.querySelector('webview').sendInputEvent({type:'mouseDown', x:x, y: y, button:'left', clickCount: 1})
						await document.querySelector('webview').sendInputEvent({type:'mouseUp', x:x, y: y, button:'left', clickCount: 1});
						resolve()
					}, time)
				} else {
					resolve()
				}
			})
		}
		this.AutoRun = (target, num) => {
			return new Promise ( async resolve => {
				if(this.isReload || !this.isEnable()){
					resolve()
					return
				}
				await this.waitActive()
				this.isActive = true
				let isWait = true
				let wait = (time = 20, callback = () => true ) => {
					return new Promise ( async promise_resolve => {
						if(time == 0) {
							document.querySelector('webview').reload()
							this.isReload = true
							promise_resolve(true)
						}
						else if(isWait){
							await new Promise ( () => setTimeout( async () => { callback();promise_resolve(await wait(time-1, callback))}, 2000))                        
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
							resolve()
							break
						}
						await this.PromiseMoveClick(position.mainExpedition())
						this.isActive = false
						resolve()
						break
					case 'mainExpedition':
						this.once('network.on.mission', () => isWait = false)
						await delay()
						await this.PromiseMoveClick(position.Sortie())
						await this.PromiseMoveClick(position.mainExpedition())
						await wait()
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
							await delay()
							await this.PromiseMoveClick(position.Supply())
							for(let i = 0; i < needSupply.length ; i++){
								isWait = true
								if(needSupply[i]){
									this.once('network.on.charge', () => isWait = false)
									await this.PromiseMoveClick(position.FleetSupply[i]())
									await this.PromiseMoveClick(position.FullSupply())
									if(await wait()) {
										this.isActive = false
										resolve()
										break
									}
								}
							}
							isWait = true
							this.once('network.on.port', () =>  isWait = false )
							await this.PromiseMoveClick(position.Port())
							if(await wait()) {
								this.isActive = false
								resolve()
								break
							}
							this.isActive = false
							await this.PromiseMoveClick(position.mainExpedition())
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
							resolve()
							break
						}
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
							resolve()
							break
						}
						this.isActive = false												
						resolve()
						break
					case 'sortieFleet':
						var fleet = store.state.robot_cf.sortieFleet
						this.once('network.on.preset_deck', () => isWait = false)
						await this.PromiseMoveClick(position.Organize())
						if(await wait()) {
							this.isActive = false
							resolve(false)
							break
						}
						isWait = true
						this.once('network.on.preset_select', () => isWait = false)
						await this.PromiseMoveClick(position.fleetUnfolded())
						await this.PromiseMoveClick(position.ColumnUnfolded[fleet]())
						if(await wait()) {
							this.isActive = false
							resolve(false)
							break
						}
						isWait = true
						this.once('network.on.port', () => isWait = false)
						await this.PromiseMoveClick(position.Port())
						if(await wait()) {
							this.isActive = false
							resolve(false)
							break
						}
						this.isActive = false
						await this.PromiseMoveClick(position.mainExpedition())
						resolve(true)
						break
					case 'clearFleet':
						this.once('network.on.preset_deck', () => isWait = false)
						await this.PromiseMoveClick(position.Organize())
						if(await wait()) {
							this.isActive = false
							resolve(false)
							break
						}
						isWait = true
						this.once('network.on.change', () => isWait = false)
						if(await wait(10, () => this.PromiseMoveClick(position.clearFleet()))){
							this.isActive = false
							resolve(false)
							break
						}
						isWait = true
						this.once('network.on.port', () => isWait = false)
						await this.PromiseMoveClick(position.Port())
						if(await wait()) {
							this.isActive = false
							resolve(false)
							break
						}
						this.isActive = false
						await this.PromiseMoveClick(position.mainExpedition())
						resolve(true)
						break
					case 'sortieBattle':
						if(checkDamage(store.state.api.battleresult.fleet, store.state.robot_cf.returnPort)){
							document.querySelector('webview').reload()
							this.isReload = true
							break
						}
						this.once('network.on.sortieBattle', () => isWait = false)
						if(await wait(30, () => this.PromiseMoveClick(position.SortieFormation[store.state.robot_cf.Formation]()))) {
							this.isActive = false
							resolve()
							break
						}
						isWait = true
						this.once('network.on.sortieMidnight', () => isWait = false)
						this.once('network.on.sortieResult', () => isWait = false)
						var midnight = store.state.robot_cf.SortieMidnight ? 1 : 0
						if(await wait(100, () => this.PromiseMoveClick(position.SortieLeftRight[midnight]()))) {
							this.isActive = false
							resolve()
							break
						}
						this.isActive = false
						await this.PromiseMoveClick(position.mainSortie())
						resolve(true)
						break
					case 'sortieResult':
						this.once('network.on.port', () => isWait = false)
						this.once('network.on.sortieNext', () => isWait = false)
						var AtteckReturn = checkDamage(store.state.api.battleresult.fleet, store.state.robot_cf.returnPort)				
						AtteckReturn = num >= store.state.robot_cf.sortieTimes ? 1 : AtteckReturn
						if(await wait(20, () => this.PromiseMoveClick(position.SortieLeftRight[AtteckReturn]()))){
							this.isActive = false
							resolve()
							break
						}
						this.isActive = false
						resolve()
						break
					case 'docking':
						var dock = checkNdock()
						if(dock.includes(true)){
							var repair = checkRepair(store.state.api.battleresult.fleet, store.state.robot_cf.repair)
							if(repair){
								this.once('network.on.ndock', () => isWait = false)
								await this.PromiseMoveClick(position.Dock())
								if(await wait()){
									this.isActive = false
									resolve()
									break
								}
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
											resolve()
											break
										}
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
									resolve()
									break
								}
								this.isActive = false
								await this.PromiseMoveClick(position.mainExpedition())
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
				if(!this.isEnsei && ensei.length){
					this.isEnsei = true
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
							if(!this.isReload){
								await delay(6000)
							}
						}
					}
					this.isEnsei = false
					await this.PromiseMoveClick(position.Port(),2000)
				}
			}
			const missionReturn = () => {
				return new Promise( async resolve => {
					this.isActive = true
					let hasNext = false
					this.once('network.on.missionReturn', () => hasNext = true )
					await this.PromiseMoveClick(position.mainExpedition(),10000)
					for(let i = 0 ; i < 5 ; i++){
						await this.PromiseMoveClick(position.mainExpedition(),1000)
					}
					if(!hasNext) {
						this.isActive = false
						this.emit('network.on.checkMission')
					}
					resolve()
				})
			}
			this.on('network.on.checkMission',async () => {
				if(this.isEnable()){
					ensei = []
					ensei_timeout.map(x => clearTimeout(x))
					store.state.api.mission.map( (e, i) => {
						if( e != undefined && e[2] != 0 && Expedition_list()[i].enable){
							this.emit('network.on.missionStart', e[2],i)
						} else if(e != undefined && e[2] == 0 && Expedition_list()[i].enable){
							ensei.push(i)
						}
					})
					await delay()
					if(ensei.length) startMission()
				}
			})
			this.on('network.on.missionStart', (time,i) => {
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
					missionReturn()
				}
			})
			this.on('network.on.checkNdock', () => {
				let time = store.state.api.ndock.map( x => x.api_complete_time).filter(x => x)
				time.map( x => {
					console.log(x)
					setTimeout( async () => {
						if(this.isEnable() && !this.isActive && !this.isEnsei && !this.isSleep && !this.isSortie){
							await this.AutoRun('refreshPort')
						}
					}, x - (new Date().getTime()))
				})
			})
		}
		this.on('network.on.start', async () => {
			this.isReload = false
			this.isActive = false
			this.isEnsei = false
			this.waitCond = false
			this.isSortie = false
			this.sortieFleet = true			
			if(this.isEnable()){
				this.once('network.on.port', () => {
					this.emit('network.on.checkMission')
					this.emit('network.on.checkNdock')
				})
				await delay()
				await this.PromiseMoveClick(position.Start())
			}
		})
		this.base = () => {
			this.startSortie = async () => {
				if(!this.isSortie && !this.waitCond){
					this.isSortie = true
					await this.waitActive()
					await this.waitEnsei()
					if(this.sortieFleet){
						if(await this.AutoRun('sortieFleet')){
							this.sortieFleet = false
							if(this.isActive){
								this.isSortie = false
								return
							}
						}
					}
					if(store.getters.needSupplys().includes(true)){
						await this.AutoRun('supply')
						if(this.isActive){
							this.isSortie = false
							return
						}
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
					if(await this.docking()){
						return
					}
					await this.AutoRun('startSortie')
					let port = false
					this.once('network.on.port', () => port = true)
					for(let i = 0 ; i < store.state.robot_cf.sortieTimes ; i++){
						if(port) break
						await this.AutoRun('sortieBattle')
						await this.AutoRun('sortieResult', i+1)
					}
					if(store.getters.needSupplys().includes(true)){
						await this.AutoRun('supply')
						if(this.isActive){
							this.isSortie = false
							return
						}
					}
					await this.docking()
					this.isSortie = false
				}
			}
			this.docking = () => {
				return new Promise( async resolve => {
					let repair = checkRepair(store.state.api.battleresult.fleet, store.state.robot_cf.repair)
					if(repair){
						let needDock = false
						let dock = checkNdock()
						if(dock.includes(true)){
							repair.map( id => {
								store.state.api.ndock.findIndex(x => x.api_ship_id == id[0]) == -1 ? needDock = true : false
							})
						}
						if(needDock){
							await this.AutoRun('docking')
						}
						this.isSortie = false
						resolve(true)
					} else {
						resolve(false)
					}
				})
			}
		}
		window.setInterval( () => this.timer(), 120000 )
	}
}



export default new Robot()
