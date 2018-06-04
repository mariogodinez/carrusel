<script>
	import Spiner from './Spinner.vue'

	export default {
		components:{
			Spiner,
		},
		data(){
			return {

				spiner: false,
				edit: false,
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
			changeEdit(value){
				this.edit = value
			},
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
	<section class="padding0 back-white height100vh">
		<Spiner v-if="spiner"></Spiner>
		<article class="back-darkblack flex flex-between flex-middle">
			<h2 class="color-white padding-left20 font-normal text-uppercase font1-3em">Perfil</h2>
			<button class="my-btn back-yellow flex flex-middle" v-if="!edit" @click="changeEdit(true)" style="border-radius:0; padding:1em;">
				<span class="ion-compose font1-3em margin-right5"></span>
				<span class="font-bold text-uppercase">Editar</span>
			</button>

			<button class="my-btn back-yellow flex flex-middle opacity0" v-if="edit" style="border-radius:0; padding:1em;">
				<span class="ion-compose font1-3em margin-right5"></span>
				<span class="font-bold text-uppercase">Editar</span>
			</button>
		</article>


		<section class=" relative">
			<transition name="custom-classes-transition" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
				<article v-if="!edit" style="top:0;" class="absolute width100">
					<div class="padding15">
						<h3 class="font1 font-normal margin-left20"> <span class="font1em">Nombre:</span> <span class="font1-3em">Juan Manuel Perez</span></h3>
					</div>

					<div class="padding15 back-lightgray">
						<h3 class="font1 font-normal margin-left20"> <span class="font1em">Correo electrónico:</span> <span class="font1-3em">JuanManuelPerez@email.com</span></h3>
					</div>

					<div class="padding15">
						<h3 class="font1 font-normal margin-left20"> <span class="font1em">Contraseña:</span> <span class="font1-3em">********</span></h3>
					</div>

					<div class="padding15 back-lightgray">
						<h3 class="font1 font-normal margin-left20"> <span class="font1em">Celular:</span> <span class="font1-3em anchor">234536562</span></h3>
					</div>
				</article>
			</transition>

			<transition name="custom-classes-transition" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
				<article v-if="edit" style="top:0;" class="absolute width100">
					<div class="padding15 flex flex-middle">
						<h3 class="font1 font-normal margin-left20" style="width:200px;"> <span class="font1em">Nombre:</span></h3>
						<div>
							<input style="background:#fff;" type="text" class="my-input" name="">
						</div>
					</div>

					<div class="padding15 back-lightgray flex flex-middle">
						<h3 class="font1 font-normal margin-left20" style="width:200px;"> <span class="font1em">Correo electrónico:</span></h3>
						<div>
							<input style="background:#fff;" type="text" class="my-input" name="">
						</div>
					</div>

					<div class="padding15 flex flex-middle">
						<h3 class="font1 font-normal margin-left20" style="width:200px;"> <span class="font1em">Contraseña:</span></h3>
						<div>
							<input style="background:#fff;" type="text" class="my-input" name="">
						</div>
					</div>
					<div class="padding15 back-lightgray flex flex-middle">
						<h3 class="font1 font-normal margin-left20" style="width:200px;"> <span class="font1em">Confirmar Contraseña:</span></h3>
						<div>
							<input style="background:#fff;" type="text" class="my-input" name="">
						</div>
					</div>

					<div class="padding15 flex flex-middle">
						<h3 class="font1 font-normal margin-left20" style="width:200px;"> <span class="font1em">Celular:</span></h3>
						<div>
							<input style="background:#fff;" type="text" class="my-input" name="">
						</div>
					</div>

					<div class="padding15 flex flex-middle">
					<div style="width:200px;"></div>
						<div class="margin-left20">
							<button class="my-btn text-uppercase back-yellow font-bold">Guardar</button>
						</div>
						<h3 class="font1 font-normal margin-left20 text-uppercase anchor" @click="changeEdit(false)"> <span class="font1em">Cancelar</span></h3>
						
					</div>
				</article>
			</transition>
		</section>

		
	</section>
</template>
