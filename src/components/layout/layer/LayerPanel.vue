<template>
    <div class="layer-panel">
        <button class="layer-panel-button" @click="toggle">{{ inverseMode }}</button>
        <component :is="implementation"/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    import { Component } from "vue-property-decorator"
    import LayerListPanel from "components/layout/layer/LayerListPanel.vue"
    import LayerEditPanel from "components/layout/layer/LayerEditPanel.vue"

    @Component({
        name: "LayerPanel",
        components: {
            LayerListPanel,
            LayerEditPanel,
        },
    })
    export default class ComponentLayerPanel extends Vue {
        public mode: string = "list"
        public inverseMode: string = "edit"

        get implementation(): string {
            return this.mode === "edit" ? "layer-edit-panel" : "layer-list-panel"
        }

        public toggle(): void {
            this.inverseMode = this.mode
            this.mode = this.mode === "list" ? "edit" : "list"
        }
    }
</script>

<style lang="scss">
    .layer-panel-button {
        width: 50px;
        margin-bottom: 20px ;
    }
</style>
