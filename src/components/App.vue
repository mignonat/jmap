<template>
    <div class="app" v-if="isAppInitialized">
        <div class="left-side">
            <jmap-logo></jmap-logo>
            <layer-panel/>
        </div>
        <div class="right-side">
            <top-bar/>
            <map-panel/>
        </div>
    </div>
    <div class="app-loading" v-else>
        <span class="app-loading-title">JMap Web is loading ...</span>
        <loading-circle size="big"/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    import { mapGetters } from "vuex"
    import LayerPanel from "components/layout/LayerPanel.vue"
    import MapPanel from "components/layout/MapPanel.vue"
    import TopBar from "components/layout/TopBar.vue"
    import LoadingCircle from "components/fragments/LoadingCircle.vue"
    import JmapLogo from "components/fragments/JmapLogo.vue"

    export default Vue.extend({
        name: 'App',
        computed: {
            ...mapGetters({
                isAppInitialized: "app_is_initialized"
            })
        },
        components: {
            LayerPanel,
            TopBar,
            MapPanel,
            LoadingCircle,
            JmapLogo
        }
    })
</script>

<style lang="scss">
    @import "src/ressources/scss/settings.scss"; // is an import, can use absolute import
    .app * {
        margin: 0px;
        padding: Opx;
    }
    .app * {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .app input {
        -webkit-touch-callout: default;
        -webkit-user-select: auto;
        -khtml-user-select: auto;
        -moz-user-select: text;
        -ms-user-select: element;
        user-select: all;
    }
    html, body {
        padding: 0px;
        margin: 0px;
        height: 100%;
    }
    .app, .app-loading {
        display: flex;
        width: 100%;
        height: 100%;
    }
    @keyframes fadeIn {
        0% {opacity: 0;}
        100% {opacity: 1;}
    }
    .app {
        animation: fadeIn 700ms linear ;
    }
    .app-loading {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .app-loading-title {
        font-size: 20px;
        color: $primary-color;
        margin-bottom: 20px;
    }
    .left-side {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-right: $border;
        width: $left-side-width;
        min-width: $left-side-width;
        max-width: $left-side-width;
        padding-left: 5px;
        background-color: $background-color-primary;
    }
    .left-side .layer-panel {
        width: 100%;
    }
    .right-side {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        width: 100%;
    }
</style>
