import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


let routes = [
	{
		path: '/',
		name: 'overview',
		component: require('@/components/Overview')
	},
	{
		path: '/fleets',
		name: 'Fleets',
		component: require('@/components/Fleets')
	},
	{
		path: '/setting',
		name: 'setting',
		component: require('@/components/Setting')
	}
] 



export default new Router({
	routes,
	linkActiveClass: 'active'
})