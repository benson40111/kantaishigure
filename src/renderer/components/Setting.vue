<template>
	<div>
		<form action="#" @submit.prevent="onSubmit()">
			<input type="text" v-model="webviewURL"></input>
			<button type="submit">
			<i class="fa fa-chevron-left fa-lg" aria-hidden="true"></i>
			</button>
		</form>

	</div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
	name: 'Setting',
	data() {
		return {
		webviewURL: null
		}
	},
	methods: {
		onSubmit() {
			document.querySelector('webview').src = this.$data.webviewURL
		}
	}
}
</script>
