<script>
	import Spiner from './Spinner.vue'
	import CotizationItem from './CotizationItem.vue'

	export default {
		components:{
			Spiner,
			CotizationItem
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
		<article class="back-darkblack flex flex-between padding15-0 flex-middle">
			<h2 class="color-white padding-left20 font-normal text-uppercase font1-3em">Solicitud de cotización</h2>
		</article>


		<article class="flex flex-middle padding20">
			<div class="margin-right40">
				<h2 class="font1-3em">Juan Manuel Perez Robles</h2>
			</div>

			<div class="margin-right20">
				<h2 class="font1-3em font-normal">Correo: <span class="anchor">eldelasbrisa2@gmail.com</span></h2>
			</div>

			<div>
				<h2 class="font1-3em font-normal">Celular: <span class="anchor">32133332347</span></h2>
			</div>
		</article>

		<article class="padding20">
			<p class="margin-bottom5 font1-3em">Comentario del solicitante:</p>
			<p class="font1-3em"><em>Hola buen día, me interesan estos productos lo antes posible, gracias!</em></p>
		</article>


		<article class="padding20">
			<section>
		    	<article class="flex">
			    	<div class="width100 flex flex-middle padding20" style="">
			    		<p class="color-gray font1em font-bold text-uppercase" style="font-size:1em;">Nombre</p>
			    	</div>

			    	<div class="flex flex-middle flex-center width100 padding20" style="  padding:0 15px;">
			    		<p class="color-gray font-bold text-center text-uppercase" style="width:70px;">Paquete</p>
			    	</div>

			    	<div class="flex flex-middle flex-center width100 padding20" style="  padding:0 15px;">
			    		<p class="color-gray font1em font-bold text-center text-uppercase" style="width:70px;">Medidas</p>
			    	</div>

			    	<div class="flex flex-middle flex-center width100 padding20" style="  padding:0 15px;">
			    		<p class="color-gray font1em font-bold text-center text-uppercase" style="width:70px;">Cant.</p>
			    	</div>

			    	<div class="flex flex-middle flex-center width100 padding20" style="  padding:0 15px;">
			    		<p class="color-gray font1em font-bold text-center" style="width:70px;"><span class="mts2">m</span></p>
			    	</div>

			    	<div class="flex flex-middle flex-center width100 padding20" style="  padding:0 15px;">
			    		<p class="color-gray font1em font-bold text-center text-uppercase" style="width:70px;"></p>
			    	</div>

			    	<div class="flex flex-middle flex-center width100 padding20" style="  padding:0 15px;">
			    		<p class="color-gray font1em font-bold text-center text-uppercase" style="width:70px;">P.U. <span>(</span>  <span class="mts2 text-lowercase margin-right5">m</span> <span>)</span> </p>
			    	</div>

			    	<div class="flex flex-middle flex-center width100 padding20" style="  padding:0 15px;">
			    		<p class="color-gray font1em font-bold text-center text-uppercase" style="width:70px;">SubTotal</p>
			    	</div>
			    </article>
		    </section>

		    <section v-for="i in 6">
		    	<CotizationItem></CotizationItem>
		    </section>


		</article>

		
	</section>
</template>
