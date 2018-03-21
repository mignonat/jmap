<template>
    <div class="tool-bar-item" :title="item.label" @click="clickHandler">
        <i class="material-icons">{{ item.icon }}</i>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    
    export default Vue.extend({
        name: "ToolBar",
        props: {
            item: {
                type: Object, // "model/app@ActionItem"
                required: true,
            },
        },
        methods: {
            clickHandler(): void {
                // console.log('Action='+this.item.action)
            },
        },
    })
</script>

<style lang="scss">
    .tool-bar-item {
        cursor: hand;
        cursor: pointer;
    }
</style>
