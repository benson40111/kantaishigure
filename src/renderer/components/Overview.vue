<template>
	<div class="tab-content">
		<div class="tab-pane active" id="overview">
			<div class="resource_board">
				<div class="resource_inside">
					<table style="width:100%">
						<tr>
							<td>
								<img src="../assets/img/01.png">
								12344
							</td>
							<td>
								<img src="../assets/img/02.png">
								123456
							</td>
						</tr>
						<tr>
							<td>
								<img src="../assets/img/03.png">
								300000
							</td>
							<td>
								<img src="../assets/img/04.png">
								123099
							</td>
						</tr>
						<tr>
							<td>
								<img src="../assets/img/05.png">
								4444555
							</td>
							<td>
								<img src="../assets/img/06.png">
								1234
							</td>
						</tr>
						<tr>
							<td>
								<img src="../assets/img/07.png">
								7890
							</td>
							<td>
								<img src="../assets/img/08.png">
								2345678
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
	}
}
</script>

<style>
.resource_board{
	height: auto;
	border: 2px solid white;
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
