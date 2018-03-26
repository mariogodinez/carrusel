// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import store from './store.js'
import App from './App.vue'
import Login from './components/Login.vue'
import LoginAdmin from './components/LoginAdmin.vue'
import SellerIndicators from './components/SellerIndicators.vue'
import Prospect from './components/Prospect.vue'
import AddProspect from './components/AddAsProspect.vue'
import ProspectsContacted from './components/ProspectsContacted.vue'
import CotizationsSells from './components/CotizationsSells.vue'
import Cuotas from './components/Cuotas.vue'
import AsignGoals from './components/AsignGoals.vue'
import ChargeUsers from './components/ChargeUsers.vue'


window.axios = require('axios')
window.Is = require('is_js')

// window.onbeforeunload = function(){
//   localStorage.removeItem('tokenOrkestra')
// }

let prodApi = 'https://ghjffh.local/api/'
let domain = '//orkestra.back'
let devApi = domain + '/api/v1'

window.apiUrl =  devApi

axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.tokenOA;
// axios.defaults.timeout                         = 8000;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Content-Type'] = 'application/json'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
// axios.defaults.headers.common['Accept'] = 'application/json, text/plain, */*'
// axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


import VueRouter from 'vue-router'
Vue.use(VueRouter)

function scrollTop (to,from,next){
  let body = document.querySelector('body')
  let html = document.querySelector('html')
  body.scrollTop = 0
  html.scrollTop = 0
  next()
}


let routes = [
  {path: '/usuario/login', component: Login, beforeEnter:scrollTop},
  {path: '/usuario/indicadores-vendedor', component: SellerIndicators, beforeEnter:scrollTop},
  {path: '/usuario/prospectar', component: Prospect, beforeEnter:scrollTop},
  {path: '/usuario/agregar-prospecto', component: AddProspect, beforeEnter:scrollTop},
  {path: '/usuario/prospectos-contactados', component: ProspectsContacted, beforeEnter:scrollTop},
  {path: '/usuario/cotizaciones-ventas', component: CotizationsSells, beforeEnter:scrollTop},
  {path: '/usuario/cuotas', component: Cuotas, beforeEnter:scrollTop},
  {path: '/asignar-metas', component: AsignGoals, beforeEnter:scrollTop},

  // Admin data
  {path: '/admin/login', component: LoginAdmin, beforeEnter:scrollTop},
  {path: '/admin/cargar-usuarios', component: ChargeUsers, beforeEnter:scrollTop}

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
  render: (h) => h(App),
  created(){

  }
})

  Vue.component('pagination', require('laravel-vue-pagination'));


/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */
//window.io = require('socket.io')
import Echo from 'laravel-echo'
window.io   = require('socket.io-client');
window.Echo = new Echo({
    broadcaster: 'socket.io',
    /*host: {
        path: '/socket.io'
    }*/
    //Aveces en servidor de producción la configuración de arriba es la apropiada
    //si es así comentar la siguiente línea y descomentar la de arriba
    host: domain + ':6001'
});

//Para tiempo real
//Echo.connector.options.auth.headers['Authorization'] = 'Bearer ' + localStorage.tokenOA
window.Echo.channel('check-proy').listen('.check-proy', function (e) {
    if( e.isDown==true ){
        window.location.reload();
    }
});
