const state = {
    Expedition: [ { enable: false, id: 0 } , { enable: false, id: 0 }, { enable: false, id: 0 }],
    Sortie: false,
    Delayms: 2000, // ms
    isEnabled: false,
    sleepTime: { 
        'HH': '00',
        'mm': '00',
        'ss': '00'
    },
    sleepEnd: { 
        'HH': '06',
        'mm': '00',
        'ss': '00'
    },
    EnseiDelayMax: 2, // minutes
    EnseiDelayMin: 1, // mintes
    sortieArea1: 0,
    sortieArea2: 0,
    sortieTimes: 1,
    repair: 0, // 0 大破 1 中破 2 小破 維修
    returnPort: 0, // same
    waitCond: true,
    Cond: 40,
    Formation: 0, // 0 單縱
    SortieMidnight: true,
    fastRepairTime: 10, //minutes
    fastRepair: false,
    sortieSleepClear: true, // 休眠時間是否將艦隊清除剩一隻
    sortieFleet: 0, // 要展開第幾個編成紀錄
    sortieFleetStatus: true, // status
    neverChange: false // never change fleet
}

const mutations = {
    UPDATE_NEVERCHANGE(state, res){
        state.neverChange = res
    },
    UPDATE_SORTIESLEEPCLEAR(state, res){
        state.sortieSleepClear = res
    },
    UPDATE_SORTIEFLEET(state, res){
        state.sortieFleet = res
    },
    UPDATE_SORTIEFLEETSTATUS(state, res){
        state.sortieFleetStatus = res
    },
    UPDATE_FASTREPAIR(state, res){
        state.fastRepair = res
    },
    UPDATE_FASTREPAIRTIME(state, res){
        state.fastRepairTime = res
    },
    UPDATE_EXPEDITION(state, res){
        state.Expedition = res
    },
    UPDATE_RETURNPORT(state, res){
        state.returnPort = res
    },
    UPDATE_SORTIEMIDNIGHT(state, res){
        state.SortieMidnight = res
    },
    UPDATE_FORMATION(state, res){
        state.Formation = res
    },
    UPDATE_WAITCOND(state, res){
        state.waitCond = res
    },
    UPDATE_COND(state, res){
        state.Cond = res
    },
    UPDATE_REPAIR(state, res){
        state.repair = res
    },
    UPDATE_SORTIETIMES(state, res){
        state.sortieTimes = res
    },
    UPDATE_SORTIEAREA1(state,res){
        state.sortieArea1 = res
    },
    UPDATE_SORTIEAREA2(state,res){
        state.sortieArea2 = res
    },
    UPDATE_SORTIE(state, res){
        state.Sortie = res
    },
    UPDATE_DELAYMS(state, res){
        state.Delayms = res
    },
    UPDATE_SLEEPEND(state, res){
        state.sleepEnd = res
    },
    UPDATE_SLEEPTIME(state, res){
        state.sleepTime = res
    },
    UPDATE_ISENABLED(state, res){
        state.isEnabled = res
    },
    UPDATE_ENSEIDELAYMAX(state, res){
        state.EnseiDelayMax = res
    },
    UPDATE_ENSEIDELAYMIN(state, res){
        state.EnseiDelayMin = res
    }
}

const actions = {
}

export default {
	state,
	mutations,
	actions
}
