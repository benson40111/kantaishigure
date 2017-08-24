/*global load init*/
import EventEmitter from 'events'
import store from '../renderer/store/index.js'
import position from './position.js'
import { remote } from 'electron'
// Robot Class for auto click
class Robot extends EventEmitter {
    constructor(){
        super()
        this.load()
        this.init()
    }
    load = () => {
        this.isEnable = store.state.robot_cf.isEnabled
        this.tryTimes = 10
        this.isSleep = false
        this.isActive = false
        this.isEnsei = false
        this.isWait = false
        this.ensei = []
        this.Expedition = store.state.robot_cf.Expedition
        this.Sortie = store.state.robot_cf.Sortie
        this.webview = () => document.querySelector('webview')
        this.Delayms = (time = store.state.robot_cf.Delayms) => Math.floor(Math.random()*(-time*0.1,time*0.1)+time)
        this.ExpeditionDelayTime = (max = store.state.robot_cf.EnseiDelayMax, min = store.state.robot_cf.EnseiDelayMin) => Math.floor(Math.random()*(Math.abs(max-min)) + min)*60000
        this.sleepTIme = ({HH,mm,ss} = store.state.robot_cf.sleepTime, end = store.state.robot_cf.sleepEnd ) => {
            let sleepStart = (new Date()).setHours(Number(HH),Number(mm),Number(ss))
            let sleepEnd = (new Date()).setHours(Number(end.HH),Number(end.mm),Number(end.ss))
            let now = (new Date().getTime())
            if( now > sleepStart && now < sleepEnd){
                this.isSleep = true
            } else {
                this.isSleep = false
            }
        }
        this.PromiseMoveClick = ([x,y], time = this.Delayms()) => {
            return new Promise ( resolve => {
            if(this.isEnable){
                setTimeout( async ()=> {
                    this.webview().sendInputEvent({type:'mouseDown', x:x, y: y, button:'left', clickCount: 1})
                    this.webview().sendInputEvent({type:'mouseUp', x:x, y: y, button:'left', clickCount: 1});
                    resolve()
                }, time)
            } else {
                resolve()
            }
        })}
        this.check = async () => {
            if(!this.isActive) return
            await new Promise ( resolve => setTimeout( async () => { await this.check(); resolve()}, 5000))
        }
        this.sleep = async () => {
            if(!this.isSleep) return
            await new Promise ( resolve => setTimeout( async () => { await this.sleep(); resolve()}, 120000))
        }
        this.wait = async (time = 10) => {
            if(time == 0) {
                remote.app.relaunch()
                remote.app.exit(0)
                return
            }
            if(!this.isWait) return
            await new Promise ( resolve => setTimeout( async () => { await this.wait(time-1); resolve()}, 2000))
        }
        this.refreshPort = async () => {
            this.once('network.on.port', async () => await this.PromiseMoveClick(position.mainExpedition()))
            await this.PromiseMoveClick(position.Sortie())
            await this.PromiseMoveClick(position.Port())
        }
        this.mainExpedition = async () => {
            this.isWait = true
            this.once('network.on.mission', () => { this.isWait = false })
            await this.PromiseMoveClick(position.Sortie())
            await this.PromiseMoveClick(position.mainExpedition())
            await this.wait()
        }
        this.StartExpedition = async (fleet) => {
            this.isWait = true            
            this.once('network.on.missionStart', () => { this.isWait = false })
            await this.PromiseMoveClick(position.RowExpedition[Math.floor(this.Expedition[fleet][1]/8)](), 1000)
            await this.PromiseMoveClick(position.ColumnExpedition[this.Expedition[fleet][1]%8](), 1000)
            await this.PromiseMoveClick(position.ConfirmExpedition[0](), 1000)
            await this.PromiseMoveClick(position.fleetExpedition[fleet](), 1000)
            await this.PromiseMoveClick(position.ConfirmExpedition[1]())
            await this.wait()
        }
        this.Supply = async (needSupply = store.getters.needSupplys()) => {
            if(needSupply.includes(true)){
                await this.PromiseMoveClick(position.Supply())
                for(let i = 0; i < needSupply.length ; i++){
                    if(needSupply[i]) {
                        this.isWait = true                        
                        this.once('network.on.charge', () => { this.isWait = false } )
                        await this.PromiseMoveClick(position.FleetSupply[i]())
                        await this.PromiseMoveClick(position.FullSupply())
                        await this.wait()
                    }
                }
            }
            this.isWait = true            
            this.once('network.on.port', () => { this.isWait = false })
            await this.PromiseMoveClick(position.Port())
            await this.wait()
            await this.PromiseMoveClick(position.mainExpedition(), 1000)
        }
        this.registerExpedition =  async () => {
            if(this.isEnsei) return
            if(this.ensei.length) {
                this.isEnsei = true
                while(store.getters.needSupplys().includes(true)){
                    await this.Supply()
                    await this.check()
                }
                await this.mainExpedition()
                let ensei
                while((ensei = this.ensei.shift()) != undefined ){
                    if(this.Expedition[ensei][0])
                    {
                        await this.StartExpedition(ensei)
                    }
                }
                this.isEnsei = false
                await this.PromiseMoveClick(position.Port(),10000)
            }
        }
        this.checkMission = () => {
            store.state.api.mission.map( (ep,i) => {
                if(ep !=undefined && ep[2] != 0){
                    this.emit('network.on.missionStart', ep[2])
                } else if(ep !=undefined && ep[2] == 0){
                    this.ensei.push(i)
                }
            })
            this.registerExpedition()
        }
        this.MissionReturn = async () => {
            let hasNext = false
            this.isActive = true
            this.once('network.on.missionReturn', () => { hasNext = true })
            await this.PromiseMoveClick(position.mainExpedition(),10000)
            for(let i = 0 ; i < 5 ; i++){
                await this.PromiseMoveClick(position.mainExpedition(),1000)
            }
            if(!hasNext) {
                this.isActive = false
                this.registerExpedition()
            }
        }
    }
    init = () => {
        this.on('network.on.start', async () => {
            if(this.isEnable){ 
                await await this.PromiseMoveClick(position.Start() , 1000)
                this.once('network.on.port', () => { this.checkMission() })
            }
        })
        this.on('network.on.missionReturn', async (data) => {
            if(this.isEnable){
                this.ensei.push(Number(data-2))
                await this.MissionReturn()
            }
        })
        this.on('network.on.missionStart', (time) => {
            if(this.isEnable){
                setTimeout( async () => {
                    await this.sleep()
                    await this.check()
                    await this.refreshPort()
                }, (Number(time) -(new Date()).getTime() + this.ExpeditionDelayTime()))
            }
        })
        window.setInterval( () => { this.sleepTIme() }, 60000)
    }
}

export default new Robot()