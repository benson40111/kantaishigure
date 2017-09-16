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
	},
	{
		path: '/robot',
		name: 'robot',
		component: require('@/components/Robot')
	},
	{
		path: '/prophet',
		name: 'prophet',
		component: require('@/components/Prophet')
	}
] 



export default new Router({
	routes,
	linkActiveClass: 'active'
})
