import Vue from "vue"
import Vuex, { Store, StoreOptions, GetterTree, ActionTree, MutationTree } from "vuex"
import { IAppStartupOptions, IMapLayer, IMapProjection, IActionItem } from "model/app"
import "material-design-icons/iconfont/material-icons.css"

// tell vue to use vuex plugin
Vue.use(Vuex)

/**
 * Define attributes structure of the root state
 */
interface IRootState {
    isAppInitialized: boolean
    hasErrorAtStartup: boolean
    startupOptions?: IAppStartupOptions
    layers: IMapLayer[]
    projections: IMapProjection[]
    actionItems: IActionItem[]
}

/**
 * The data returned by the server after initialization call
 */
interface IAppInitResult {
    layers: IMapLayer[]
    projections: IMapProjection[],
    actionItems: IActionItem[]
}

/**
 * The vuex state object that'll contains all app global data
 */
const rootState: IRootState = {
    isAppInitialized: false,
    hasErrorAtStartup: false,
    startupOptions: undefined,
    layers: [],
    projections: [],
    actionItems: [],
}

/**
 * Keep all methods that modify the state there for re-use purpose
 * Like that the same methods can be called by multiple mutations
 */
const methods = {
    /**
     * Methods that trigger an Ajax call to get project's data at app startup
     *
     * @param {IAppStartupOptions} options : will be passed to server
     * @return Promise<AppInitResult>
     */
    initialize(options: IAppStartupOptions): Promise<IAppInitResult> {
        return new Promise<IAppInitResult>((resolve, reject) => {
            // simulate a long ajax call
            setTimeout(() => resolve({
                layers: [{
                    name: "Cities",
                    description: "Display cities",
                } , {
                    name: "Countries",
                    description: "Display countries border",
                }],
                projections: [{ name: "WF83"}, { name: "WF84"}],
                actionItems: [
                    {
                        name: "edit",
                        action: "edit",
                        description: "Edit",
                        icon: "mode_edit",
                    } , {
                        name: "select",
                        action: "select",
                        description: "Select",
                        icon: "touch_app",
                    } , {
                        name: "color",
                        action: "color",
                        description: "Text color",
                        icon: "format_color_text",
                    },
                ],
            }), 1000)
        })
    },
}

const getters: GetterTree<IRootState, IRootState> = {
    app_is_initialized : state => state.isAppInitialized,
    app_has_startup_error : state => state.hasErrorAtStartup,
    app_startup_options : state => state.startupOptions,
    app_layers : state => state.layers,
    app_projections : state => state.projections,
    app_action_items : state => state.actionItems,
}

interface IActionInitializeResult {
    startupOptions: IAppStartupOptions
    initResult: IAppInitResult
}

const actions: ActionTree<IRootState, IRootState> = {
    APP_INITIALIZE({ commit }, options: IAppStartupOptions) {
        return new Promise<string>((resolve, reject) => {
            try {
                methods.initialize(options)
                       .then((result: IAppInitResult) => {
                            commit("APP_SET_INIT_DATA", {
                                startupOptions: options,
                                initResult: result,
                            })
                            commit("APP_SET_INITIALIZED")
                            resolve()
                       })
                       .catch(error => {
                            commit("APP_SET_STARTUP_ERROR")
                            reject("Action APP_INITIALIZE error : " + error)
                       })
            } catch (exception) {
                reject("Action APP_INITIALIZE exception : " + exception)
            }
        })
    },
}

const mutations: MutationTree<IRootState> = {
    APP_SET_INITIALIZED(state: IRootState): void {
        state.isAppInitialized = true
    },
    APP_SET_STARTUP_ERROR(state: IRootState): void {
        state.hasErrorAtStartup = true
    },
    APP_SET_INIT_DATA(state: IRootState, result: IActionInitializeResult): void {
        state.startupOptions = result.startupOptions
        state.layers = result.initResult.layers
        state.projections = result.initResult.projections
        state.actionItems = result.initResult.actionItems
    },
}

const storeOptions: StoreOptions<IRootState> = {
    state: rootState,
    getters,
    actions,
    mutations,
}

const store: Store<IRootState> = new Store<IRootState>(storeOptions)

export default store // will be provided to root Vue component
