<template>
    <div :class="'jmap-logo-'+sizeCssClass"></div>
</template>

<script lang="ts">
    import { Component } from "vue-property-decorator"
    import SizeableComponent from "components/mixins/SizeableComponent"

    @Component({
        name: "JmapLogo",
    })
    export default class JmapLogoComponent extends SizeableComponent {}
</script>

<style lang="scss">
    [class^="jmap-logo"] {
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url("../../ressources/images/jmap-logo.png");
        // not a classical webpack import, url must be relative, will be processed by css-loader
    }
    .jmap-logo-small {
        width: 31px;
        height: 21px;
    }
    .jmap-logo-medium {
        width: 159px;
        height: 108px;
    }
    .jmap-logo-big {
        width: 318px;
        height: 216px;
    }
</style>
