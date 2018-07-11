<script type="text/javascript">
	import Spinner from './Spinner.vue'
	import WarnTag from './WarnTag.vue'

	export default{
		data(){
			return {
				cant: 0
			}
		},
		components:{
			Spinner,
			WarnTag
		},
		props:['itemCart'],
		methods:{
			deleteItem(id){
				this.$parent.$emit('deleteItem', { id })
			},
			addCant(id){
				let self = this
				
				if( this.itemCart.quantity < this.itemCart.available){
					this.$store.dispatch('addCount', id)
				} else {
					
					this.$store.dispatch('showCartWarn',{id})

					setTimeout(function(){
						self.$store.dispatch('hideCartWarn',{id})
					}, 3000)
				}
				
			},
			restCant(id){
				// if(this.itemCart.quantity == 0) {
				// 	return false
				// }
				this.$store.dispatch('restCount', id)
				// this.itemCart.quantity --
			}
		},
		computed:{
			itemCartM2(){
				let compose = this.itemCart.measurements.split('x')
				return parseInt(compose[0]) * parseInt(compose[1]) * this.itemCart.quantity
			}
		}
	}
</script>

<style type="text/css">
	/*.add *{
		flex-shrink:1;
	}*/
</style>

<template>
	<div>
		<!-- <Spinner></Spinner> -->
		<article class="grid-cart add">
	    	<div class=" padding20-10 ">
	    		<p class="color-black font1em font-bold text-uppercase" style="font-size:1em;">{{itemCart.name}}</p>
	    	</div>

	    	<div class="flex flex-middle flex-center padding20 " style=" padding:0 10px;">
	    		<p class="color-black font1em font-bold text-center">{{itemCart.block}}</p>
	    	</div>

	    	<div class="flex flex-middle flex-center padding20" style=" padding:0 10px;">
	    		<p class="color-black font1em font-bold text-center">{{itemCart.available}}</p>
	    	</div>

	    	<div class="flex flex-middle flex-center padding20" style=" padding:0 10px;">
	    		<p class="color-black font1em font-bold text-center">{{itemCart.total_m2}}
		    		<!-- <span class="mts2">m</span> -->
	    		</p>
	    	</div>

			<div class="flex flex-middle flex-center padding20" style=" padding:0 10px;">
	    		<p class="color-black font1em font-bold text-center">{{itemCart.measurements}} m</p>
	    	</div>

	    	<div class="flex flex-middle flex-center padding20 relative" style=" padding:0 10px;">

	    		
	    			<WarnTag msg="No se puede agregar más producto del disponible." class="absolute" v-if="itemCart.warning" style="top:-30px;left:-305px; width:400px; padding:5px;"></WarnTag>


	    			<span class="font1-3em pointer ion-minus-circled" @click="restCant(itemCart.id)"></span>
	    			<input class="color-black text-center margin0-10 my-input" style="border:2px solid gray; border-radius:4px; width:30px; padding:5px; background:#f1f1f1;" v-model="itemCart.quantity">
	    			<span class="font1-3em pointer ion-plus-circled" @click="addCant(itemCart.id)"></span>
	    	</div>

	    	
	    	<div class="flex flex-middle flex-center padding20" style="padding:0 10px;">
	    		<p class="font1em font-bold text-center" v-if="itemCartM2">{{itemCartM2}} 
	    		</p>

	    		<p class="font1em font-bold text-center" v-else>N/D 
	    		</p>
	    	</div>


	    	<div class="flex flex-middle flex-center  padding20" style=" padding:0 10px;">
	    		<p class="color-yellow font1em font-bold text-center font1-5em">
	    			<span class="ion-image"></span>
	    		</p>
	    	</div>

	    	<div class="flex flex-middle flex-center" style=" padding:0 10px;">
	    		<p class="color-yellow font1em font-bold text-center text-uppercase" style="width:30px;" ><span @click="deleteItem(itemCart.id)" class="ion-trash-a font1-5em pointer"></span></p>
	    	</div>

	    </article>
	</div>
</template>