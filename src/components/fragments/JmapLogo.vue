<template>
    <div :class="'jmap-logo-'+sizeCssClass" alt="JMap logo"></div>
</template>

<script lang="ts">
    import Vue from 'vue'
    export default Vue.extend({
        name: 'JmapLogo',
        props: {
            size: {
                type: String,
                default: 'medium'
            }
        },
        computed: {
            sizeCssClass(): string  {
                switch (this.size) {
                    case 'small': return 'small'
                    case 'big': return 'big'
                    default: return 'medium'
                }
            }
        }
    })
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
