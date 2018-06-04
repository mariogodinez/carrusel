<script>
	import Spiner from './Spinner.vue'

	export default {
		data(){
			return {
				showMenu: false,
				showNotifications: false,
				search: false,
				results: []
			}
		},
		components:{
			Spiner
		},
		computed:{
			logged(){
				// return this.$store.getters.logged
				return true
			},
			notifications(){
				return this.$store.getters.notifications
			}
		},
		methods:{
			searchAjax(){
				this.spin = true

				setTimeout(function(){
					self.spin = false
					self.results = {
						name: 'Mario Godinez Medina',
						age: 99
					}
				},2000)
			},
			toggleShowSearch(){
				this.search = true
			},
			closeSearch(){
				this.search = false
			},
			toggleShowMenu(){
				this.showMenu = !this.showMenu
			},
			actionShowNotifications(){
				this.$router.push('/carrito')
			},
			closeSession(){
				this.hideMenu()
				this.$router.replace(`/login`)
				localStorage.clear()
				this.$store.dispatch('setLogged', false)
			},
			hideMenu(){
				this.toggleShowMenu()
			}
		},
		created(){
			this.showMenu = false
		}
	}
</script>



<template>


	<section class="my-header back-black" v-if="logged">
		<ModalNotifications v-if="showNotifications" @closeNotifications="showNotifications= false"></ModalNotifications>
		<Spiner v-if="spin"></Spiner>

		<header class="flex flex-middle flex-between transition30 relative back-pattern">
			<section class=" flex flex-middle">
				<div class="padding15 pointer relative" @click="toggleShowMenu" style="border-right:1px solid gray; height:30px; width:28px; padding-left:20px;">
					<transition-group  name="custom-classes-transition" appear-active-class="animated flip" enter-active-class="animated rotateIn" leave-active-class="">
						<p key="1" class="font30 color-yellow absolute" v-if="!showMenu">
							<i class="ion-navicon-round" aria-hidden="true"></i>
						</p>
						<p key="2" class="square25 padding5 rounded flex flex-center flex-middle color-yellow  absolute" v-if="showMenu" style="border:2px solid; left:11px; top:11px;">
							<i class="ion-close-round font20 " aria-hidden="true"></i>
						</p>
					</transition-group>
				</div>
				<figure class="padding0-10" style="width:130px">
					<img src="./dist/img/tenerife-horizontal.png" alt="tenerife logo" class="width100">
				</figure>

			</section>


			<section class="flex padding-right20 flex-middle">
				<!-- <div class="flex hide-desktop flex-center flex-middle pointer padding15-20 margin-right20" style="border-right:2px solid #203142; border-left:2px solid #203142" @click="toggleShowSearch">
					<span class="ion-ios-search-strong font2em  color-gray"></span>
				</div> -->
				<div @click="actionShowNotifications" class="my-header-notification flex flex-center flex-middle relative " style="border-left:1px solid gray; padding:10px 10px 10px 18px;">
					<span class="ion-android-cart font35 hvr-buzz color-white"></span>
					<span class="my-badge back-yellow flex flex-middle flex-center color-white" style="position: absolute; top:5px; right:-5px;">
						<h4 class="color-black font-normal">{{notifications || 3}}</h4>
					</span>
				</div>
			</section>


		</header>

		<article class="my-header-menu" :class="{left0 : showMenu}" style=" overflow-y:auto; height:100vh; background:#000;">
			<ul  class="padding20-0 margin0">

				<li class="flex flex-middle margin0 font20 pointer" style="border-bottom: 1px solid #bfbcbc" @click="hideMenu">
					<router-link to="/perfil" class="padding20 margin-left10 color-white text-uppercase">Perfil</router-link>
				</li>

				<li class="flex flex-middle margin0 font20 pointer" style="border-bottom: 1px solid #bfbcbc" @click="hideMenu">
					<router-link to="/carousell" class="padding20 margin-left10 color-white text-uppercase">Carousel de productos</router-link>
				</li>
<!-- 
				<li class="flex flex-middle margin0 font20 pointer" style="border-bottom: 1px solid #bfbcbc" @click="hideMenu">
					<router-link to="/lista-clientes" class="padding20 margin-left10 color-white text-uppercase">Historial de cotizaciones</router-link>
				</li>
 -->

				<li class="flex flex-middle margin0 font20 pointer" style="border-bottom: 1px solid #bfbcbc" @click="closeSession">
					<p class="padding20 margin-left10 color-white text-uppercase">Cerrar sesión</p>
				</li>
			</ul>
			<br>
			<br>
		</article>
	</section>
</template>
