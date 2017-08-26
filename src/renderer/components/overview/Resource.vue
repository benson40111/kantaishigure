<template>
	<div class="resource_board">
		<div class="resource_inside">
			<table style="width:100%">
				<tr v-for="(res, index) in resource" v-if="index%2 === 0" :key="res.id">
					<td>
						<img :src="img_urls[index]">
						{{ res.api_value }}
					</td>
					<td>
						<img :src="img_urls[index+1]">
						{{ resource[index+1].api_value }}
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
export default {
	name: 'resource',
	computed: {
		resource() {
			let res = this.$store.state.api.resource
			return [res[0],res[2],res[1], ...res.slice(3)]  //swap 2 1
		}
	},
	data(){
		return {
			img_urls: [
				require('../../assets/img/01.png'),
				require('../../assets/img/03.png'), //鋼
				require('../../assets/img/02.png'), //彈
				require('../../assets/img/04.png'),
				require('../../assets/img/05.png'),
				require('../../assets/img/06.png'),
				require('../../assets/img/07.png'),
				require('../../assets/img/08.png')
			]
		}
	}
}

</script>