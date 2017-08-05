<template>
	<div class="tab-content">
		<div class="tab-pane active" id="overview">
			<div class="resource_board">
				<div class="resource_inside">
					<table style="width:100%">
						<tr v-for="row in (1, 5)">
							<td v-for="col in (1, 2)">
								<img :src="img_url">
								123547
							</td>
						</tr>
					</table>
				</div>
			</div>
			<div v-for="res in resource" :key="res.id">
				{{ res.api_value }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'overview',
	computed: {
		resource() {
			return this.$store.state.api.resource
		}
	},
	data(){
		return {
			img_url: require('../assets/img/01.png')
		}
	}
}

</script>

<style>
.resource_board{
	height: auto;
	border: 2px solid #3d3d3d;
	border-radius: 5px;
	margin: 30px 10px 30px 10px;
	font-size: 13px;
}
.resource_inside{
	margin:5px 10px 10px 10px;
	width:100%;
}
.resource_inside th{
	text-align: left;

}
</style>
