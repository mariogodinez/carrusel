<script>
	import Spiner from './Spinner.vue'
	import ModalSuccess from './ModalSuccess.vue'

	export default {
		components:{
			Spiner,
			ModalSuccess
		},
		data(){
			return {
				userInfo: {
					'email': '',
				    'phone': '',
				    'name': '',
				    'password': ''
				},
				password_confirmation:'',
				errorMessage: 'Las credenciales no coinciden.',
				error: false,
				success:false,
				spin: false

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
			goBack(){
				this.$router.go(-1)
			},
			register(){
				let self = this
				this.spin = true
				axios.post(apiUrl + '/register', self.userInfo)
					.then(res =>{
						console.log(res)
						self.spin = false
						if(res.data.code == 201){
							self.success = true
							setTimeout(function(){
								self.success = false
								setTimeout(function(){
									self.$router.replace('/login')
								},1000)
							},4000)
						}
						
					})	
					.catch(err =>{
						console.log(err.response)
						self.spin = false
					})			

			}
		}
	}
</script>

<template class="padding0">
	<section class="back-pattern height100vh padding0">
	<Spiner v-if="spin"></Spiner>
	<ModalSuccess v-if="success"></ModalSuccess>

		<article class="font1-3em flex flex-center relative flex-middle back-pattern">
			<transition appear name="custom-classes-transition" appear-active-class="animated flipInY" enter-active-class="animated flipInY" leave-active-class="">
				<article class="relative" style="top:0px;">
					<div class="margin-bottom30">
						
						<figure class="center-block relative" style="width: 140px;">

						<div class="square30 pointer absolute rounded flex flex-center flex-middle color-yellow border2" style="top:40%; left:-100px;" @click="goBack">
							<span class="rounded ion-arrow-left-c font1-5em "></span>
						</div>
							<img class="width100" src="./dist/img/logo-tenerife.png" alt="Logo tenerife">
						</figure>
					</div>
					<div id="login-form" class="flex flex-column flex-middle flex-center">
						<div class="flex width100 margin-bottom10">
							<h3 class="color-white font-normal">Nombre</h3>
						</div>
						<div class="relative center-block margin-bottom15">
							<span>
								<span class="fa fa-user color-darkgray font20 margin10" style="position:absolute; margin: 14px"></span>
							</span>
							<input type="text"
							class="padding-left35 my-input back-white margin-bottom25 color-black"
							  v-model="userInfo.name" style="width: 300px;">
						</div>
						<div class="flex width100 margin-bottom10">
							<h3 class="color-white font-normal">Celular</h3>
						</div>
						<div class="relative center-block margin-bottom30">
							<span>
								<span class="fa fa-lock color-darkgray font20" style="position:absolute; margin: 14px"></span>
							</span>
							<input type="text"
							class="padding-left35 my-input back-white  color-black"
							 v-model="userInfo.phone" style="width: 300px">
						</div>

						<div class="flex width100 margin-bottom10">
							<h3 class="color-white font-normal">Correo</h3>
						</div>
						<div class="relative center-block margin-bottom30">
							<span>
								<span class="fa fa-lock color-darkgray font20" style="position:absolute; margin: 14px"></span>
							</span>
							<input type="text"
							class="padding-left35 my-input back-white  color-black"
							 v-model="userInfo.email" style="width: 300px">
						</div>


						<div class="flex width100 margin-bottom10">
							<h3 class="color-white font-normal">Crear contraseña</h3>
						</div>
						<div class="relative center-block margin-bottom30">
							<span>
								<span class="fa fa-lock color-darkgray font20" style="position:absolute; margin: 14px"></span>
							</span>
							<input type="password"
							class="padding-left35 my-input back-white  color-black"
							 v-model="userInfo.password" style="width: 300px">
						</div>

						<div class="flex width100 margin-bottom10">
							<h3 class="color-white font-normal">Confirmar contraseña</h3>
						</div>
						<div class="relative center-block margin-bottom30">
							<span>
								<span class="fa fa-lock color-darkgray font20" style="position:absolute; margin: 14px"></span>
							</span>
							<input type="password"
							class="padding-left35 my-input back-white  color-black"
							 v-model="password_confirmation" style="width: 300px">
						</div>


						<button class="my-btn pointer back-yellow text-uppercase color-black font-bold"
						 style="width:200px; padding:1em;" @click="register">
							Registrarme
						</button>

					</div>

					<div class="padding20"></div>

				</article>
			</transition>
		</article>
	</section>
</template>

