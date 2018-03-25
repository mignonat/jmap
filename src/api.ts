/**
 * Babel-polyfill add Object.assign and other functions to es2015 js generated
 * Has to be imported only once
 */
import "babel-polyfill"
import "api-polyfill"
import Vue, { VueConstructor } from "vue"
import { Store } from "vuex"
import { IMap, Map } from "model/common"
import { IAppStartupOptions, IAppViewMode, IUserRight } from "model/app"
import AppStore, { Actions as AppStoreActions } from "store/store"
import ComponentApp from "components/App.vue"
import ComponentLayerListPanel from "components/layout/layer/LayerListPanel.vue"
import ComponentJMapLogo from "components/fragments/JmapLogo.vue"

const isStoreInitialiazed: boolean = false
const windowVar: any = (window as any)

// Application options are passed as a global variable named JMapAppStartupOptions
const JMapAppStartupOptions: IAppStartupOptions|undefined = windowVar.JMapAppStartupOptions
const defaultStartupOptions: IAppStartupOptions = JMapAppStartupOptions ?
    JMapAppStartupOptions :
    {   // default startup options
        viewMode: IAppViewMode.PREVIEW,
        userRights: [ IUserRight.VIEW ],
    }

/************* API DATA *************/

interface IJMapApiData {
    Store: Store<any>|undefined
    StartupOptions: IAppStartupOptions
    checkStore(startupOptions?: IAppStartupOptions): void
}

class JMapApiData implements IJMapApiData {
    public Store: Store<any>|undefined = AppStore
    public StartupOptions: IAppStartupOptions = defaultStartupOptions
    /**
     * Check if the data store (vuex store) has already been initialized
     * If not, it'll be initialized
     * @param {IAppStartupOptions} startupOptions : see interface
     */
    public checkStore(startupOptions?: IAppStartupOptions): void {
        if (!AppStore.getters.app_is_initialized && !AppStore.getters.app_is_loading) {
            if (startupOptions) this.StartupOptions = startupOptions
            AppStore.dispatch(AppStoreActions.APP_FETCH_INITIAL_DATA, this.StartupOptions)
                    .catch(error => {
                        console.error("JMapAPI : checkStore/APP_FETCH_INITIAL_DATA ; " + error)
                    })
        } else {
            console.warn("JMapAPI : data are " + (AppStore.getters.app_is_loading ? "loading" : "loaded"))
        }
    }
}

const apiData: IJMapApiData = new JMapApiData()

/************* API COMPONENT *************/

interface IJMapApiComponentItem<C extends VueConstructor<Vue>> {
    create(containerId: string, options: any): Vue|undefined
    destroy(containerId: string): void
    getInstance(containerId: string): Vue|undefined
}

/**
 * An instance for each components we want to export in the API
 * will be created. Ex of creation :
 *   -> new JMapApiComponentItem(ComponentLayerListPanel, "layer-list-panel")
 */
