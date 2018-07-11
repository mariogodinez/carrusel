<script>
	import Spiner from './Spinner.vue'
	import CartItem from './CartItem.vue'
	import ModalSure from './ModalSure.vue'
	import ModalConfirm from './ModalConfirm.vue'
	import ModalConfirmDelete from './ModalConfirmDelete.vue'
	import ModalSuccess from './ModalSuccess.vue'
	import ModalError from './ModalError.vue'
	import NoCartData from './NoCartData.vue'






	export default {
		components:{
			Spiner,
			CartItem,
			ModalSure,
			ModalConfirm,
			ModalConfirmDelete,
			ModalSuccess,
			ModalError,
			NoCartData

		},
		data(){
			return {
				successMessage: '',
				confirmDelete: false,
				deleteItemId: null,
				confirmSend: false,
				spin: true,
				edit: false,
				sent: false,
				errorMessage: '',
				error: false,
				msg: '',
				success: false,
			}
		},
		computed:{
			logged(){
				return this.$store.getters.logged
			},
			url(){
				return window.url
			},
			cartItems(){
				return this.$store.getters.cartItems
			},
			userInfo(){
		      return this.$store.getters.userInfo
		    }
		},
		methods: {
			goBack(){
				this.$router.go(-1)
			},
			changeEdit(value){
				this.edit = value
			},
			sendCotization(){
				this.confirmSend = true
			}
		},
		mounted(){
			let self = this
			this.$on('closeModal', function(obj){
				self.confirmSend = false
				self.confirmDelete = false

			})

			this.$on('deleteItem', function(obj){
				self.deleteItemId = obj.id
				self.confirmDelete = true
			})



			this.$on('confirmedDelete', function(obj){
				self.confirmDelete = false

				

				setTimeout(function(){
					self.spin = true
					axios.post(apiUrl + '/api/delete_item_cart', {item_id : self.deleteItemId})
						.then(res =>{
							console.log(res)
							self.spin = false
							if(res.status == 200){
								self.success = true
								self.successMessage = 'Se ha eliminado el producto del carrito.'
								setTimeout(function(){
									self.success = false
								},2100)

								self.$store.dispatch('addNotifications', self.$store.getters.notifications - 1)

								setTimeout(function(){
									self.$store.dispatch('removeToCart', self.deleteItemId)
								},2900)
								
							}

							if(res.status != 200){
								self.error = true
								setTimeout(function(){
									self.error = false
								},3000)
							}

							
						})
						.catch(err =>{
							console.log(err.response)
							self.spin = false

							self.error = true
							setTimeout(function(){
								self.error = false
							},3000)
						})
				}, 300)

				
			})




			this.$on('sendCotization', function(obj){
				// Hacer peticion aqui para mandar cotizacion

				self.confirmSend = false
				self.spin = true
				axios.post(apiUrl + '/api/send_quotation', { user_id: self.userInfo.id, message: self.msg})
				.then(res =>{
					console.log(res)
					self.spin = false
					self.success = true

					self.successMessage = 'Se ha enviado la cotización correctamente.'
					self.$store.dispatch('addNotifications', 0)
					setTimeout(function(){
						self.success = false
						self.$router.push('/carrusel')
					}, 3000)
				})
				.catch(err =>{
					console.log(err.response)
					self.spin = false
					self.error = true

					setTimeout(function(){
						self.error = false
					}, 3000)

				})
			})
		},
		created(){
			let self = this
		    axios.post(apiUrl + '/api/shopping_cart', {user_id: self.userInfo.id})
		      .then(res =>{
		      	self.spin = false
		      	let data = res.data.shopping_cart
		      	data.forEach(item => item.warning = false)
		      	console.log(data)
		        self.$store.dispatch('addToCart', data)
		      })
		      .catch(err =>{
		      	self.spin = false
		        console.log(err.response)
		      })
		}
	}
</script>

<style type="text/css">
	.grid-cart{
		display:grid;
		grid-template-columns:28% 10% 10% 10% 12% 10% 12% 3% 5%;
	}

</style>

<template class="padding0">
	<section class="padding0 back-white height100vh">
		<Spiner v-if="spin"></Spiner>
		<ModalSure v-if="confirmSend"></ModalSure>
		<ModalConfirmDelete v-if="confirmDelete"></ModalConfirmDelete>

		<ModalConfirm v-if="sent"></ModalConfirm>
		<ModalSuccess v-if="success" :msg="successMessage"></ModalSuccess>
		<ModalError v-if="error"></ModalError>




		<article class="back-darkblack flex padding15 flex-middle">
			<div class="square30 back-yellow pointer rounded flex flex-middle flex-center" @click="goBack">
				<span class="ion-arrow-left-b color-black font1-5em relative" style="left:-1px;"></span>
			</div>
			<h2 class="color-white padding-left10 font-normal text-uppercase font1-3em">Carrito</h2>
		</article>


		<article class="flex flex-right padding20">
			<div class="flex flex-middle">
				<textarea placeholder="Añadir mensaje ..." class="my-input margin-right20" rows="2" style="background:#fff;" v-model="msg"></textarea>
				<button class="my-btn pointer back-yellow text-uppercase color-black font-bold" style="width:380px; background:#fff;" @click="sendCotization">
					Solicitar Cotización
				</button>
			</div>
		</article>



		<article class="padding5">
			<section v-if="cartItems.length > 0">
		    	<article class="grid-cart" >
			    	<div class=" padding20-10" >
			    		<p class="color-gray font1em font-bold text-uppercase" style="font-size:1em;">Nombre</p>
			    	</div>


			    	<div class="flex flex-middle flex-center padding20" style="  padding:0 10px;">
			    		<p class="color-gray font1em font-bold text-center text-uppercase" style="width:70px;">Bloque</p>
			    	</div>

			    	<div class="flex flex-middle flex-center padding20" style="  padding:0 10px;">
			    		<p class="color-gray font1em font-bold text-center text-uppercase" style="width:70px;">Cant. Disp.</p>
			    	</div>

			    	<div class="flex flex-middle flex-center  padding20" style="  padding:0 10px;">
			    		<p class="color-gray text-uppercase font1em font-bold text-center" style="width:70px;">total <span class="mts2">m</span></p>
			    	</div>

			    	<div class="flex flex-middle flex-center  padding20" style="  padding:0 10px;">
			    		<p class="color-gray font1em font-bold text-center text-uppercase" style="">Medidas</p>
			    	</div>

			    	<div class="flex flex-middle flex-center padding20" style="  padding:0 10px;">
			    		<p class="color-gray font1em font-bold text-center text-uppercase" style="">Cant.  </p>
			    	</div>

			    	<div class="flex flex-middle flex-center padding20" style="  padding:0 10px;">
			    		<p class="color-gray font1em font-bold text-center text-uppercase" style=""><span class="mts2">m</span></p>
			    	</div>

			    	<div class="flex flex-middle flex-center padding20" style="  padding:0 10px;">
			    		<p class="color-gray font1em font-bold text-center text-uppercase" style=""></p>
			    	</div>

			    	<div class="flex flex-middle flex-center padding20" style="  padding:0 10px;">
			    		<p class="color-gray font1em font-bold text-center text-uppercase" style=""></p>
			    	</div>
			    </article>
		    </section>

		    <section v-for="i in cartItems" v-if="cartItems.length > 0" class="item-back">
		    	<CartItem :itemCart="i" ></CartItem>
		    </section>


		    <section class="margin20 relative" v-if="cartItems.length == 0" style="top:40px;">
		    	<NoCartData></NoCartData>
		    </section>


		</article>

		
	</section>
</template>
