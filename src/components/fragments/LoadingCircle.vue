<template>
    <div :class="'loading-circle-'+sizeCssClass"></div>
</template>

<script lang="ts">
    import { Component } from "vue-property-decorator"
    import SizeableComponent from "components/mixins/SizeableComponent"

    @Component({
        name: 'LoadingCirle'
    })
    export default class LoadingCircleComponent extends SizeableComponent {}
</script>

<style lang="scss">
    @import "src/ressources/scss/settings.scss";
    [class^="loading-circle"] {
        border-radius: 50%;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    .loading-circle-small {
        border: 4px solid $secondary-color;
        border-top: 4px solid $primary-color;
        width: 30px;
        height: 30px;
    }
    .loading-circle-medium {
        border: 8px solid $secondary-color;
        border-top: 8px solid $primary-color;
        width: 60px;
        height: 60px;
    }
    .loading-circle-big {
        border: 16px solid $secondary-color;
        border-top: 16px solid $primary-color;
        width: 120px;
        height: 120px;
    }
</style>
