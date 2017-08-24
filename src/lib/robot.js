/*global load init*/
import EventEmitter from 'events'
import store from '../renderer/store/index.js'
import position from './position.js'

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
        this.isWait = false
        this.Expedition = store.state.robot_cf.Expedition
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
        this.ensei = []
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
        this.Sortie = store.state.robot_cf.Sortie
        this.refreshPort = async () => {
            this.once('network.on.port', async () => await this.PromiseMoveClick(position.mainExpedition()))
            await this.PromiseMoveClick(position.Sortie())
            await this.PromiseMoveClick(position.Port())
        }
        this.StartExpedition = async (fleet) => {
            let done = false, count = 0
            this.once('network.on.missionStart', () => done = true)
            this.once('network.on.mission', () => {
                this.isWait = false
            })
            while(!done)
            {
                if(count){
                    if(count > this.tryTimes) break
                    await this.check()
                    await this.refreshPort()
                }
                await this.PromiseMoveClick(position.Sortie())
                await this.PromiseMoveClick(position.mainExpedition())
                this.isWait = true
                await this.wait()
                await this.PromiseMoveClick(position.RowExpedition[Math.floor(this.Expedition[fleet][1]/8)](), 1000)
                await this.PromiseMoveClick(position.ColumnExpedition[this.Expedition[fleet][1]%8](), 1000)
                await this.PromiseMoveClick(position.ConfirmExpedition[0](), 1000)
                await this.PromiseMoveClick(position.fleetExpedition[fleet](), 1000)
                await this.PromiseMoveClick(position.ConfirmExpedition[1](), 1000)
                await this.PromiseMoveClick(position.Port(),10000)
                count += 1
            }
        }

        this.Supply = async (fleet) => {
            let done = false, count = 0
            if(store.getters.needSupply(fleet)) 
            {
                this.once('network.on.charge', () => done = true )
                while(!done){
                    if(count){
                        if(count > this.tryTimes) break                            
                        await this.check()
                        await this.refreshPort()
                    }
                    await this.PromiseMoveClick(position.Supply());
                    await this.PromiseMoveClick(position.FleetSupply[fleet]());
                    await this.PromiseMoveClick(position.FullSupply()); 
                    await this.PromiseMoveClick(position.Port())
                    count += 1
                }
            }
        }
        this.wait = async () => {
            if(!this.isWait) return
            await new Promise ( resolve => setTimeout( async () => { await this.check(); resolve()}, 5000))
        }
        this.check = async () => {
            if(!this.isSleep){
                if(!this.isActive) return
            }
            await new Promise ( resolve => setTimeout( async () => { await this.check(); resolve()}, 5000))
        }
        this.MissionReturn = async () => {
            let hasNext = false
            this.isActive = true
            this.once('network.on.missionReturn', () => hasNext = true)
            await this.PromiseMoveClick(position.mainExpedition(),10000)
            for(let i = 0 ; i < 5 ; i++){
                await this.PromiseMoveClick(position.mainExpedition(),1000)
            }
            if(!hasNext) this.isActive = false
        }
        this.Start = async () => {
            await this.PromiseMoveClick(position.Start() , 1000)
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
        this.registerExpedition =  async () => {
            let ensei
            while((ensei = this.ensei.shift()) != undefined ){
                if(this.Expedition[ensei][0])
                {
                    await this.check()
                    await this.Supply(ensei+1)
                    await this.check()
                    await this.StartExpedition(ensei)
                }
            }
        }
    }
    init = () => {
        this.on('network.on.start', async () => {
            if(this.isEnable){ 
                await this.Start()
                this.once('network.on.port', () => {this.checkMission()})
            }
        })
        this.on('network.on.missionReturn', async (data) => {
            if(this.isEnable){
                this.ensei.push(Number(data-2))
                await this.MissionReturn()
                this.registerExpedition()
            }
        })
        this.on('network.on.missionStart', (time) => {
            if(this.isEnable){
                setTimeout( async () => {
                    await this.check()
                    await this.refreshPort()
                }, (Number(time) -(new Date()).getTime() + this.ExpeditionDelayTime()))
            }
        })
        window.setInterval( () => { this.sleepTIme() }, 60000)
    }
}

export default new Robot()