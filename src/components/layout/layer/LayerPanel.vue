<template>
    <div class="layer-panel">
        <div class="layer-panel-switch">
            <span>Switch to layer </span>
            <button class="layer-panel-button" @click="toggle">{{ inverseMode | translateMode }}</button>
        </div>
        <component :is="implementation"/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    import { Component } from "vue-property-decorator"
    import LayerListPanel from "components/layout/layer/LayerListPanel.vue"
    import LayerEditPanel from "components/layout/layer/LayerEditPanel.vue"

    enum Mode {
        LIST = "layer-list-panel",
        EDIT = "layer-edit-panel",
    }

    @Component({
        name: "LayerPanel",
        components: {
            LayerListPanel,
            LayerEditPanel,
        },
        filters: {
            translateMode(mode: Mode): string {
                return mode === Mode.LIST ? "list" : "edition"
            },
        },
    })
    export default class ComponentLayerPanel extends Vue {
        public mode: Mode = Mode.LIST
        public inverseMode: Mode = Mode.EDIT

        get implementation(): string {
            return this.mode
        }

        public toggle(): void {
            this.inverseMode = this.mode
            this.mode = this.mode === Mode.LIST ? Mode.EDIT : Mode.LIST
        }
    }
</script>

<style lang="scss">
    .layer-panel-switch {
        margin-top: 20px ;
        margin-bottom: 15px ;
    }
</style>
