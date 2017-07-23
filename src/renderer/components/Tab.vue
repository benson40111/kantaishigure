<template>
	<div class='column'>
		<div class="tabs is-centered is-fullwidth is-boxed">
			<ul>
				<router-link tag='li' class='nav-item is-tab' to='/' exact>
					<a>{{ $t('Overview') }}</a>
				</router-link>
				<router-link tag='li' class='nav-item is-tab' to='/fleets' exact>
					<a>{{ $t('Fleets') }}</a>
				</router-link>
				<router-link tag='li' class='nav-item is-tab' to='/setting' exact>
					<a><router-link tag='i' to='/setting' class="fa fa-cog" active-class='fa-spin' aria-hidden="true" exact></router-link></a>
				</router-link>
			</ul>
		</div>
		<router-view></router-view>
	</div>
</template>


<script charset="utf-8">
export default {
	name: 'tab'
}
</script>
