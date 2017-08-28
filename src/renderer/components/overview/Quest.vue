<template>
	<div class="quest">
        <div class="external" :style="position" v-show="Active" v-html="detail"></div>
        <div class="quest-inside flex-content" v-for="quest in quests" :key="quest.api_no">
            <span style="flex:1" @mouseover="onMouseOver(quest.api_detail)" @mouseout="Active=false">{{ quest.api_title }}</span>
            <span style="flex:none" v-html="quest.api_state == 2 ?  $options.filters.quest_progress(quest.api_progress_flag) : '100%'"></span>
        </div>
	</div>
</template>

<script>
export default {
    name: 'mission',
    data() {
        return {
            position: '',
            detail: '',
            Active: false
        }
    },
    computed: {
        quests() {
            return this.$store.getters.quest_list()
        }
    },
    filters: {
        quest_progress(value) {
            return value ? value == 1 ? '50%' : '80%' : '0%'
        }
    },
    methods: {
        onMouseOver(detail) {
            this.position = `top:${this.$el.offsetTop-12}px;left:${this.$el.offsetLeft-220}px;`
            this.detail = detail
            this.Active = true
        }
    }
}
</script>