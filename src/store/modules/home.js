import {SET_CHARS} from '../typeList'
const state = {
	window:'',
	mac:'',
	linux:''
 };
 const mutations = {
	addcharts(state,payload){
		console.log('同步',payload);
	}
 };
 const actions = {
	 addcharts({commit},type){
		console.log(type);
		commit('addcharts',[type])
	}
 };
 const getters = {
 
 };
 export default {
	 namespaced: true,
	 state,
	 mutations,
	 actions,
	 getters
 };
 