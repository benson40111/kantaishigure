/*global init*/
import EventEmitter from 'events'
import store from '../renderer/store/index.js'
import position from './position.js'
import { remote } from 'electron'

const delay = (time = 3000) => {
    return new Promise( resolve => {
        setTimeout( () => { resolve()} , time)
    })
}


class Robot extends EventEmitter {
    constructor(){
        super()
        this.init()
        this.Expedition()
    }
    init = () => {
        this.isActive = false
        this.isSleep = false
        this.needRefreshPort = false
        this.isEnable = store.state.robot_cf.isEnabled
        this.waitActive = async () => {
            if(this.isActive){
                await new Promise ( resolve => setTimeout( async () => { await this.waitActive(); resolve()}, 5000))
            }
        }
        this.Delayms = (time = store.state.robot_cf.Delayms) => Math.floor(Math.random()*(-time*0.1,time*0.1)+time)
        this.ExpeditionDelayTime = (max = store.state.robot_cf.EnseiDelayMax, min = store.state.robot_cf.EnseiDelayMin) => Math.floor(Math.random()*(Math.abs(max-min)) + min)*60000
        this.sleepTime = ({HH,mm,ss} = store.state.robot_cf.sleepTime, end = store.state.robot_cf.sleepEnd ) => {
            let sleepStart = (new Date()).setHours(Number(HH),Number(mm),Number(ss))
            let sleepEnd = (new Date()).setHours(Number(end.HH),Number(end.mm),Number(end.ss))
            let now = (new Date().getTime())
            if( now > sleepStart && now < sleepEnd){
                this.isSleep = true
            } else {
                this.isSleep = false
                if(this.needRefreshPort) { this.AutoRun('refreshPort'); this.needRefreshPort = false }
            }
        }
        this.PromiseMoveClick = ([x,y], time = this.Delayms()) => {
            return new Promise ( async resolve => {
            if(this.isEnable){
                setTimeout( async ()=> {
                    await document.querySelector('webview').sendInputEvent({type:'mouseDown', x:x, y: y, button:'left', clickCount: 1})
                    await document.querySelector('webview').sendInputEvent({type:'mouseUp', x:x, y: y, button:'left', clickCount: 1});
                    resolve()
                }, time)
            } else {
                resolve()
            }
        })}
        this.AutoRun = (target, fleet) => {
            return new Promise ( async resolve => {
                let isWait = true
                let wait = async (time = 10) => {
                    if(time == 0) {remote.getCurrentWindow().reload(); resolve()}
                    else if(isWait){
                        await new Promise ( resolve => setTimeout( async () => { await wait(time-1); resolve()}, 2000))                        
                    }
                }
                switch(target){
                    case 'refreshPort':
                        this.once('network.on.port', () => isWait = false)
                        await this.PromiseMoveClick(position.Sortie())
                        await this.PromiseMoveClick(position.Port())
                        await wait()
                        await this.PromiseMoveClick(position.mainExpedition())
                        resolve()
                        break
                    case 'mainExpedition':
                        this.once('network.on.mission', () => isWait = false)
                        await this.PromiseMoveClick(position.Sortie())
                        await this.PromiseMoveClick(position.mainExpedition())
                        await wait()
                        resolve()
                        break
                    case 'startExpedition':
                        this.once('network.on.missionStart', () => isWait = false)
                        var Expedition = store.state.robot_cf.Expedition
                        await this.PromiseMoveClick(position.RowExpedition[Math.floor(Expedition[fleet][1]/8)](), 1000)
                        await this.PromiseMoveClick(position.ColumnExpedition[Expedition[fleet][1]%8](), 1000)
                        await this.PromiseMoveClick(position.ConfirmExpedition[0](), 1000)
                        await this.PromiseMoveClick(position.fleetExpedition[fleet](), 1000)
                        await this.PromiseMoveClick(position.ConfirmExpedition[1]())
                        await wait()
                        resolve()
                        break
                    case 'supply':
                        var needSupply = store.getters.needSupplys()
                        if(needSupply.includes(true)){
                            await this.PromiseMoveClick(position.Supply())                            
                            for(let i = 0; i < needSupply.length ; i++){
                                isWait = true
                                if(needSupply[i]){
                                    this.once('network.on.charge', () => isWait = false)
                                    await this.PromiseMoveClick(position.FleetSupply[i]())
                                    await this.PromiseMoveClick(position.FullSupply())
                                    await wait()
                                }
                            }
                            isWait = true
                            this.once('network.on.port', () =>  isWait = false )
                            await this.PromiseMoveClick(position.Port())
                            await wait()
                            await this.PromiseMoveClick(position.mainExpedition())
                        }
                        resolve()
                        break
                    default:
                        resolve()
                }
            })
        }
        this.Expedition = () => {
            let ensei = []
            let ensei_timeout = []
            let Expedition_list = store.state.robot_cf.Expedition
            let isEnsei = false
            const startMission = async () => {
                if(!isEnsei && ensei.length){
                    await this.waitActive()                    
                    isEnsei = true
                    while(store.getters.needSupplys().includes(true)){
                        await this.AutoRun('supply')
                        await this.waitActive()
                    }
                    this.isActive = true
                    await this.AutoRun('mainExpedition')
                    let e
                    while((e = ensei.shift()) != undefined){
                        if(Expedition_list[e][0]){
                            await this.AutoRun('startExpedition',e)
                            await delay(6000)
                        }
                    }
                    this.isActive = false
                    isEnsei = false
                    await this.PromiseMoveClick(position.Port(),2000)
                }
            }
            const missionReturn = () => {
                return new Promise( async resolve => {
                    let hasNext = false
                    this.isActive = true
                    this.once('network.on.missionReturn', () => { hasNext = true })
                    await this.PromiseMoveClick(position.mainExpedition(),10000)
                    for(let i = 0 ; i < 5 ; i++){
                        await this.PromiseMoveClick(position.mainExpedition(),1000)
                    }
                    if(!hasNext) {
                        this.isActive = false
                        startMission()
                    }
                    resolve()
                })
            }
            this.on('network.on.checkMission', () => {
                if(this.isEnable){
                    ensei_timeout.map(x => clearTimeout(x))
                    store.state.api.mission.map( (e, i) => {
                        if( e != undefined && e[2] != 0){
                            this.emit('network.on.missionStart', e[2],i)
                        } else if(e != undefined && e[2] == 0){
                            ensei.push(i)
                        }
                    })
                    startMission()
                }
            })
            this.on('network.on.missionStart', (time,i) => {
                    ensei_timeout[i] = setTimeout( async () => {
                        if(this.isEnable){
                            if(this.isSleep) {
                                this.needRefreshPort = true
                            }
                            else {
                                await this.waitActive()
                                await this.AutoRun('refreshPort')
                            }
                        }
                    }, (Number(time) -(new Date()).getTime() + this.ExpeditionDelayTime()))
                })
            this.on('network.on.missionReturn', data => {
                if(this.isEnable){
                    ensei.push(Number(data-2))
                    missionReturn()
                }
            })
        }
        this.on('network.on.start', async () => {
            if(this.isEnable){
                await this.PromiseMoveClick(position.Start())
                this.once('network.on.port', () => {
                    this.emit('network.on.checkMission')
                })                
            }
        })
        window.setInterval( () => this.sleepTime(), 120000 )
    }
}

export default new Robot()