<script>
	import Spiner from './Spinner.vue'

	export default {
		components:{
			Spiner,
		},
		data(){
			return {
				spiner: false,
				userInfo: {
					user: 'pros1',
					password: '1234'
				},
				errorMessage: 'Las credenciales no coinciden.',
				error: false

			}
		},
		computed:{
			logged(){
				return this.$store.getters.logged
			},
			url(){
				return window.url
			}
		},
		methods: {
			login(){
				let self = this
				
				if(this.userInfo.user != '' || this.userInfo.password != ''){

					this.spiner = true
					setTimeout(function(){
						axios.post(apiUrl + '/authenticate',  self.userInfo)
							.then(res => {
								self.spiner = false
								if(res.status == 200){
									localStorage.token = res.data.token
									localStorage.rol = res.data.rol

									
									// aqui validar rol como manager
									// if(true){ 
									// 	self.$router.replace('/indicadores-director')
									// 	return false
									// }

									if(res.data.rol == 'Promoter'){
										self.$router.replace('/indicadores-semanales')
									}

									if(res.data.rol == 'Guest'){
										self.$router.replace('/crear-preoportunidad')
									}
									window.location.reload()

									axios.get(apiUrl + '/check_session')
										.then(res =>{
											console.log(res)

										})
								}
							})
							.catch(err => {
								console.log(err.response)
								self.spiner = false
								self.error = true
							})
					},500)
				}
				


			}
		}
	}
</script>

<template class="padding0">
	<section class="back-black height100vh padding0" style="overflow-y:hidden !important; padding-top: 0px !important;">
	<Spiner v-if="spiner"></Spiner>

		
		<article class="font1-3em flex flex-center relative flex-middle back-pattern height100" style="top:-40px;">
			<transition appear name="custom-classes-transition" appear-active-class="animated fadeIn" enter-active-class="animated fadeIn" leave-active-class="">
				<article class="login">
					<div class="margin-bottom50">
						<figure class="center-block" style="width: 160px;">
							<img class="width100" src="./dist/img/promotoria-tenerife-logo.svg" alt="Logo tenerife">
						</figure>
					</div>
					<div id="login-form" class="flex flex-column flex-middle flex-center">
						<div class="flex width100 margin-bottom10">
							<h3 class="color-white font-normal">Usuario</h3>
						</div>
						<div class="relative center-block margin-bottom15">
							<span>
								<span class="fa fa-user color-darkgray font20 margin10" style="position:absolute; margin: 14px"></span>
							</span>
							<input type="text"
							class="padding-left35 my-input back-white margin-bottom25 color-black"
							  v-model="userInfo.user" style="width: 300px;">
						</div>
						<div class="flex width100 margin-bottom10">
							<h3 class="color-white font-normal">Contraseña</h3>
						</div>
						<div class="relative center-block margin-bottom30">
							<span>
								<span class="fa fa-lock color-darkgray font20" style="position:absolute; margin: 14px"></span>
							</span>
							<input type="password"
							class="padding-left35 my-input back-white  color-black"
							 v-model="userInfo.password" style="width: 300px">
						</div>
						<button class="my-btn pointer back-yellow text-uppercase color-black font-bold"
						 style="width:200px; padding:1em;" @click="login">
							Ingresar
						</button>

					</div>

					<!-- <div class="password-actions flex flex-column flex-middle margin20">
						<router-link to="" class="anchor color-yellow margin-bottom10">
							Olvidé mi contraseña
						</router-link>
					</div> -->
				</article>
			</transition>
		</article>
	</section>
</template>


<style>
	  .loader-wrap{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,.8);
  z-index: 100000000000;
}
.loader {
  color: #ff9000;
  position: relative;
  font-size: 20px;
  margin: 100px auto;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  -webkit-animation: load4 1.3s infinite linear;
  animation: load4 1.3s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
@-webkit-keyframes load4 {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
}
@keyframes load4 {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }


}
</style>