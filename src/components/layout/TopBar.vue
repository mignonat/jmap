<template>
    <div class="top-bar">
        <tool-bar/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    import ToolBar from "components/layout/toolbar/ToolBar.vue"
    export default Vue.extend({
        name: "TopBar",
        components: {
            ToolBar,
        },
    })
</script>

<style lang="scss">
    @import "src/ressources/scss/settings.scss"; // is an import, can use absolute import
    .top-bar {
        border-bottom: $border;
        height: $top-bar-height;
        width: 100%;
        display: flex;
        align-items: center;
        background-color: $background-color-primary;
    }
    .top-bar-title {
        margin-left: 10px;
    }
    .top-bar > [class^="jmap-logo"] {
        margin-left: 10px;
    }
</style>
