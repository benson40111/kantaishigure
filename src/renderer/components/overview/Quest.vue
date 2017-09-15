<template>
	<div class="quest">
        <div class="quest-inside d-flex flex-row" v-for="quest in quests" :key="quest.api_no">
            <span style="flex:1" v-tooltip.left="quest.api_detail">{{ quest.api_title }}</span>
            <span style="flex:none" v-html="quest.api_state == 2 ?  $options.filters.quest_progress(quest.api_progress_flag) : '100%'"></span>
        </div>
	</div>
</template>

<script>
export default {
    name: 'mission',
    computed: {
        quests() {
            return this.$store.state.api.quest.filter(quest => quest.api_state == 2 || quest.api_state == 3)
        }
    },
    filters: {
        quest_progress(value) {
            return value ? value == 1 ? '50%' : '80%' : '0%'
        }
    }
}
</script>