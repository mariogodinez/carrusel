
<script>
  export default {
    data() {
      return {
        
      }
    },
    components:{
    },
    computed: {
      
    },
    methods:{
      showFilter(){
        this.$parent.$emit('showFilter')
      },
    },
    mounted() {
     
    }
  }
</script>

<template>
	<section class="" style="background: #000;">
		<article class=" flex flex-middle flex-between">
			<div class="relative flex">
				<input type="text" placeholder="Buscar..." class="my-input">
				<span class="ion-search color-gray absolute" style="top:.3em; right:.5em; font-size:1.5em;"></span>
			</div>

			<div class=" flex flex-middle">
				<h3 class="font-normal color-white margin-right5">Cd:</h3>
				<div class="relative my-select" style="width:140px;">
					<select>
						<option>-</option>
						<option>Guadalajara</option>
					</select>
					<span class="my-select-icon ion-arrow-down-b"></span>
				</div>
			</div>

			<div class="">
				<h3 class="font-normal color-gray">Color</h3>
				<h3 class="font-normal color-gray">Crema marfil</h3>
			</div>

			

			<div class="">
				<h3 class="font-normal color-gray">Tipo Material</h3>
				<h3 class="font-normal color-gray">Granito</h3>
			</div>

			<div class="width50px">
				<h3 class="font-normal color-gray">Cant.</h3>
				<h3 class="font-normal color-gray">12</h3>
			</div>

			<div class="width100px">
				<h3 class="font-normal color-gray">Medidas</h3>
				<h3 class="font-normal color-gray">2 x 3 <span class="font15">mts.</span></h3>
			</div>

			<button class="my-btn back-yellow flex flex-middle" style="border-radius:0; padding:1.2em;" @click="showFilter">
				<span class="ion-funnel font1-5em margin-right5"></span>
				<span class="font-bold text-uppercase font1-3em">Filtros</span>
			</button>

			
		</article>
	</section>
</template>