import Vue from 'vue'
import Vuex, { Store, StoreOptions, GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from './state'
import 'material-design-icons/iconfont/material-icons.css'

// tell vue to use vuex plugin
Vue.use(Vuex)

const state: RootState = {
    isLoading: false,
    layers: []
}

const getters: GetterTree<RootState, RootState> = {
    // todo
}

const actions: ActionTree<RootState, RootState> = {
    // todo
}

const mutations: MutationTree<RootState> = {
    // todo
}

const storeOptions: StoreOptions<RootState> = {
    state: state
}

const store: Store<RootState> = new Store<RootState>(storeOptions)

export default store // to provide to root Vue component