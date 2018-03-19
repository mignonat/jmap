<template>
    <div class="app">
        <div class="left-side">
            <layer-admin-panel></layer-admin-panel>
        </div>
        <div class="right-side">
            <top-bar></top-bar>
            <map-panel></map-panel>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import LayerAdminPanel from 'components/panels/LayerAdminPanel.vue'
    import MapPanel from 'components/panels/MapPanel.vue'
    import TopBar from 'components/layout/TopBar.vue'
    import { AppOptions } from './app-types'

    export default Vue.extend({
        name: 'App',
        props: {
            options: Object as (() => AppOptions)
        },
        components: {
            LayerAdminPanel,
            TopBar,
            MapPanel
        }
    })
</script>

<style lang="scss">
    @import "src/ressources/scss/settings.scss"; // is an import, can use absolute import
    .app * {
        margin: 0px;
        padding: Opx;
    }
    html, body {
        padding: 0px;
        margin: 0px;
        height: 100%;
    }
    .app {
        display: flex;
        width: 100%;
        height: 100%;
    }
    .left-side {
        border-right: $border;
        width: $left-side-width;
        padding-left: 5px;
    }
    .right-side {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        width: 100%;
    }
</style>
