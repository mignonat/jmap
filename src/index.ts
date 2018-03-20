import Vue from "vue"
import App from "components/App.vue"
import appStore from "store/store"
import { AppViewMode, UserRight } from "model/app"

appStore.dispatch("APP_INITIALIZE", {
    // this options are dynamic and should/will be inserted by a jsp that call the app
    viewMode: AppViewMode.FULL,
    userRights: [ UserRight.ADMIN, UserRight.VIEW ]
})

interface Window {
    App: Vue
}

(<any>window).App = new Vue({
    el: "#app",
    template: `<app></app>`,
    store: appStore,
    components: {
        App
    }
})