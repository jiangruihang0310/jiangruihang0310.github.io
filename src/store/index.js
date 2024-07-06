import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import home from './modules/home'
import chartsList from './modules/chartsList'
import model from './modules/model'
Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
		home,
		model,
		chartsList
    },
    plugins: [createPersistedState({
        paths: ['',] //
    })],
    strict: process.env.NODE_ENV !== 'production'
});
export default store;
