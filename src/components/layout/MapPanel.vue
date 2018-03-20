<template>
    <div class="map-panel">
        Map
    </div>  
</template>

<script lang="ts">
    import Vue from "vue"
    export default Vue.extend({
        name: 'MapPanel'
    })
</script>

<style lang="scss">
    @import "src/ressources/scss/settings.scss";
    .map-panel {
        background-color: $background-color-secondary;
        height: 100%;
    }
</style>
