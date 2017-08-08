<template>
<div>
    <ul class="nav nav-tabs nav-fill">
        <li class="nav-item" v-for="tab in tabs" :key="tab.id">
            <a class="nav-link" :class="{ 'active' : tab.isActive }" @click="selectTab(tab)">{{ tab.name }}</a>
        </li>
    </ul>
    <div class="tab-content">
        <slot></slot>
    </div>
</div>
</template>


<script>
export default {
    name: "model-tabs",
    data() {
        return { tabs: [] };
    },

    created() {
        this.tabs = this.$children;
    },

    methods: {
        selectTab(selectedTab) {
            this.tabs.forEach(tab => {
                tab.isActive = (tab.id == selectedTab.id);
            });
        }
    }
}
</script>

<style>
	.nav-link:hover{
		color: aqua;
		border-color: #333 !important;
		border-bottom-color: aqua !important;
	}
</style>
