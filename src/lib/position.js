/*global load*/

// for kancolle flash position
class Position {
    constructor(){
        this.load()
    }
    load = () => {
        this.clientRect = () => document.querySelector('webview').getBoundingClientRect()
        this.Start = ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
            x = Math.floor(Math.random()*(width*0.935 - width*0.57+1) + width*0.57)
            y = Math.floor(Math.random()*(height*0.90 - height*0.775+1) + height*0.775)
            return [x, y]
        }
        this.Port = ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
            x = Math.floor(Math.random()*(width*0.108 - width*0.004+1) + width*0.004)
            y = Math.floor(Math.random()*(height*0.147 - height*0.008+1) + height*0.008)
            return [x, y]
        }
        this.Sortie = ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
            x = Math.floor(Math.random()*(width*0.28 - width*0.195+1) + width*0.195)
            y = Math.floor(Math.random()*(height*0.6 - height*0.46+1) + height*0.46)
            return [x, y]
        }
        this.Organize = ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
            x = Math.floor(Math.random()*(width*0.2787 - width*0.2200+1) + width*0.2200)
            y = Math.floor(Math.random()*(height*0.3146 - height*0.2479+1) + height*0.2479)
            return [x, y]
        }
        this.Supply = ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
            x = Math.floor(Math.random()*(width*0.1325 - width*0.052+1) + width*0.052)
            y = Math.floor(Math.random()*(height*0.5 - height*0.4+1) + height*0.4)
            return [x, y]
        }
        this.clearFleet = ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
            x = Math.floor(Math.random()*(width*0.5587 - width*0.4875+1) + width*0.4875)
            y = Math.floor(Math.random()*(height*0.2562 - height*0.2437+1) + height*0.2437)
            return [x, y]
        }
        this.FleetSupply = [
        ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
            x = Math.floor(Math.random()*(width*0.19 - width*0.176+1) + width*0.176)
            y = Math.floor(Math.random()*(height*0.2625 - height*0.23+1) + height*0.23)
            return [x, y]
        },
        ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
            x = Math.floor(Math.random()*(width*0.2325 - width*0.21+1) + width*0.21)
            y = Math.floor(Math.random()*(height*0.2625 - height*0.23+1) + height*0.23)
            return [x, y]
        },
        ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
            x = Math.floor(Math.random()*(width*0.262-width*0.248+1) + width*0.248)
            y = Math.floor(Math.random()*(height*0.2625 - height*0.23+1) + height*0.23)
            return [x, y]
        },
        ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
            x = Math.floor(Math.random()*(width*0.306 - width*0.2858+1) + width*0.2858)
            y = Math.floor(Math.random()*(height*0.2625 - height*0.23+1) + height*0.23)
            return [x, y]
        }
        ]
        this.FullSupply = ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
            x = Math.floor(Math.random()*(width*0.157 - width*0.1358+1) + width*0.1358)
            y = Math.floor(Math.random()*(height*0.2625 - height*0.23+1) + height*0.23)
            return [x, y]
        }
        this.mainExpedition = ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
            x = Math.floor(Math.random()*(width*0.93 - width*0.76+1) + width*0.76)
            y = Math.floor(Math.random()*(height*0.61 - height*0.319+1) + height*0.319)
            return [x, y]
        }
        this.fleetExpedition = [
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.499 - width*0.478+1) + width*0.478)
                y = Math.floor(Math.random()*(height*0.247 - height*0.222+1) + height*0.222)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.535 - width*0.516+1) + width*0.516)
                y = Math.floor(Math.random()*(height*0.247 - height*0.222+1) + height*0.222)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.573 - width*0.555+1) + width*0.555)
                y = Math.floor(Math.random()*(height*0.247 - height*0.222+1) + height*0.222)
                return [x, y]
            }
        ]
        this.ColumnExpedition = [
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.66 - width*0.165+1) + width*0.165)
                y = Math.floor(Math.random()*(height*0.376 - height*0.333+1) + height*0.333)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.66 - width*0.165+1) + width*0.165)
                y = Math.floor(Math.random()*(height*0.444 - height*0.4+1) + height*0.4)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.66 - width*0.165+1) + width*0.165)
                y = Math.floor(Math.random()*(height*0.508 - height*0.461+1) + height*0.461)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.66 - width*0.165+1) + width*0.165)
                y = Math.floor(Math.random()*(height*0.570 - height*0.526+1) + height*0.526)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.66 - width*0.165+1) + width*0.165)
                y = Math.floor(Math.random()*(height*0.633 - height*0.589+1) + height*0.589)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.66 - width*0.165+1) + width*0.165)
                y = Math.floor(Math.random()*(height*0.698 - height*0.654+1) + height*0.654)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.66 - width*0.165+1) + width*0.165)
                y = Math.floor(Math.random()*(height*0.822 - height*0.777+1) + height*0.777)
                return [x, y]
            }
        ]
        this.RowExpedition = [
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.195 - width*0.141+1) + width*0.141)
                y = Math.floor(Math.random()*(height*0.931 - height*0.868+1) + height*0.868)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.27 - width*0.219+1) + width*0.219)
                y = Math.floor(Math.random()*(height*0.931 - height*0.868+1) + height*0.868)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.345 - width*0.298+1) + width*0.298)
                y = Math.floor(Math.random()*(height*0.931 - height*0.868+1) + height*0.868)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.408-width*0.3625+1) + width*0.3625)
                y = Math.floor(Math.random()*(height*0.931 - height*0.868+1) + height*0.868)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.48 - width*0.436+1) + width*0.436)
                y = Math.floor(Math.random()*(height*0.931 - height*0.868+1) + height*0.868)
                return [x, y]
            }
        ]
        this.ConfirmExpedition = [
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.9 - width*0.79+1) + width*0.79)
                y = Math.floor(Math.random()*(height*0.95 - height*0.89+1) + height*0.89)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.866 - width*0.666+1) + width*0.666)
                y = Math.floor(Math.random()*(height*0.956 - height*0.895+1) + height*0.895)
                return [x, y]
            }
        ]
        this.mainSortie = ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
            x = Math.floor(Math.random()*(width*0.3712 - width*0.2075+1) + width*0.2075)
            y = Math.floor(Math.random()*(height*0.61 - height*0.319+1) + height*0.319)
            return [x, y]
        }
        this.RowSortie = [
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.2263 - width*0.1650+1) + width*0.1650)
                y = Math.floor(Math.random()*(height*0.9437 - height*0.8854+1) + height*0.8854)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.3250 - width*0.2575+1) + width*0.2575)
                y = Math.floor(Math.random()*(height*0.9437 - height*0.8854+1) + height*0.8854)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.4138 - width*0.3575+1) + width*0.3575)
                y = Math.floor(Math.random()*(height*0.9437 - height*0.8854+1) + height*0.8854)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.4963 - width*0.4412+1) + width*0.4412)
                y = Math.floor(Math.random()*(height*0.9437 - height*0.8854+1) + height*0.8854)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.5938 - width*0.5375+1) + width*0.5375)
                y = Math.floor(Math.random()*(height*0.9437 - height*0.8854+1) + height*0.8854)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.6913 - width*0.6312+1) + width*0.6312)
                y = Math.floor(Math.random()*(height*0.9437 - height*0.8854+1) + height*0.8854)
                return [x, y]
            }
        ]
        this.ColumnSortie = [
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.5337 - width*0.1688+1) + width*0.1688)
                y = Math.floor(Math.random()*(height*0.5313 - height*0.3125+1) + height*0.3125)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.8113 - width*0.5875+1) + width*0.5875)
                y = Math.floor(Math.random()*(height*0.5521 - height*0.3021+1) + height*0.3021)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.5337 - width*0.1688+1) + width*0.1688)
                y = Math.floor(Math.random()*(height*0.8438 - height*0.6062+1) + height*0.6062)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.8113 - width*0.5875+1) + width*0.5875)
                y = Math.floor(Math.random()*(height*0.8438 - height*0.6062+1) + height*0.6062)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.9250 - width*0.8688+1) + width*0.8688)
                y = Math.floor(Math.random()*(height*0.6021 - height*0.5333+1) + height*0.5333)
                return [x, y]
            }
        ]
        this.ConfirmSortie = [
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.9000 - width*0.8137+1) + width*0.8137)
                y = Math.floor(Math.random()*(height*0.9479 - height*0.8938+1) + height*0.8938)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.8462 - width*0.6763+1) + width*0.6763)
                y = Math.floor(Math.random()*(height*0.9563 - height*0.8979+1) + height*0.8979)
                return [x, y]
            }
        ]
        this.SortieLeftRight = [ 
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.4050 - width*0.3200+1) + width*0.3200)
                y = Math.floor(Math.random()*(height*0.5604 - height*0.4417+1) + height*0.4417)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.6725 - width*0.5925+1) + width*0.5925)
                y = Math.floor(Math.random()*(height*0.5604 - height*0.4417+1) + height*0.4417)
                return [x, y]
            }
        ]
        this.SortieFormation = [
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.6150 - width*0.4988+1) + width*0.4988)
                y = Math.floor(Math.random()*(height*0.4250 - height*0.3646+1) + height*0.3646)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.7762 - width*0.6625+1) + width*0.6625)
                y = Math.floor(Math.random()*(height*0.4250 - height*0.3646+1) + height*0.3646)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.9437 - width*0.8313+1) + width*0.8313)
                y = Math.floor(Math.random()*(height*0.4250 - height*0.3646+1) + height*0.3646)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.7000 - width*0.5850+1) + width*0.5850)
                y = Math.floor(Math.random()*(height*0.7333 - height*0.6937+1) + height*0.6937)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.8625 - width*0.7512+1) + width*0.7512)
                y = Math.floor(Math.random()*(height*0.7333 - height*0.6937+1) + height*0.6937)
                return [x, y]
            }
        ]
        this.Dock = ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
            x = Math.floor(Math.random()*(width*0.1850 - width*0.1138+1) + width*0.1138)
            y = Math.floor(Math.random()*(height*0.8187 - height*0.6979+1) + height*0.6979)
            return [x, y]
        }
        this.DockPage = [
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.5563 - width*0.5275+1) + width*0.5275)
                y = Math.floor(Math.random()*(height*0.9667 - height*0.9437+1) + height*0.9437)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.6525 - width*0.6350+1) + width*0.6350)
                y = Math.floor(Math.random()*(height*0.9646 - height*0.9375+1) + height*0.9375)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.6963 - width*0.6850+1) + width*0.6850)
                y = Math.floor(Math.random()*(height*0.9646 - height*0.9375+1) + height*0.9375)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.7312 - width*0.7188+1) + width*0.7188)
                y = Math.floor(Math.random()*(height*0.9646 - height*0.9375+1) + height*0.9375)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.7712 - width*0.7600+1) + width*0.7600)
                y = Math.floor(Math.random()*(height*0.9646 - height*0.9375+1) + height*0.9375)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.8087 - width*0.7975+1) + width*0.7975)
                y = Math.floor(Math.random()*(height*0.9646 - height*0.9375+1) + height*0.9375)
                return [x, y]
            }
        ]
        this.ColumnShip = [
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.9487 - width*0.5200+1) + width*0.5200)
                y = Math.floor(Math.random()*(height*0.3000 - height*0.2806+1) + height*0.2806)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.9487 - width*0.5200+1) + width*0.5200)
                y = Math.floor(Math.random()*(height*0.3583 - height*0.3444+1) + height*0.3444)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.9487 - width*0.5200+1) + width*0.5200)
                y = Math.floor(Math.random()*(height*0.4236 - height*0.4097+1) + height*0.4097)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.9487 - width*0.5200+1) + width*0.5200)
                y = Math.floor(Math.random()*(height*0.4889 - height*0.4750+1) + height*0.4750)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.9487 - width*0.5200+1) + width*0.5200)
                y = Math.floor(Math.random()*(height*0.5556 - height*0.5417+1) + height*0.5417)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.9487 - width*0.5200+1) + width*0.5200)
                y = Math.floor(Math.random()*(height*0.6181 - height*0.6042+1) + height*0.6042)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.9487 - width*0.5200+1) + width*0.5200)
                y = Math.floor(Math.random()*(height*0.6819 - height*0.6681+1) + height*0.6681)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.9487 - width*0.5200+1) + width*0.5200)
                y = Math.floor(Math.random()*(height*0.7486 - height*0.7347+1) + height*0.7347)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.9487 - width*0.5200+1) + width*0.5200)
                y = Math.floor(Math.random()*(height*0.8111 - height*0.7972+1) + height*0.7972)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.9487 - width*0.5200+1) + width*0.5200)
                y = Math.floor(Math.random()*(height*0.8764 - height*0.8625+1) + height*0.8625)
                return [x, y]
            }
        ]
        this.ColumnDock = [
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.4150 - width*0.2200+1) + width*0.2200)
                y = Math.floor(Math.random()*(height*0.3729 - height*0.3104+1) + height*0.3104)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.4150 - width*0.2200+1) + width*0.2200)
                y = Math.floor(Math.random()*(height*0.5437 - height*0.4771+1) + height*0.4771)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.4150 - width*0.2200+1) + width*0.2200)
                y = Math.floor(Math.random()*(height*0.7146 - height*0.6521+1) + height*0.6521)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.4150 - width*0.2200+1) + width*0.2200)
                y = Math.floor(Math.random()*(height*0.8833 - height*0.8187+1) + height*0.8187)
                return [x, y]
            }
        ]
        this.dockType = ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
            x = Math.floor(Math.random()*(width*0.9862 - width*0.9375+1) + width*0.9375)
            y = Math.floor(Math.random()*(height*0.2458 - height*0.2104+1) + height*0.2104)
            return [x, y]
        }
        this.dockBucket = [
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.9600 - width*0.8762+1) + width*0.8762)
                y = Math.floor(Math.random()*(height*0.6146 - height*0.5917+1) + height*0.5917)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.9700 - width*0.9113+1) + width*0.9113)
                y = Math.floor(Math.random()*(height*0.3604 - height*0.2875+1) + height*0.2875)
                return [x, y]
            }
        ]
        this.ConfirmDock = [
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.9375 - width*0.7750+1) + width*0.7750)
                y = Math.floor(Math.random()*(height*0.9479 - height*0.8729+1) + height*0.8729)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.6863 - width*0.5687+1) + width*0.5687)
                y = Math.floor(Math.random()*(height*0.8500 - height*0.8125+1) + height*0.8125)
                return [x, y]
            }
        ]
        this.fleetUnfolded = ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
            x = Math.floor(Math.random()*(width*0.1200 - width*0.0587+1) + width*0.0587)
            y = Math.floor(Math.random()*(height*0.8146 - height*0.7833+1) + height*0.7833)
            return [x, y]
        }
        this.ColumnUnfolded = [
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.3825 - width*0.3538+1) + width*0.3538)
                y = Math.floor(Math.random()*(height*0.4313 - height*0.4021+1) + height*0.4021)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.3825 - width*0.3538+1) + width*0.3538)
                y = Math.floor(Math.random()*(height*0.5396 - height*0.5083+1) + height*0.5083)
                return [x, y]
            },
            ({x,y} = {x: 0, y: 0} , {width,height} = this.clientRect()) => {
                x = Math.floor(Math.random()*(width*0.3825 - width*0.3538+1) + width*0.3538)
                y = Math.floor(Math.random()*(height*0.6458 - height*0.6188+1) + height*0.6188)
                return [x, y]
            }
        ]
    }
}

export default new Position()

/*
for calculate position
const width = (z,x) => {
    if(z<x){
		[z,x] = [x,z]
	}
	let min = ((1366 - z)/800.0).toFixed(4)
	let max = ((1366 - x)/800.0).toFixed(4)
	return `(width*${max} - width*${min}+1) + width*${min})`
}
const height = (z,x) => {
    if(z>x){
        [z,x] = [x,z]
    }
    let min = ((z - 185)/480.0).toFixed(4)
    let max = ((x - 185)/480.0).toFixed(4)
	return `(height*${max} - height*${min}+1) + height*${min})`
}
*/