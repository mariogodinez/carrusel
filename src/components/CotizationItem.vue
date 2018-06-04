<script type="text/javascript">
	export default{
		data(){
			return {
				cant: 0
			}
		},
		methods:{
			
			addCant(){
				this.cant ++
			},
			restCant(){
				if(this.cant == 0) {
					return false
				}
				this.cant --
			}
		}
	}
</script>

<template>
	<div>
		<article class="flex">
	    	<div class="width100 flex flex-middle padding20" style="">
	    		<p class="color-black font1em font-bold text-uppercase" style="font-size:1em;">Grayshell</p>
	    	</div>

	    	<div class="flex flex-middle flex-center width100 padding20" style="  padding:0 15px;">
	    		<p class="color-black font-bold text-center text-uppercase" style="width:70px;">45423</p>
	    	</div>

	    	<div class="flex flex-middle flex-center width100 padding20" style="  padding:0 15px;">
	    		<p class="color-black font1em font-bold text-center" style="width:70px;">5x3 mts.</p>
	    	</div>

	    	<div class="flex flex-middle flex-center width100 padding20" style="  padding:0 15px;">
	    		
	    			<span class="font1-3em pointer ion-minus-circled" @click="restCant"></span>
	    			<input class="color-black text-center margin0-10 my-input" style="border:2px solid gray; border-radius:4px; width:30px; padding:5px; background:#f1f1f1;" v-model="cant">
	    			<span class="font1-3em pointer ion-plus-circled" @click="addCant"></span>
	    	</div>

	    	<div class="flex flex-middle flex-center width100 padding20" style="  padding:0 15px;">
	    		<p class="color-black font1em font-bold text-center" style="width:70px;">30 <span class="mts2">m</span>	</p>
	    	</div>

	    	<div class="flex flex-middle flex-center width100 padding20" style="  padding:0 15px;">
	    		<p class="color-yellow font1em font-bold text-center anchor" style="width:70px;">Ver foto</p>
	    	</div>

	    	<div class="flex flex-middle flex-center width100 padding20">
	    		
	    			<div class="relative flex">
	    				<span class="color-black margin-left5 absolute font1-3em" style="top:.5em;">$</span>
	    				<input type="text" name="" class="my-input padding5 color-black" style="padding-left:1em; background:#f1f1f1;">
	    			</div>
	    	</div>

	    	<div class="flex flex-middle flex-center width100 padding20" style="  padding:0 15px;">
	    		<p class="color-black font1em font-bold text-center text-uppercase" style="width:70px;"></p>
	    	</div>
	    </article>
	</div>
</template>