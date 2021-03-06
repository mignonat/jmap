<template>
    <div class="layer-list-panel">
        <span class="layer-list-panel-title">List of layers</span>
        <div class="layer-list-panel-item"
             v-for="layer in layers"
             v-bind:key="layer.name"
             v-show="isAppInitialized">
            <check-box ref="checkboxes" :externalState="layer.isSelected" @change="toggle(layer.name)"/>
            <span class="layer-list-panel-item-name" @click="toggle(layer.name)">{{ layer.name }}</span>
            <span class="layer-list-panel-item-description" v-if="layer.description">
                {{ layer.description }}
            </span>
        </div>
        <div class="layer-list-panel-empty" v-show="isAppLoading">
            <span class="layer-list-panel-item-empty">Data loading</span>
            <loading-circle size="small"/>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    import { mapGetters } from "vuex"
    import { Component } from "vue-property-decorator"
    import { IMapLayer } from "model/app"
    import CheckBox from "components/fragments/input/CheckBox.vue"
    import LoadingCircle from "components/fragments/LoadingCircle.vue"

    @Component({
        name: "LayerListPanel",
        computed: mapGetters({
            layers: "app_layers",
            isAppInitialized: "app_is_initialized",
            isAppLoading: "app_is_loading",
        }),
        components: {
            CheckBox,
            LoadingCircle,
        },
    })
    export default class ComponentLayerPanel extends Vue {
        public layers: IMapLayer[]

        public $refs: {
            checkboxes: CheckBox[],
        }

        public toggle(layerName: string): void {
            this.$store.dispatch("APP_TOGGLE_LAYER", layerName)
        }
    }
</script>

<style lang="scss">
    @import "src/ressources/scss/settings.scss";
    .layer-list-panel {
        display: flex;
        flex-direction: column;
    }
    .layer-list-panel-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .layer-list-panel-item {
        margin-left: 5px;
        display: flex;
        align-items: center;
    }
    .layer-list-panel-item-name {
        font-weight: bold;
        cursor: hand;
        cursor: pointer;
        margin-left: 5px; 
    }
    .layer-list-panel-item-description {
        margin-left: 5px;
        font-size: 12px;
    }
    .layer-list-panel-empty {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
