<template>
    <div class="layer-edit-panel">
        <span class="layer-edit-panel-title">Layer edition</span>
        <select v-model="selectedLayerName" class="layer-edit-panel-select">
            <option v-for="layer in layers"
                    v-bind:key="layer.name"
                    :value="layer.name">
                {{ layer.name }}
            </option>
        </select>
        <div class="layer-edit-panel-item" v-if="selectedLayer">
            <check-box ref="checkboxes" :externalState="selectedLayer.isSelected" @change="toggle"/>
            <span class="layer-edit-panel-item-name" @click="toggle">{{ selectedLayer.name }}</span>
            <span class="layer-edit-panel-item-description" v-if="selectedLayer.description">
                {{ selectedLayer.description }}
            </span>
        </div>
        <div class="layer-edit-panel-item" v-else>
            <span class="layer-edit-panel-item-empty">No layer selected</span>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    import { mapGetters } from "vuex"
    import { Component, Watch } from "vue-property-decorator"
    import { IMapLayer } from "model/app"
    import CheckBox from "components/fragments/input/CheckBox.vue"

    @Component({
        name: "LayerEditPanel",
        data: () => { return {
            selectedLayer: undefined,
            selectedLayerName: undefined,
        }},
        computed: mapGetters({
            layers: "app_layers",
        }),
        components: {
            CheckBox,
        },
    })
    export default class ComponentLayerPanel extends Vue {
        public layers: IMapLayer[]
        public selectedLayerName: string
        public selectedLayer: IMapLayer

        public $refs: {
            checkboxes: CheckBox[],
        }

        public toggle() {
            if (this.selectedLayer) {
                this.$store.dispatch("APP_TOGGLE_LAYER", this.selectedLayer.name)
            }
        }

        @Watch("selectedLayerName")
        public onSelectedLayerNameChange() {
            this.selectedLayer = this.$store.getters.app_layer_by_name(this.selectedLayerName)
        }

        public mounted(): void {
            if (this.layers) {
                this.selectedLayer = this.layers[0]
            }
        }
    }
</script>

<style lang="scss">
    @import "src/ressources/scss/settings.scss";
    .layer-edit-panel {
        display: flex;
        flex-direction: column;
    }
    .layer-edit-panel-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .layer-edit-panel-select {
        width: fit-content;
        margin-bottom: 10px;
    }
    .layer-edit-panel-item {
        margin-left: 5px;
        display: flex;
        align-items: center;
    }
    .layer-edit-panel-item-name,
    .layer-edit-panel-item-empty {
        font-weight: bold;
        cursor: hand;
        cursor: pointer;
        margin-left: 5px; 
    }
    .layer-edit-panel-item-description {
        margin-left: 5px;
        font-size: 12px;
    }
</style>
