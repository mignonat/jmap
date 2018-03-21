/**
 * Babel-polyfill add Object.assign and other functions to es2015 js generated
 * Has to be imported only once
 */
import "babel-polyfill"
import Vue, { VueConstructor } from "vue"
import { Store } from "vuex"
import { IStringMap, IAppStartupOptions, IAppViewMode, IUserRight } from "model/app"
import AppStore, { Actions as AppStoreActions } from "store/store"
import ComponentApp from "components/App.vue"
import ComponentLayerPanel from "components/layout/LayerPanel.vue"

const dataStoreHasBeenInitialiazed: boolean = false
const windowVar: any = (window as any)

// Application options are passed as a global variable named JMapAppStartupOptions
const JMapAppStartupOptions: IAppStartupOptions = windowVar.JMapAppStartupOptions
let defaultStartupOptions: IAppStartupOptions = JMapAppStartupOptions ?
    JMapAppStartupOptions :
    {   // default startup options
        viewMode: IAppViewMode.PREVIEW,
        userRights: [ IUserRight.VIEW ],
    }

/**
 * Check if the data store (vuex store) has already been initialized
 * If not, it'll be initialized
 */
function checkDataStore(): Promise<any> {
    if (! AppStore.getters.app_is_initialized) {
        return AppStore.dispatch(AppStoreActions.APP_FETCH_INITIAL_DATA)
    } else {
        return new Promise<any>((resolve, reject) => {
            resolve()
        })
    }
}

/************* API APP *************/

interface IJMapApiApplication {
    ContainerId: string
    Instance: Vue|undefined
    DataStore: Store<any>|undefined
    StartupOptions: IAppStartupOptions
}

/************* API COMPONENT *************/

/**
 * Instantiate a component with the given parameters
 * 
 * @param {String} containerId : DOM id of the container of the component
 * @param {String} template : the vuejs template for instanciation ex: "layer-panel"
 * @param {Object} componentConfig : the vuejs component configuration (the one in the .vue file)
 */
function instantiateComponent<C> (containerId: string, template: string, componentConfig: C): Vue {
    return new Vue({
        el: "#" + containerId,
        template: `<${template} id="${containerId}"/>`,
        store: AppStore,
        components: {
            [template]: componentConfig
        }
    })
}

/**
 * Check if the datastore has been initialized, if not it is intialized
 * Then create an instance of the component in the html element with id containerId
 * 
 * @param {String} containerId : DOM id of the container of the component
 * @param {String} template : the vuejs template for instanciation
 * @param {Object} componentConfig : the vuejs component configuration (the one in the .vue file)
 */
function initAndInstantiateComponent<C> (containerId: string, template: string, componentConfig: C): Promise<Vue|undefined> {
    return new Promise<Vue>((resolve, reject) => {
        if (!containerId) {     reject("Missing container identifier"); return }
        if (!template) {        reject("Missing template"); return }
        if (!componentConfig) { reject("Missing vuejs component configuration"); return }
        
        if (AppStore.getters.app_is_initialized) {
            instantiateComponent(containerId, template, componentConfig)
        } else {
            AppStore.dispatch(AppStoreActions.APP_FETCH_INITIAL_DATA)
            .then(() => {
                resolve(instantiateComponent(containerId, template, componentConfig))
            })
            .catch(error => {
                console.error(error)
                reject(error)
            })
        }
    })
}

/**
 * For each components we want to be available througth the Component API,
 * an implementation class of this interface has to be made
 * Ex : JMapApiComponentLayerPanel class
 */
interface IJMapApiComponentItem<C extends Vue> {
    instanceByContainerId: IStringMap<Vue>
    instanciate(containerId: string, options: any): void
    destroy(containerId: string): void
}

/**
 * The class which manage instanciation/deletion of LayerPanel components
 */
class JMapApiComponentLayerPanel implements IJMapApiComponentItem<ComponentLayerPanel> {
    instanceByContainerId: IStringMap<Vue> = {}
    instanciate(containerId: string, options: any): void {
        if (this.instanceByContainerId.hasOwnProperty(containerId)) {
            console.warn("JMapAPI : instance already instantiate in this container")
            return
        }
        initAndInstantiateComponent(containerId, "layer-panel", ComponentLayerPanel)
        .then(instance => {
            // register new instance for possible future destroy
            if (instance) this.instanceByContainerId[containerId] = instance
        })
    }
    destroy(containerId: string): void {
        if (this.instanceByContainerId.hasOwnProperty(containerId)) {
            delete this.instanceByContainerId[containerId]
            const div: HTMLElement|null = document.getElementById(containerId)
            if (div) div.innerHTML = ""
        }
    }
}

interface IJMapApiComponent {
    LayerPanel: JMapApiComponentLayerPanel
}

/************* API *************/

/**
 * Definition of the root elements of the API
 */
interface IJMapApi {
    Application: IJMapApiApplication
    Component: IJMapApiComponent
}

/**
 * That class is what will be exported in JMapAPI global variable
 */
class JMapApi implements IJMapApi {
    public Application: IJMapApiApplication = {
        ContainerId: "app",
        Instance: undefined,
        DataStore: undefined,
        StartupOptions: defaultStartupOptions,
    }
    public Component: IJMapApiComponent = {
        LayerPanel: new JMapApiComponentLayerPanel()
    }
    /**
     * Start the JMAP Application (maybe on prod soon)
     * 
     * @param {String} containerId : the dom div id
     * @param {IAppStartupOptions} startupOptions : 
     */
    public startApplication(containerId?: string, startupOptions?: IAppStartupOptions): void {
        if (this.Application.Instance) {
            console.warn("JMapAPI : application has already been initialized")
            return
        }
        if (containerId) this.Application.ContainerId = "app"
        if (!startupOptions) startupOptions = this.Application.StartupOptions
        this.Application.DataStore = AppStore
        checkDataStore()
        .then(() => {
            const VueAppConfig = {
                el: "#" + this.Application.ContainerId, // Where Vue App will be inserted in the DOM
                template: "<app></app>",        // <app> lowerCamelCase string of name in components
                store: AppStore,                // All App children will have the store injected
                components: {
                    app: ComponentApp,          // It's an SPA so only the app component here
                },
            }
            this.Application.Instance = new Vue(VueAppConfig)
        })
        .catch(error => {
            console.error("JMapAPI : startApplication error ; " + error)
        })
    }
}

/************* API INSTANTIATION *************/

let JMapAPI: JMapApi
if (windowVar.hasOwnProperty("JMapAPI")) {  // API has already been initialized
    JMapAPI = windowVar.JMapAPI
} else {
    JMapAPI = new JMapApi()
    if (windowVar.hasOwnProperty("JMapAppStartupOptions")) {
        // options can be passed as a global variable named JMapAppStartupOptions
        const autoStart: boolean|undefined = (windowVar.JMapAppStartupOptions as IAppStartupOptions).autoStartApp
        if (autoStart) JMapAPI.startApplication()
    }
}

/************* API EXPORT *************/

windowVar.JMapAPI = JMapAPI // Will be visible by everybody

export default JMapAPI      // we must export something
