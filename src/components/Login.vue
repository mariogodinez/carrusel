<script>
	// import ModalError from './ModalError.vue'
	import Spinner from './Spinner.vue'
	import WarnTag from './WarnTag.vue'
	import ErrorTag from './ErrorTag.vue'


	export default {
		components:{
			// ModalError,
			Spinner,
			WarnTag,
			ErrorTag
		},
		data(){
			return {

				spin: false,
				show1: false,
				show2: false,
				show3: false,
				show4: false,
				show5: false,
				userInfo: {
					email: 'c.torres@unexpect.mx',
					password: 'holaadmin',
					no_empleado: null,
					type: 'usuario'
				},
				errorMessage: 'Las credenciales no coinciden.',
				error: false,
				noValid:{
					email:{
						showWarn: false,
						showError: false,
						msg: ''
					},
					password:{
						showWarn: false,
						showError: false,
						msg: ''
					},
					seller:{
						showWarn: false,
						showError: false,
						msg: ''
					},
				}

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
			showInfo(){
				let self = this
				setTimeout(function(){
					self.show1 = true
				},300)

				setTimeout(function(){
					self.show2 = true
				},1000)

				setTimeout(function(){
					self.show3 = true
				},1500)

				setTimeout(function(){
					self.show4 = true
				},1900)

				setTimeout(function(){
					self.show5 = true
				},2300)

			},
			login(){
				let self = this


				if(Is.empty(this.userInfo.email)){
					this.noValid.email.showWarn = true
				}

				if(!Is.empty(this.userInfo.email) && !Is.email(this.userInfo.email)){
					this.noValid.email.showWarn = true
					this.noValid.email.msg = 'Email incorrecto'
				}

				if(Is.empty(this.userInfo.password)){
					this.noValid.password.showWarn = true
				}


				// Reset all warns
				if(
					this.noValid.email.showWarn ||
					this.noValid.email.showError ||
					this.noValid.password.showWarn ||
					this.noValid.password.showError
				){
					setTimeout(function(){
						self.noValid.email.showWarn = false
						self.noValid.password.showWarn = false
					},3500)
					return false

				}
				self.spin = true
				axios.post(apiUrl + '/auth/login',
					self.userInfo)
					.then(res => {
						self.spin = false
						if( res.data.success==true ){
							localStorage.typeOA = 'usuario';
							localStorage.tokenOA = res.data.access_token;
							localStorage.userOA = JSON.stringify(res.data.user)
							self.$router.replace('/usuario/indicadores-vendedor')
							self.$store.dispatch('setLogged', true)
							axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.tokenOA;

							/*
							//Ejemplo para Tiempo Real
							Echo.connector.options.auth.headers['Authorization'] = 'Bearer ' + res.data.access_token;
							Echo.leave('user.'+res.data.user.id);
							Echo.private('user.'+res.data.user.id).listen('.server.created', function (e) {
							    console.log('listen')
							    console.log(e)
							});*/
						}
					})
					.catch(err => {
						self.spin = false
						console.log(err.response)
					})
			}
		},
		mounted(){
			this.showInfo()
		}
	}
</script>

<template class="padding0">
	<section class="back-darkblue height100vh padding0" style="overflow-y:hidden !important; padding-top: 0px !important;">
	<Spinner v-if="spin"></Spinner>
	<ModalError v-if="error" :errorMessage="errorMessage" @closeModal="error = false"></ModalError>

		<article class="font1-3em flex flex-center relative flex-middle back-pattern height100" style="top:-40px;">

				<article class="login">

					<transition appear name="custom-classes-transition" appear-active-class="animated flip" enter-active-class="animated flip" leave-active-class="">
						<div class="margin-bottom50" v-if="show1">
							<figure class="center-block" style="width: 300px;">
								<img class="width100" src="./dist/img/logo-white.png" alt="Orkestra logo">
							</figure>
						</div>
					</transition>
					<div id="login-form" class="flex flex-column flex-middle flex-center">
						<transition appear name="custom-classes-transition" appear-active-class="animated flipInX" enter-active-class="animated flipInX" leave-active-class="">
							<div class="relative center-block margin-bottom15" v-if="show2">
								<WarnTag :msg="noValid.email.msg" v-if="noValid.email.showWarn" style="position:absolute; top:-39px;"></WarnTag>
								<ErrorTag :msg="noValid.email.msg" v-if="noValid.email.showError" style="position:absolute; top:-39px;"></ErrorTag>
								<input type="text"
								class="padding-left35 my-input text-center back-white margin-bottom25 color-black"
								  v-model="userInfo.email" placeholder="Usuario" style="width: 300px; ">
							</div>
						</transition>
						<transition appear name="custom-classes-transition" appear-active-class="animated flipInX" enter-active-class="animated flipInX" leave-active-class="">
							<div class="relative center-block margin-bottom15" v-if="show3">
							<WarnTag :msg="noValid.seller.msg" v-if="noValid.seller.showWarn" style="position:absolute; top:-39px;"></WarnTag>
								<ErrorTag :msg="noValid.seller.msg" v-if="noValid.seller.showError" style="position:absolute; top:-39px;"></ErrorTag>

								<input type="text"
								class="padding-left35 my-input text-center back-white  color-black"
								placeholder="No. de empleado" v-model="userInfo.no_empleado" style="width: 300px">
							</div>
						</transition>

						<transition appear name="custom-classes-transition" appear-active-class="animated flipInX" enter-active-class="animated flipInX" leave-active-class="">
							<div class="relative center-block margin-bottom30" v-if="show4">
								<WarnTag :msg="noValid.password.msg" v-if="noValid.password.showWarn" style="position:absolute; top:-39px;"></WarnTag>
								<ErrorTag :msg="noValid.password.msg" v-if="noValid.password.showError" style="position:absolute; top:-39px;"></ErrorTag>

								<input type="password"
								class="padding-left35 my-input text-center back-white  color-black"
								 v-model="userInfo.password" placeholder="Contraseña" style="width: 300px">
							</div>
						</transition>
						<transition appear name="custom-classes-transition" appear-active-class="animated flipInX" enter-active-class="animated flipInX" leave-active-class="">
							<div class="relative margin-bottom30 width100" v-if="show5">
								<button class="my-btn border2white width100 pointer back-blue text-uppercase color-black font-bold"
						  @click="login">
									 <h3 class="font1em color-white">Iniciar sesión</h3>
								</button>

							</div>
						</transition>


					</div>

					<!-- <div class="password-actions flex flex-column flex-middle margin20">
						<router-link to="" class="anchor color-yellow margin-bottom10">
							Olvidé mi contraseña
						</router-link>
					</div> -->
				</article>
		</article>
	</section>
</template>


<style>

</style>
