
// Se importa vue
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const state = {
	logged: true,
	user: localStorage.user ? JSON.parse(localStorage.user) : {},
	cart: [],
	notifications: 0,
}

const mutations = {
	SET_LOGGED(state, value){
		state.logged = value
	},
	ADD_NOTIFICATIONS(state, value){
		state.notifications = value
	},
	SET_USER(state, value){
		state.user = value
	},
	ADD_CART(state, obj){
		state.cart = obj
	},
	REMOVE_CART(state, id){
		let newArr = state.cart.filter(function(item) { 
		    return item.id !== id
		})
		state.cart = newArr
	},
	ADD_COUNT(state, id){
		state.cart.forEach(function(item) { 
		    if(item.id == id){
		    	item.quantity ++
		    	
		    }

		})
	},
	REST_COUNT(state, id){
		state.cart.forEach(function(item) { 
		    if(item.id == id){
		    	if(item.quantity > 1 || item.quantity > '1'){
		    		item.quantity --
		    	}
		    }

		})
	}
	
	 
}

const getters = {
	userInfo(state){
		return state.user
	},
	logged(state){
		return state.logged
	},
	cartItems(state){
		return state.cart
	},
	notifications(state){
		return state.notifications
	}
}


const actions = {
	 setLogged({commit}, value){
	 	commit('SET_LOGGED', value)
	 },
	 setUser({commit}, value){
	 	commit('SET_USER', value)
	 },
	 addToCart({commit}, obj){
	 	commit('ADD_CART', obj)
	 },
	 addNotifications({commit}, value){
	 	commit('ADD_NOTIFICATIONS', value)
	 },
	 removeToCart({commit}, id){
	 	commit('REMOVE_CART', id)
	 },
	 addCount({commit}, id){
	 	commit('ADD_COUNT', id)
	 },
	 restCount({commit}, id){
	 	commit('REST_COUNT', id)
	 }
}



export default new Vuex.Store({
	state,
	mutations,
	getters,
	actions
});
