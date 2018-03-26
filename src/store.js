
// Se importa vue
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const state = {
	logged: false,
	user: {},
	notifications: null,
}

const mutations = {
	SET_LOGGED(state, value){
		state.logged = value
	},
	SET_NOTIFICATIONS(state, value){

		state.notifications = value
	}
	 
}

const getters = {
	userInfo(state){
		return state.user
	},
	logged(state){
		return state.logged
	},
	notifications(state){
		return state.notifications
	}
}


const actions = {
	 setLogged({commit}, value){
	 	commit('SET_LOGGED', value)
	 },
	 setNotifications({commit}, value){
	 	commit('SET_NOTIFICATIONS', value)
	 }
}



export default new Vuex.Store({
	state,
	mutations,
	getters,
	actions
});