class JMapApiComponentItem<C extends VueConstructor<Vue>> implements IJMapApiComponentItem<C> {
    private template: string
    private configuration: C
    private instanceByContainerId: IMap<Vue> = new Map<Vue>()
    /**
     * @constructor
     * @param {VueConstructor<Vue>} configuration : component configuration exported by the .vue file
     * @param {String} template : the vuejs template for instantiation. Ex "layer-panel"
     */
    constructor(configuration: C, template: string) {
        this.template = template
        this.configuration = configuration
    }
    /**
     * Check if the data store has been initialized, if not it is
     * Then create an instance of the component in the html element with id containerId
     * Finally store the new instance in the instanceByContainerId map
     */
    public create(containerId: string, options: any): Vue|undefined {
        if (! containerId) {
            console.error("JMapAPI : Missing container identifier"); return
        }
        if (this.instanceByContainerId.contains(containerId)) {
            console.warn("JMapAPI : instance already instantiate in this container"); return
        }
        apiData.checkStore()
        const instance: Vue|undefined = new Vue({
            el: "#" + containerId,
            template: `<${this.template} id="${containerId}"/>`,
            store: AppStore,
            components: {
                [this.template]: this.configuration,
            },
        })
        if (instance) this.instanceByContainerId.put(containerId, instance)
        return instance
    }
    /**
     * This function will be used to delete the Vue Component javascript object in the browser
     * And make the container div empty
     * 
     * @param {IStringMap<Vue>} instanceByContainerId : The map containerId<=>Vue instance of a particular VueComponent
     * @param {String} containerId : DOM id of the container of the component
     */
    public destroy(containerId: string): void {
        if (this.instanceByContainerId.contains(containerId)) {
            const instance: Vue = this.instanceByContainerId.get(containerId)
            this.instanceByContainerId.remove(containerId)
            if (instance) instance.$destroy()
            try {
                const div: HTMLElement|null = document.getElementById(containerId)
                if (div) div.innerHTML = ""
            } catch (error) {
                console.error("JMapAPI : JMapApiComponentItem destroy ; " + error)
            }
        }
    }
    public getInstance(containerId: string): Vue|undefined {
        if (! containerId) {
            console.error("JMapAPI : Missing container identifier"); return
        }
        return this.instanceByContainerId.get(containerId)
    }
}

/**
 * The aggregation of all IJMapApiComponentItem implementations
 * New classes for component has to be added here
 */
interface IJMapApiComponent {
    LayerListPanel: IJMapApiComponentItem<VueConstructor<Vue>>,
    JMapLogo: IJMapApiComponentItem<VueConstructor<Vue>>,
}

const apiComponent: IJMapApiComponent = {
    LayerListPanel: new JMapApiComponentItem(ComponentLayerListPanel, "layer-list-panel"),
    JMapLogo: new JMapApiComponentItem(ComponentJMapLogo, "jmap-logo"),
}

/************* API APPLICATION *************/

interface IJMapApiApplication {
    ContainerId: string
    Instance: Vue|undefined
    start(containerId?: string, startupOptions?: IAppStartupOptions): void
}

class JMapApiApplication implements IJMapApiApplication {
    public ContainerId: string = "app"
    public Instance: Vue|undefined = undefined
    /**
     * Start the JMAP Application (maybe on prod soon)
     * 
     * @param {String} containerId : the dom div id
     * @param {IAppStartupOptions} startupOptions : 
     */
    public start(containerId?: string, startupOptions?: IAppStartupOptions): void {
        if (this.Instance) {
            console.warn("JMapAPI : application has already been initialized")
            return
        }
        if (!containerId) containerId = "app"
        this.ContainerId = containerId
        apiData.checkStore(startupOptions)
        this.Instance = new Vue({
            el: "#" + this.ContainerId, // Where Vue App will be inserted in the DOM
            template: "<app></app>",    // <app> lowerCamelCase string of name in components
            store: AppStore,            // All App children will have the store injected
            components: {
                app: ComponentApp,      // It's an SPA so only the app component here
            },
        })
    }
}

const apiApplication: IJMapApiApplication = new JMapApiApplication()

/************* API *************/

/**
 * Definition of the root elements of the API
 */
interface IJMapApi {
    Data: IJMapApiData
    Application: JMapApiApplication
    Component: IJMapApiComponent
}

/**
 * That class is what will be exported in JMapAPI global variable
 */
class JMapApi implements IJMapApi {
    public Data: IJMapApiData = apiData
    public Component: IJMapApiComponent = apiComponent
    public Application: JMapApiApplication = apiApplication
}

let apiJMap: JMapApi
if (windowVar.hasOwnProperty("JMapAPI")) {  // API has already been initialized
    apiJMap = windowVar.JMapAPI
} else {
    apiJMap = new JMapApi()
    if (JMapAppStartupOptions) {
        const autoStart: boolean|undefined = JMapAppStartupOptions.autoStartApp
        if (autoStart) apiJMap.Application.start()
    }
}

/************* API EXPORT *************/

windowVar.JMapAPI = apiJMap // Will be visible by everybody

export default apiJMap      // we have to export something
