<script>
	import Spiner from './Spinner.vue'
	import ModalSuccess from './ModalSuccess.vue'
	import ModalError from './ModalError.vue'


	export default {
		components:{
			Spiner,
			ModalSuccess,
			ModalError
		},
		data(){
			return {

				spin: false,
				edit: false,
				errorMessage: 'Ha ocurrido un error al guardar el usuario. Intenta nuevamente.',
				error: false,
				user: null,
				success: false,
				password:'',
				repeatPassword:''

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
			editUser(){
				let self = this


				if(this.password !== this.repeatPassword){
					this.error = true
					this.errorMessage = 'Las contraseñas no coinciden. Por favor verifícalas.'
					setTimeout(function(){
								self.error = false
							},3000)
					return false
				}

				let obj = this.user

				obj.password = this.password

				this.spin = true
				setTimeout(function(){
					axios.post(apiUrl + '/api/update_client/' + self.user.id, obj)
						.then(res=>{
							console.log(res)
							self.spin = false
							self.success = true
							localStorage.user = JSON.stringify(res.data.user)
							self.$store.dispatch('setUser', res.data.user)

							setTimeout(function(){
								self.success = false
							},3000)
						})
						.catch(err=>{
							console.log(err.response)
							self.spin = false
							self.error = true
							console.log(err.response.data.status)
							if(err.response.data.code == 422){
								self.errorMessage = err.response.data.error
								
							}
							setTimeout(function(){
								self.error = false
							},3000)
						})
				}, 500)
				
			}
		},
		created(){
			this.user = this.$store.getters.userInfo
		}
	}
</script>

<template class="padding0">
	<section class="padding0 back-white height100vh">
		<Spiner v-if="spin"></Spiner>

		<ModalSuccess v-if="success" msg="Se ha guardado el usuario de forma correcta"></ModalSuccess>

		<ModalError v-if="error" :msg="errorMessage"></ModalError>
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
						<h3 class="font1 font-normal margin-left20"> <span class="font1em">Nombre:</span> <span class="font1-3em">{{user.name}}</span></h3>
					</div>

					<div class="padding15 back-lightgray">
						<h3 class="font1 font-normal margin-left20"> <span class="font1em">Correo electrónico:</span> <span class="font1-3em">{{user.email}}</span></h3>
					</div>

					<div class="padding15">
						<h3 class="font1 font-normal margin-left20"> <span class="font1em">Contraseña:</span> <span class="font1-3em">********</span></h3>
					</div>

					<div class="padding15 back-lightgray">
						<h3 class="font1 font-normal margin-left20"> <span class="font1em">Celular:</span> <span class="font1-3em anchor">{{user.phone}}</span></h3>
					</div>
				</article>
			</transition>

			<transition name="custom-classes-transition" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
				<article v-if="edit" style="top:0;" class="absolute width100">
					<div class="padding15 flex flex-middle">
						<h3 class="font1 font-normal margin-left20" style="width:200px;"> <span class="font1em">Nombre:</span></h3>
						<div>
							<input style="background:#fff;" type="text" class="my-input" v-model="user.name">
						</div>
					</div>

					<div class="padding15 back-lightgray flex flex-middle">
						<h3 class="font1 font-normal margin-left20" style="width:200px;"> <span class="font1em">Correo electrónico:</span></h3>
						<div>
							<input style="background:#fff;" type="text" class="my-input" v-model="user.email">
						</div>
					</div>

					<div class="padding15 flex flex-middle">
						<h3 class="font1 font-normal margin-left20" style="width:200px;"> <span class="font1em">Contraseña:</span></h3>
						<div>
							<input style="background:#fff;" type="password" class="my-input" name="" v-model="password">
						</div>
					</div>
					<div class="padding15 back-lightgray flex flex-middle">
						<h3 class="font1 font-normal margin-left20" style="width:200px;"> <span class="font1em">Confirmar Contraseña:</span></h3>
						<div>
							<input style="background:#fff;" type="password" class="my-input" v-model="repeatPassword">
						</div>
					</div>

					<div class="padding15 flex flex-middle">
						<h3 class="font1 font-normal margin-left20" style="width:200px;"> <span class="font1em">Celular:</span></h3>
						<div>
							<input style="background:#fff;" type="text" class="my-input" v-model="user.phone">
						</div>
					</div>

					<div class="padding15 flex flex-middle">
					<div style="width:200px;"></div>
						<div class="margin-left20">
							<button @click="editUser" class="my-btn text-uppercase back-yellow font-bold">Guardar</button>
						</div>
						<h3 class="font1 font-normal margin-left20 text-uppercase anchor" @click="changeEdit(false)"> <span class="font1em">Cancelar</span></h3>
						
					</div>
				</article>
			</transition>
		</section>

		
	</section>
</template>
