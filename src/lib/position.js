/*global load*/
class Position {
    constructor(){
        this.load()
    }
    load = () => {
        this.clientRect = () => document.querySelector('webview').getBoundingClientRect()
        this.Start = ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
            x = Math.floor(Math.random()*(width*0.935-width*0.57+1) + width*0.57)
            y = Math.floor(Math.random()*(height*0.90 - height*0.775+1) + height*0.775)
            return [x, y]
        }
        this.Port = ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
            x = Math.floor(Math.random()*(width*0.108-width*0.004+1) + width*0.004)
            y = Math.floor(Math.random()*(height*0.147 - height*0.008+1) + height*0.008)
            return [x, y]
        }
        this.Sortie = ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
            x = Math.floor(Math.random()*(width*0.28-width*0.195+1) + width*0.195)
            y = Math.floor(Math.random()*(height*0.6 - height*0.46+1) + height*0.46)
            return [x, y]
        }
        this.Supply = ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
            x = Math.floor(Math.random()*(width*0.1325-width*0.052+1) + width*0.052)
            y = Math.floor(Math.random()*(height*0.5 - height*0.4+1) + height*0.4)
            return [x, y]
        }
        this.FleetSupply = [
        ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
            x = Math.floor(Math.random()*(width*0.19-width*0.176+1) + width*0.176)
            y = Math.floor(Math.random()*(height*0.2625 - height*0.23+1) + height*0.23)
            return [x, y]
        },
        ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
            x = Math.floor(Math.random()*(width*0.2325-width*0.21+1) + width*0.21)
            y = Math.floor(Math.random()*(height*0.2625 - height*0.23+1) + height*0.23)
            return [x, y]
        },
        ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
            x = Math.floor(Math.random()*(width*0.262-width*0.248+1) + width*0.248)
            y = Math.floor(Math.random()*(height*0.2625 - height*0.23+1) + height*0.23)
            return [x, y]
        },
        ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
            x = Math.floor(Math.random()*(width*0.306-width*0.2858+1) + width*0.2858)
            y = Math.floor(Math.random()*(height*0.2625 - height*0.23+1) + height*0.23)
            return [x, y]
        }
        ]
        this.FullSupply = ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
            x = Math.floor(Math.random()*(width*0.157-width*0.1358+1) + width*0.1358)
            y = Math.floor(Math.random()*(height*0.2625 - height*0.23+1) + height*0.23)
            return [x, y]
        }
        this.mainExpedition = ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
            x = Math.floor(Math.random()*(width*0.93-width*0.76+1) + width*0.76)
            y = Math.floor(Math.random()*(height*0.61 - height*0.319+1) + height*0.319)
            return [x, y]
        },
        this.fleetExpedition = [
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.499-width*0.478+1) + width*0.478)
                y = Math.floor(Math.random()*(height*0.247 - height*0.222+1) + height*0.222)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.535-width*0.516+1) + width*0.516)
                y = Math.floor(Math.random()*(height*0.247 - height*0.222+1) + height*0.222)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.573-width*0.555+1) + width*0.555)
                y = Math.floor(Math.random()*(height*0.247 - height*0.222+1) + height*0.222)
                return [x, y]
            }
        ]
        this.ColumnExpedition = [
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.66-width*0.165+1) + width*0.165)
                y = Math.floor(Math.random()*(height*0.376 - height*0.333+1) + height*0.333)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.66-width*0.165+1) + width*0.165)
                y = Math.floor(Math.random()*(height*0.444 - height*0.4+1) + height*0.4)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.66-width*0.165+1) + width*0.165)
                y = Math.floor(Math.random()*(height*0.508 - height*0.461+1) + height*0.461)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.66-width*0.165+1) + width*0.165)
                y = Math.floor(Math.random()*(height*0.570 - height*0.526+1) + height*0.526)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.66-width*0.165+1) + width*0.165)
                y = Math.floor(Math.random()*(height*0.633 - height*0.589+1) + height*0.589)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.66-width*0.165+1) + width*0.165)
                y = Math.floor(Math.random()*(height*0.698 - height*0.654+1) + height*0.654)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.66-width*0.165+1) + width*0.165)
                y = Math.floor(Math.random()*(height*0.822 - height*0.777+1) + height*0.777)
                return [x, y]
            }
        ]
        this.RowExpedition = [
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.195-width*0.141+1) + width*0.141)
                y = Math.floor(Math.random()*(height*0.931 - height*0.868+1) + height*0.868)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.27-width*0.219+1) + width*0.219)
                y = Math.floor(Math.random()*(height*0.931 - height*0.868+1) + height*0.868)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.345-width*0.298+1) + width*0.298)
                y = Math.floor(Math.random()*(height*0.931 - height*0.868+1) + height*0.868)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.408-width*0.3625+1) + width*0.3625)
                y = Math.floor(Math.random()*(height*0.931 - height*0.868+1) + height*0.868)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.48-width*0.436+1) + width*0.436)
                y = Math.floor(Math.random()*(height*0.931 - height*0.868+1) + height*0.868)
                return [x, y]
            }
        ],
        this.ConfirmExpedition = [
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.9-width*0.79+1) + width*0.79)
                y = Math.floor(Math.random()*(height*0.95 - height*0.89+1) + height*0.89)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.866-width*0.666+1) + width*0.666)
                y = Math.floor(Math.random()*(height*0.956 - height*0.895+1) + height*0.895)
                return [x, y]
            }
        ]
    }
}

export default new Position()