<script>
	import ModalNotifications from './ModalNotifications.vue'
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
			ModalNotifications,
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
				this.showNotifications = true
			},
			closeSession(){
				this.hideMenu()
				this.$router.replace(`/${localStorage.typeOA}/login`)
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


	<section class="my-header" v-if="logged">
		<ModalNotifications v-if="showNotifications" @closeNotifications="showNotifications= false"></ModalNotifications>
		<Spiner v-if="spin"></Spiner>

		<header class="flex flex-middle flex-between transition30 relative back-darkblue"  style="border-bottom:1px solid #aebfc6">
			<transition appear name="custom-classes-transition" enter-active-class="animated flipInX" leave-active-class="animated flipOutX">

				<section v-if="search" class="search-box flex padding10" >
					<div class="back-darkblue main-box flex width100">
						<input type="text" name="" placeholder="Buscar usuario . . .">
						<div @click="closeSearch" class="flex flex-center flex-middle pointer padding10-20" style=" border-left:2px solid #203142">
						<span class="ion-close font1-3em  color-gray"></span>
					</div>
					</div>
				</section>
			</transition>
			<section class=" flex flex-middle">
				<div class="padding15 pointer relative" @click="toggleShowMenu" style="border-right:1px solid #d2d2d2; height:30px; width:28px; padding-left:20px;">
					<transition-group  name="custom-classes-transition" appear-active-class="animated flip" enter-active-class="animated rotateIn" leave-active-class="">
						<p key="1" class="font30 color-white absolute" v-if="!showMenu">
							<i class="ion-navicon-round" aria-hidden="true"></i>
						</p>
						<p key="2" class="font30 color-white absolute" v-if="showMenu">
							<i class="ion-close-round" aria-hidden="true"></i>
						</p>
					</transition-group>
				</div>
				<figure class="padding0-10" style="width:130px">
					<img src="./dist/img/logo-white.png" alt="Orkestra logo" class="width100">
				</figure>

			</section>


			<section class="flex padding-right20 flex-middle">
				<div class="relative search-box-header hideMobile block-desktop" style="margin-right:100px; width:400px">
					<input type="text" placeholder="Buscar usuario . . ." class="" style="background:#465869;">
					<p class="ion-close-round font1-3em search-box-header-icon" style=""></p>
				</div>
				<div class="flex hide-desktop flex-center flex-middle pointer padding15-20 margin-right20" style="border-right:2px solid #203142; border-left:2px solid #203142" @click="toggleShowSearch">
					<span class="ion-ios-search-strong font2em  color-gray"></span>
					<!-- <img src="./dist/img/user-circle.svg" style="width:30px;"> -->
				</div>
				<div @click="actionShowNotifications" class="my-header-notification flex flex-center flex-middle relative back-white">
					<span class="ion-ios-bell font35 hvr-buzz color-darkblue"></span>
					<span class="my-badge back-red flex flex-middle flex-center color-black" style="position: absolute; top:-5px; right:-5px;border:2px solid #2c3e50;">
						<h4 class="color-white font-normal">{{notifications || 3}}</h4>
					</span>
				</div>
			</section>


		</header>

		<article class="my-header-menu back-darkblue" :class="{left0 : showMenu}" style=" overflow-y:auto; height:100vh;">
			<ul  class="padding20-0 margin0">

				<li class="flex flex-middle margin0 font20 pointer" style="border-bottom: 1px solid #bfbcbc" @click="hideMenu">
					<router-link to="/indicadores-semanales" class="padding20 margin-left10 color-white text-uppercase">Indicadores de venta</router-link>
				</li>

				<li class="flex flex-middle margin0 font20 pointer" style="border-bottom: 1px solid #bfbcbc" @click="hideMenu">
					<router-link to="/crear-cliente" class="padding20 margin-left10 color-white text-uppercase">Mis prospectos</router-link>
				</li>

				<li class="flex flex-middle margin0 font20 pointer" style="border-bottom: 1px solid #bfbcbc" @click="hideMenu">
					<router-link to="/lista-clientes" class="padding20 margin-left10 color-white text-uppercase">Hannah cobros</router-link>
				</li>


				<li class="flex flex-middle margin0 font20 pointer" style="border-bottom: 1px solid #bfbcbc" @click="closeSession">
					<p class="padding20 margin-left10 color-white text-uppercase">Cerrar sesión</p>
				</li>
			</ul>
			<br>
			<br>
		</article>
	</section>
</template>
