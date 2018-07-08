<script>
	import Spiner from './Spinner.vue'
	import ModalConfirm from './ModalConfirm.vue'
	import WarnTag from './WarnTag.vue'

	export default {
		components:{
			Spiner,
			ModalConfirm,
			WarnTag
		},
		data(){
			return {
				spiner: false,
				errorMessage: 'Las credenciales no coinciden.',
				error: false,
				email:'',
				noValidEmail: false

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
			sendEmail(){
				let self = this
				if(!Is.email(this.email)){
					this.noValidEmail = true
				}

				if(this.noValidEmail){
					setTimeout(function(){
						self.noValidEmail = false
					}, 3000)

					return false
				}
			}
		}
	}
</script>

<template class="padding0">
	<section class="back-pattern height100vh padding0">
	<Spiner v-if="spin"></Spiner>
	<ModalConfirm v-if="false"></ModalConfirm>

		<article class="font1-3em flex flex-center relative flex-middle back-pattern">
			<transition appear name="custom-classes-transition" appear-active-class="animated flipInY" enter-active-class="animated flipInY" leave-active-class="">
				<article class="relative" style="top:90px;">
					<div class="margin-bottom30">
						
						<figure class="center-block relative" style="width: 120px;">

						<div class="square30 pointer absolute rounded flex flex-center flex-middle color-yellow border2" style="top:40%; left:-100px;" @click="goBack">
							<span class="rounded ion-arrow-left-c font1-5em "></span>
						</div>
							<img class="width100" src="./dist/img/promotoria-tenerife-logo.svg" alt="Logo tenerife">
						</figure>
					</div>

					
					<div id="login-form" class="flex flex-column flex-middle flex-center">
					<div class="margin-bottom30" style="width: 440px;">
						<p class="color-white text-center">Ingresa el correo electrónico de la cuenta que deseas recuperar contraseña.</p>
					</div>

					<div class="margin-bottom30" style="width: 440px;">
						<p class="color-gray text-center">Si el usuario está registrado, se inviará un link al correo electrónico para recuperar la contraseña.</p>
					</div>

						<div class="flex width100 margin-bottom10">
							<h3 class="color-white margin-left10 font-normal font1em color-gray">Correo electrónico</h3>
						</div>
						<div class="relative center-block margin-bottom30">
							<span>
								<span class="fa fa-user color-darkgray font20 margin10" style="position:absolute; margin: 14px"></span>
							</span>
							<WarnTag msg="Ingresa un email válido" v-if="noValidEmail" class="absolute" style="top:-40px;"></WarnTag>
							<input type="text"
							class="padding-left35 my-input back-white margin-bottom25 color-black"
							  style="width: 400px;" v-model="email">
						</div>
						

						<button class="my-btn pointer back-yellow text-uppercase color-black font-bold"
						 style="width:200px;" @click="sendEmail">
							Enviar
						</button>

					</div>

					<div class="padding20"></div>

				</article>
			</transition>
		</article>
	</section>
</template>

