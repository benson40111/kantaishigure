<template>
    <div class="tab-pane active" role="tabpanel" v-show="isActive"><slot></slot></div>
</template>



<script>
export default {
    name: 'model-tab',
    props: {
        name: { required: true },
        id: { required: true },
        selected: { default: false }
    },

    data() {
        return {
            isActive: false
        };
    },
    mounted() {
        this.isActive = this.selected;
    }
}
</script>