<script>
	import Spiner from './Spinner.vue'
	import CartItem from './CartItem.vue'

	export default {
		components:{
			Spiner,
			CartItem
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
	<section class="padding0 back-white">
		<Spiner v-if="spiner"></Spiner>
		<article class="back-darkblack flex padding15 flex-middle">
			<div class="square30 rounded back-yellow flex flex-middle flex-center">
				<span class="ion-arrow-left-b color-black font1-5em relative" style="left:-1px;"></span>
			</div>
			<h2 class="color-white padding-left10 font-normal text-uppercase font1-3em">Carrito</h2>
		</article>


		<article class="flex flex-right padding20">
			<div class="flex flex-middle">
				<textarea class="my-input" rows="4"></textarea>
				<button class="my-btn pointer back-yellow text-uppercase color-black font-bold" style="width:220px; background:#fff;">
					Solicitar Cotización
				</button>
			</div>
		</article>


		<article class="padding20">
			<section>
		    	<article class="flex">
			    	<div class="width100 flex flex-middle padding20" style="">
			    		<p class="color-gray font1em font-bold text-uppercase" style="font-size:1em;">Nombre</p>
			    	</div>

			    	<div class="flex flex-middle flex-center width100 padding20" style="  padding:0 15px;">
			    		<p class="color-gray font-bold text-center text-uppercase" style="width:70px;">CD</p>
			    	</div>

			    	<div class="flex flex-middle flex-center width100 padding20" style="  padding:0 15px;">
			    		<p class="color-gray font1em font-bold text-center text-uppercase" style="width:70px;">Bloque</p>
			    	</div>

			    	<div class="flex flex-middle flex-center width100 padding20" style="  padding:0 15px;">
			    		<p class="color-gray font1em font-bold text-center text-uppercase" style="width:70px;">Cant. Disp.</p>
			    	</div>

			    	<div class="flex flex-middle flex-center width100 padding20" style="  padding:0 15px;">
			    		<p class="color-gray text-uppercase font1em font-bold text-center" style="width:70px;">total <span class="mts2">m</span></p>
			    	</div>

			    	<div class="flex flex-middle flex-center width100 padding20" style="  padding:0 15px;">
			    		<p class="color-gray font1em font-bold text-center text-uppercase" style="width:70px;">Medidas</p>
			    	</div>

			    	<div class="flex flex-middle flex-center width100 padding20" style="  padding:0 15px;">
			    		<p class="color-gray font1em font-bold text-center text-uppercase" style="width:70px;">Cant.  </p>
			    	</div>

			    	<div class="flex flex-middle flex-center width100 padding20" style="  padding:0 15px;">
			    		<p class="color-gray font1em font-bold text-center text-uppercase" style="width:70px;"><span class="mts2">m</span></p>
			    	</div>

			    	<div class="flex flex-middle flex-center width100 padding20" style="  padding:0 15px;">
			    		<p class="color-gray font1em font-bold text-center text-uppercase" style="width:70px;"></p>
			    	</div>

			    	<div class="flex flex-middle flex-center width100 padding20" style="  padding:0 15px;">
			    		<p class="color-gray font1em font-bold text-center text-uppercase" style="width:70px;"></p>
			    	</div>
			    </article>
		    </section>

		    <section v-for="i in 3">
		    	<CartItem></CartItem>
		    </section>


		</article>

		
	</section>
</template>
