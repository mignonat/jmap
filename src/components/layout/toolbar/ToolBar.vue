<template>
    <div class="tool-bar">
        <tool-bar-item v-for="item in items"
                       v-bind:key="item.name"
                       :item="item"/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    import { mapGetters } from "vuex"
    import ToolBarItem from "components/layout/toolbar/ToolBarItem.vue"
    export default Vue.extend({
        name: "ToolBar",
        computed: {
            ...mapGetters({
                items: "app_action_items",
            }),
        },
        components: {
            ToolBarItem,
        },
    })
</script>

<style lang="scss">
    .tool-bar {
        display: flex;
        align-items: center;
    }
    .tool-bar .tool-bar-item {
        margin-left: 10px;
    }
</style>
