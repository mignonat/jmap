import Vue from "vue"
import Vuex, { Store, StoreOptions, GetterTree, ActionTree, MutationTree } from "vuex"
import { AppStartupOptions, MapLayer, MapProjection, ActionItem } from "model/app"
import "material-design-icons/iconfont/material-icons.css"

// tell vue to use vuex plugin
Vue.use(Vuex)

/**
 * Define attributes structure of the root state
 */
interface RootState {
    isAppInitialized: boolean
    hasErrorAtStartup: boolean
    startupOptions?: AppStartupOptions
    layers: MapLayer[]
    projections: MapProjection[]
    actionItems: ActionItem[]
}

/**
 * The data returned by the server after initialization call
 */
interface AppInitResult {
    layers: MapLayer[]
    projections: MapProjection[],
    actionItems: ActionItem[]
}

/**
 * The vuex state object that'll contains all app global data
 */
const state: RootState = {
    isAppInitialized: false,
    hasErrorAtStartup: false,
    startupOptions: undefined,
    layers: [],
    projections: [],
    actionItems: []
}

/**
 * Keep all methods that modify the state there for re-use purpose
 * Like that the same methods can be called by multiple mutations
 */
const methods = {
    /**
     * Methods that trigger an Ajax call to get project's data at app startup
     * 
     * @param {AppStartupOptions} options : will be passed to server
     * @return Promise<AppInitResult>
     */
    initialize(options: AppStartupOptions): Promise<AppInitResult> {
        return new Promise<AppInitResult>((resolve, reject) => {
            // simulate a long ajax call
            setTimeout(() => resolve({
                layers: [{ 
                    name: 'Cities',
                    description: 'Display cities'
                },{ 
                    name: 'Countries',
                    description: 'Display countries border'
                }],
                projections: [{ name: 'WF83'}, { name: 'WF84'}],
                actionItems: [
                    {
                        name: 'edit',
                        action: 'edit',
                        description: 'Edit',
                        icon: 'mode_edit'
                    },{
                        name: 'select',
                        action: 'select',
                        description: 'Select',
                        icon: 'touch_app'
                    },{
                        name: 'color',
                        action: 'color',
                        description: 'Text color',
                        icon: 'format_color_text'
                    }
                ]
            }), 1000)
        })
    }
}

const getters: GetterTree<RootState, RootState> = {
    app_is_initialized : state => state.isAppInitialized,
    app_has_startup_error : state => state.hasErrorAtStartup,
    app_startup_options : state => state.startupOptions,
    app_layers : state => state.layers,
    app_projections : state => state.projections,
    app_action_items : state => state.actionItems
}

interface ActionInitializeResult {
    startupOptions: AppStartupOptions,
    initResult: AppInitResult
}

const actions: ActionTree<RootState, RootState> = {
    APP_INITIALIZE ({ commit }, options: AppStartupOptions) {
        return new Promise<string>((resolve, reject) => {
            try {
                methods.initialize(options)
                       .then((result: AppInitResult) => {
                            commit('APP_SET_INIT_DATA', {
                                startupOptions: options,
                                initResult: result
                            })
                            commit('APP_SET_INITIALIZED')
                            resolve()
                       })
                       .catch((error) => {
                            commit('APP_SET_STARTUP_ERROR')
                            reject('Action APP_INITIALIZE error : '+error)
                       })
            } catch (exception) {
                reject('Action APP_INITIALIZE exception : '+exception)
            }
        })
    }
}

const mutations: MutationTree<RootState> = {
    APP_SET_INITIALIZED(state: RootState): void {
        state.isAppInitialized = true
    },
    APP_SET_STARTUP_ERROR(state: RootState): void {
        state.hasErrorAtStartup = true
    },
    APP_SET_INIT_DATA(state: RootState, result: ActionInitializeResult): void {
        state.startupOptions = result.startupOptions
        state.layers = result.initResult.layers
        state.projections = result.initResult.projections
        state.actionItems = result.initResult.actionItems
    }
}

const storeOptions: StoreOptions<RootState> = {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
}

const store: Store<RootState> = new Store<RootState>(storeOptions)

export default store // will be provided to root Vue component