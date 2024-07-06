const state = {
	modelList:[],
	ind:0
 };
 const mutations = {
	addModelLists(state,payload){
		console.log('同步',JSON.parse(JSON.stringify(payload)).object.children);
		state.modelList=JSON.parse(JSON.stringify(payload)).object.children
	},
	setModelIndexs(state,payload){
		state.ind = payload
	}
 };
 const actions = {
	 addModelList({commit,state},type){
		console.log(type.children);
		// state.modelList=JSON.parse(JSON.stringify(type)).children
		// console.log(state.modelList);
		// commit('addModelLists',JSON.parse(JSON.stringify(type,{})))
	},
	setModelIndex({commit},type){
		commit('setModelIndexs',type)

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
 