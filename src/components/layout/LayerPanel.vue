<template>
    <div class="layer-panel">
        <span class="layer-panel-title">Layers</span>
        <div class="layer-panel-item"
             v-for="(layer, index) in layers"
             v-bind:key="layer.name">
            <check-box ref="checkboxes" :initialState="true"/>
            <span class="layer-panel-item-name" @click="toggle(index)">{{ layer.name }}</span>
            <span class="layer-panel-item-description" v-if="layer.description">
                {{ layer.description }}
            </span>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue"
    import { mapGetters } from "vuex"
    import CheckBox from "components/fragments/input/CheckBox.vue"

    export default Vue.extend({
        name: "LayerPanel",
        computed: {
            ...mapGetters({
                layers: "app_layers",
            }),
        },
        methods: {
            toggle(index: number): void {
                (this.$refs.checkboxes as CheckBox[])[index].toggle()
            },
        },
        components: {
            CheckBox,
        },
    })
</script>

<style lang="scss">
    @import "src/ressources/scss/settings.scss"; // is an import, can use absolute import
    .layer-panel {
        display: flex;
        flex-direction: column;
    }
    .layer-panel-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .layer-panel-item {
        margin-left: 5px;
        display: flex;
        align-items: center;
    }
    .layer-panel-item-name {
        font-weight: bold;
        cursor: hand;
        cursor: pointer;
        margin-left: 5px; 
    }
    .layer-panel-item-description {
        margin-left: 5px;
        font-size: 12px;
    }
</style>
