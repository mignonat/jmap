<template>
    <div>
        <div class="logo"></div>
        <div class="primary">Hello {{name}} {{exclamationMarks}}</div>
        <button @click="decrement">-</button>
        <button @click="increment">+</button>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Utils from '../model/Utils'

    export default Vue.extend({
        props: {
            name: { 
                type: String,
                default: 'World'
            },
            initialEnthusiasm: {
                type: Number
            }
        },
        data() { return {
            enthusiasm: this.initialEnthusiasm,
        }},
        methods: {
            increment(): void { this.enthusiasm++; },
            decrement(): void {
                if (this.enthusiasm > 1) {
                    this.enthusiasm--
                }
            },
            test(): number {
                return 2
            }
        },
        computed: {
            exclamationMarks(): string {
                return Utils.getExclamationMarksByCount(this.enthusiasm + 1)
            }
        }
    })
</script>

<style lang="scss">
    @import "src/ressources/scss/settings.scss"; // is an import, can use absolute import
    .primary {
        color: $primary-color ;
    }
    .logo {
        width: 318px;
        height: 216px;
        background-repeat: no-repeat;
        background-image: url("../ressources/images/jmap-logo.png"); // not an import, must be relative path
    }
</style>