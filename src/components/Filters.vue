
<script>
  import Spinner from './Spinner.vue'
  import ModalError from './ModalError.vue'


  export default {
    data() {
      return {
        search: false,
        searchText:'',
        city: '',
        price:'',
        color:'',
        type: '',
        spin: false,
        error: false,
        errorMessage: '',

      }
    },
    components:{
    	Spinner,
    	ModalError
    },
    computed: {
      
    },
    methods:{
      
      toggleSearch(){
      	this.search = !this.search
      },
      clearSearch(){
      	this.searchText = ''
      },
      filter(){
      	let self = this

      	let obj = {
			'name': self.searchText,
			'city': self.city,
			'color': self.color,
			'price': self.price
		}
		this.spin = true
      	axios.post(apiUrl + '/api/filter_products', obj)
	        .then(res =>{
	            self.spin = false
	            self.$parent.$emit('filtered', {datos: res.data, status: true})
	        })
	        .catch(err =>{
	          self.spin = false
	          self.error = true
	          self.errorMessage = err.response.data.error

	          setTimeout(function(){
					self.error = false
				},3000)
	        })
      }
    },
    mounted() {
     
    }
  }
</script>

<template>
	<section style="background: #000;">
		<Spinner v-if="spin"></Spinner>
		<ModalError v-if="error" :msg="errorMessage"></ModalError>

		<article class="relative flex flex-middle flex-between">
		<transition appear name="custom-classes-transition" enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
			
			<div class="absolute flex margin-left20 padding15" v-if="search" style="left:-17px;bottom:-71px; background:#000;">
				<div class="relative">
					<input type="text" v-model="searchText" placeholder="Buscar..." class="my-input color-white" style="width:310px; border-color:#787878;">
					<span class="ion-close color-white absolute pointer" @click="clearSearch" style="top:.31em; right:.5em; font-size:1.5em;"></span>
				</div>
				
			</div>
		</transition>
		<section>
			<div class=" flex padding20 pointer" style="border-right:1px solid #444;top:0; padding-top:3px; padding-left:21px;" @click="toggleSearch">
				<span class="ion-search color-gray relative" v-if="!search" style=" font-size:2em;top:7px"></span>
				<span class="ion-close color-white relative" v-if="search" style=" font-size:2em;top:7px"></span>

			</div>
		</section>

		<section class="flex">
			<div class=" flex flex-middle margin-right20" style="">
				<!-- <h3 class="font-normal color-white margin-right5">Cd:</h3> -->
				<div class="relative my-select" style="width:140px; background:#212224; border:2px solid #787878;">
					<select style="color:#787878;" v-model="city" :class="{'color-white' : city != ''}">
						<option value="" style="color:red !important; font-size:4em !important;">Ciudad</option>
						<option value="Guadalajara" style="font-size:4em !important;">Guadalajara</option>

						<option value="Cuidad de Mexico" style="font-size:4em !important;">Cuidad de México</option>

						<option value="Monterrey" style="font-size:4em !important;">Monterrey</option>

						<option value="Cancun" style="font-size:4em !important;">Cancún</option>

						<option value="Queretaro" style="font-size:4em !important;">Querétaro</option>

						<option value="Leon" style="font-size:4em !important;">León</option>


						<option value="Puebla" style="font-size:4em !important;">Puebla</option>

						<option value="Hermosillo" style="font-size:4em !important;">Hermosillo</option>

						<option value="Culiacan" style="font-size:4em !important;">Culiacán</option>

						<option value="Morelia" style="font-size:4em !important;">Morelia</option>

						<option value="Merida" style="font-size:4em !important;">Mérida</option>

						<option value="Aguascalientes" style="font-size:4em !important;">Aguascalientes</option>
					</select>
					<span class="my-select-icon ion-arrow-down-b" style="color:#787878;"></span>
				</div>
			</div>

			<div class=" flex flex-middle margin-right20">
				<!-- <h3 class="font-normal color-white margin-right5">Color:</h3> -->
				<div class="relative my-select" style="width:160px; background:#212224; border:2px solid #787878;">
					<select style="color:#787878;" v-model="color">
						<option value="">Color</option>
						<option value="gris">gris ox.for de lores.</option>
					</select>
					<span class="my-select-icon ion-arrow-down-b" style="color:#787878;"></span>
				</div>
			</div>


			<div class=" flex flex-middle margin-right20">
				<!-- <h3 class="font-normal color-white margin-right5">Precio:</h3> -->
				<div class="relative my-select" style="width:100px; background:#212224; border:2px solid #787878;">
					<select style="color:#787878;"  v-model="price" :class="{'color-white' : price != ''}">
						<option value="">Precio</option>
						<option value="$">$</option>
						<option value="$$">$$</option>
						<option value="$$$">$$$</option>
						<option value="$$$$">$$$$</option>
					</select>
					<span class="my-select-icon ion-arrow-down-b" style="color:#787878;"></span>
				</div>
			</div>

			<div class=" flex flex-middle margin-right20">
				<!-- <h3 class="font-normal color-white margin-right5">Tipo:</h3> -->
				<div class="relative my-select" style="width:140px; background:#212224; border:2px solid #787878;">
					<select style="color:#787878;" v-model="type" :class="{'color-white' : type != ''}">
						<option value="">Tipo</option>
						<option value="Marmoles">Mármoles</option>
						<option value="Granito">Granito</option>
						<option value="Cuarcitas">Cuarcitas</option>
						<option value="Tenerife Quartz">Tenerife Quartz</option>
						<option value="Antolini">Antolini</option>
						<option value="Travertinos">Travertinos</option>
						<option value="Calizas">Calizas</option>
						<option value="Arenicas">Arenicas</option>
						<option value="Onix">Onix</option>
						<option value="Pizarras">Pizarras</option>
						<option value="Fachaletas">Fachaletas</option>

					</select>
					<span class="my-select-icon ion-arrow-down-b" style="color:#787878;"></span>
				</div>
			</div>



			<button class="my-btn back-yellow flex flex-middle" style=" padding:1em;" @click="filter">
				<span class="ion-funnel font1-3em margin-right5"></span>
				<span class="font-bold text-uppercase font1em">Filtrar</span>
			</button>
		</section>


			


			

			
		</article>
	</section>
</template>