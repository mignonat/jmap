<template>
    <div :class="'check-box '+toggableCssClass">
        <i class="material-icons" v-on:click="toggle" v-if="isOn">check</i>
        <i class="material-icons" v-on:click="toggle" v-else>check_box_outline_blank</i>
    </div>
</template>

<script <script lang="ts">
    import { Component, Prop } from "vue-property-decorator"
    import ToggableComponent from "components/mixins/ToggableComponent"

    @Component({
        name: 'CheckBox'
    })
    export default class CheckBoxComponent extends ToggableComponent {
        @Prop({ type: Boolean, default: true })
        emitEvent: boolean
    }
</script>

<style lang="scss">
    @import "src/ressources/scss/settings.scss";
    .check-box {
        display: flex;
        align-items: center;
    }
    .check-box:hover {
        cursor: hand;
        cursor: pointer;
    }
    @keyframes fadeIn {
        0% {opacity: 0;}
        100% {opacity: 1;}
    }
    .check-box > i.material-icons {
        font-size: 16px;
        animation: fadeIn 500ms linear ;
    }
</style>
