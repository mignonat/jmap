<template>
    <div class="top-bar">
        <jmap-logo size="small"></jmap-logo>
        <span class="top-bar-title">Here Top Bar replace static value by store getter</span>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import JmapLogo from 'components/fragments/JmapLogo.vue'
    export default Vue.extend({
        name: 'TopBar',
        components: {
            JmapLogo
        }
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
    }
    .top-bar-title {
        margin-left: 10px;
    }
    .top-bar > [class^="jmap-logo"] {
        margin-left: 10px;
    }
</style>
