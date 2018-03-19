import Vue from "vue"
import App from "components/App.vue"
import appStore from "./store/store"
import { AppViewMode, AppUserRight } from './components/app-types'

appStore.dispatch("")

new Vue({
    el: "#app",
    template: `<app :options="appOptions"></app>`,
    data: () => { return {
        appOptions: {
            viewMode: AppViewMode.FULL,
            userRights: [ AppUserRight.ADMIN ]
        }
    }},
    store: appStore,
    components: {
        App
    }
})