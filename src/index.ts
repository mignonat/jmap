import Vue from "vue"
import App from "components/App.vue"
import appStore from "store/store"
import { IAppViewMode, IUserRight } from "model/app"

appStore.dispatch("APP_INITIALIZE", {
    // this options are dynamic and should/will be inserted by a jsp that call the app
    viewMode: IAppViewMode.FULL,
    userRights: [ IUserRight.ADMIN, IUserRight.VIEW ],
});

(window as any).App = new Vue({
    el: "#app",
    template: `<app></app>`,
    store: appStore,
    components: {
        App,
    },
    created(): void {
        // if 
    },
})
