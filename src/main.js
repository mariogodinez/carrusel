// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import store from './store.js'
import App from './App.vue'
import Login from './components/Login.vue'
import Profile from './components/Profile.vue'
import Register from './components/Register.vue'
import Solicitud from './components/Solicitud.vue'
import ImgCarousell from './components/ImgCarousel.vue'
import RecoverPassword from './components/RecoverPassword.vue'
import ProductDetail from './components/ProductDetail.vue'
import Cart from './components/Cart.vue'

import Carousel3d from 'vue-carousel-3d';



window.axios = require('axios')
window.Is = require('is_js')

// window.onbeforeunload = function(){
//   localStorage.removeItem('tokenOrkestra')
// }

let prodApi = '---'
let domain = '---'
let devApi = null

window.apiUrl =  devApi

axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.tokenCT;
// axios.defaults.timeout                         = 8000;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Content-Type'] = 'application/json'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
// axios.defaults.headers.common['Accept'] = 'application/json, text/plain, */*'
// axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.use(Carousel3d);

function scrollTop (to,from,next){
  let body = document.querySelector('body')
  let html = document.querySelector('html')
  body.scrollTop = 0
  html.scrollTop = 0
  next()
}


let routes = [
  {path: '/login', component: Login, beforeEnter:scrollTop},
  {path: '/perfil', component: Profile, beforeEnter:scrollTop},
  {path: '/registro', component: Register, beforeEnter:scrollTop},
  {path: '/solicitar-cotizacion', component: Solicitud, beforeEnter:scrollTop},
  {path: '/carousell', component: ImgCarousell, beforeEnter:scrollTop},
  {path: '/recuperar-contrasena', component: RecoverPassword, beforeEnter:scrollTop},
  {path: '/detalle-producto', component: ProductDetail, beforeEnter:scrollTop},
  {path: '/carrito', component: Cart, beforeEnter:scrollTop},




]

let router = new VueRouter({
	routes,
	//mode: 'history',
	//history: true
})

let VueApp = new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  store,
  components:{
    'carousel-3d': Carousel3d.Carousel3d,
    'slide': Carousel3d.Slide
  },
  render: (h) => h(App),
  created(){

  }
})


  // Vue.component('pagination', require('laravel-vue-pagination'));

