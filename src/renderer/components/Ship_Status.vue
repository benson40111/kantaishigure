<template>
	<div class="ship_status">
		<div class="ship_inside">
			<ul class="nav nav-tabs nav-fill" role="tablist">
				<li class="nav-item">
					<a class="nav-link active"  href="#ship1" role="tab">I</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" data-toggle="tab" href="#ship2" role="tab">II</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" data-toggle="tab" href="#ship3" role="tab">III</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" data-toggle="tab" href="#ship4" role="tab">IV</a>
				</li>
			</ul>
			<div class="tab-content">
				<div class="tab-pane active" id="ship1" role="tabpanel">...</div>
				<div class="tab-pane" id="ship2" role="tabpanel">...</div>
				<div class="tab-pane" id="ship3" role="tabpanel">...</div>
				<div class="tab-pane" id="ship4" role="tabpanel">...</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ship_status',
	computed: {
		ship_status(){

		}
	}
}
</script>

<style>
.ship_status{
	border: 2px solid #3d3d3d;
	border-radius: 5px;
	margin: 30px 10px 30px 10px;
	font-size: 13px;
}
</style>
