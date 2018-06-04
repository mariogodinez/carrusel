<script>
  import Filters from './Filters.vue'
  import ModalFilters from './ModalFilters.vue'
  import Spinner from './Spinner.vue'
  import ModalZoomImg from './ModalZoomImg.vue'



  export default {
    name: 'DetalleProducto',
    data() {
      return {
        imgFull:'',
        showfilters: false,
        spin: false,
        productToSeeId: null,
        products: [
            {
              id:1,
              name: 'Lorem ipsun'
            },
            {
              id:2,
              name: 'Lorem ipsun'
            },
            {
              id:3,
              name: 'Lorem ipsun'
            },
            {
              id:4,
              name: 'Lorem ipsun'
            }
        ],
        productToSee: null,
      }
    },
    components:{
      Filters,
      ModalFilters,
      Spinner,
      ModalZoomImg
    },
    computed: {
      
    },
    methods:{
      seeFullImg(url){
        this.imgFull = url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUzpXIIGLWe2RiGiY3FZ_gfVjzhYGWEbmoIGyxfLz0N5Fv-MiJOw'
      },
      hideFilter(){
        this.$parent.$emit('showFilter')
      },
      selectFilter(){
        let self = this
        this.spin = true
        setTimeout(function(){
          self.spin = false
          self.products = [{name:'hola'}]
        }, 2000)
      },
      addSeeProduct(obj){
        this.productToSee = obj || {id: 1 , name: "lorem", status: false}
        this.productToSeeId = obj.id

      }
    },
    mounted() {
     let self = this
      this.$on('hideFilter', function(data){
        self.showfilters = false
        
      })

      this.$on('showFilter', function(data){
        self.showfilters = true
        
      })

      this.$on('closeModalRegister', function(data){
        self.imgFull = ''
        
      })

      
    }
  }
</script>

<style type="text/css">

  .VueCarousel-slide{
    width: 240px;
    height: 200px;
  } 

  .VueCarousel-slide-active{
    border-left:1px solid black;
    border-right:1px solid black;

  }

  .item-back:nth-child(odd){
    background: #eee;
  }

  .item-back{
    border-left:1px solid #eee;
    border-right:1px solid #eee;
  }

  .activeBox{
    background: black !important;
    color:white !important;
    border-bottom:1px solid #f3f3f3;
  }

/*  .VueCarousel-slide-center:nth-child(even){
    transform: rotateY(90deg);
  }*/

 /* .VueCarousel-wrapper {
    overflow: initial;
  }*/
</style>

<!-- The ref attr used to find the swiper instance -->
<template >
<section class="back-white">
   <Filters></Filters>
   <ModalFilters v-if="showfilters"></ModalFilters>
   <Spinner v-if="spin"></Spinner>
   <ModalZoomImg v-if="imgFull" :url="imgFull"></ModalZoomImg>




   <article class="flex flex-center" v-if="products == null" style="min-height:80vh;">
     <section class="padding20 margin-right20">
     <div>
       <h3 class="font1-3em font-normal margin-bottom5">Seleccionar  familia</h3>
       <div>
          <div class="my-select font1em back-black width100 color-white margin-right20" style="width:230px;">
            <select name="" id="" @change="selectFilter()">
              <option value="01">Nombre de la familia</option>
              <option value="01">producto</option>
              <option value="01">producto</option>
              <option value="01">producto</option>

            </select>
            <div class="my-select-icon color-black">
              <span class="ion-arrow-down-b" style="color:white;"></span>
            </div>
         </div>
       </div>
     </div>
   </section>

   <section class="padding20">
     <div>
       <h3 class="font1-3em font-normal margin-bottom5">Seleccionar  producto</h3>
       <div>
          <div class="my-select font1em back-black width100 color-white margin-right20" style="width:230px;">
            <select name="" id="" @change="selectFilter()">
              <option value="01">Nombre del producto</option>
              <option value="01">producto</option>
              <option value="01">producto</option>
              <option value="01">producto</option>
              <option value="01">producto</option>

            </select>
            <div class="my-select-icon color-black">
              <span class="ion-arrow-down-b" style="color:white;"></span>
            </div>
         </div>
       </div>
     </div>
   </section>
   </article>
   

    <section class="padding0-20 back-white" style="padding-top:20px;" v-if="products != null">
      <div class="color-yellow back-yellow hvr-buzz-out pointer square30 rounded flex flex-center flex-middle"  @click="hideFilter">
        <span class="ion-arrow-left-b color-white font1-5em relative" style="left:-1px;" ></span>
      </div>
    </section>


    <section class="padding20-10 flex relative" style="padding-top:0;" v-if="products != null">
        <article class=" padding10" style="width:48%; margin-right:2%">
          <section class=" flex flex-between margin-bottom10 padding20-10" style="padding-bottom:10px;">
            <div>
              <h3 class="font1em font-normal">Nombre</h3>
            </div>

            <div class="flex">
              <div style="width:85px; margin-right:2px;">
                <h3 class="font1em text-center font-normal">Bloque</h3>
              </div>

              <div style="width:85px; margin-right:2px;">
                <h3 class="font1em text-center font-normal">Piezas</h3>
              </div>

              <div style="width:85px; margin-right:2px;">
                <h3 class="font1em text-center font-normal">Cantidad <span class="mts2">m</span></h3>
              </div>
            </div>
          </section>


          <section style="max-height:60vh; overflow-y:auto;">
            <article class="item-back flex flex-between padding20-10 pointer" @click="addSeeProduct(i)" v-for="i in products" :class="{ activeBox : i.id == productToSeeId}">
              <div>
                <h3 class="font1em">Graysel loteras sdainc</h3>
              </div>
              <div class="flex">
                <div style="width:85px; margin-right:2px;">
                  <h3 class="font1em text-center">32354645</h3>
                </div>

                <div style="width:85px; margin-right:2px;">
                  <h3 class="font1em text-center">324224</h3>
                </div>

                <div style="width:85px; margin-right:2px;">
                  <h3 class="font1em text-center">34224</h3>
                </div>
              </div>
            </article>
            
          </section>
          
          

        </article>

        <article class=" padding10" style="width:49%;">
          <div v-if="productToSee">
            <section class=" flex margin-bottom10 padding20-10" style="padding-bottom:10px;">
              <div class="flex">
                <div style="width:90px; margin-right:2px;">
                  <h3 class="font1em text-center font-normal">Medidas</h3>
                </div>

                <div style="width:90px; margin-right:2px;">
                  <h3 class="font1em text-center font-normal">Piezas</h3>
                </div>

                <div style="width:90px; margin-right:2px;">
                  <h3 class="font1em text-center font-normal">Cantidad <span class="mts2">m</span></h3>
                </div>
              </div>
            </section>


            <section style="max-height:27vh; overflow-y:auto;">
              <article class="item-back flex flex-middle " :class="{ activeBox : true}" v-for="i in 14" style="">
              
                <div class="flex flex-middle flex-between" style="width:98%;">
                  <article class=" flex flex-middle width100">
                    <div style="width:90px; margin-right:2px;">
                      <h3 class="font1em text-center">5 x 3 mts.</h3>
                    </div>

                    <div style="width:90px; margin-right:2px;">
                      <h3 class="font1em text-center">16</h3>
                    </div>

                    <div style="width:90px; margin-right:2px;">
                      <h3 class="font1em text-center">75.7</h3>
                    </div>
                  </article>
                  

                  <div class="relative flex flex-center flex-middle padding10" style="border-left:1px solid gray;">
                    <span class="ion-android-cart color-gray" style="font-size:2em"></span>
                    <span class="my-badge back-yellow flex flex-middle flex-center color-white" style="position: absolute; top:1px; right:-5px;">
                      <h4 class=" font-normal ion-minus-round font1-3em relative" style="top:1px; left:1px;"></h4>
                    </span>
                  </div>
                </div>
              </article>
              
            </section>
            <div class="flex flex-right" style="margin-top:5vh;">
              <figure class="pointer" @click="seeFullImg(false)">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUzpXIIGLWe2RiGiY3FZ_gfVjzhYGWEbmoIGyxfLz0N5Fv-MiJOw" class="with100">
              </figure>
            </div>
          </div>
          
          
          
          

        </article>
    </section>
</section>
 
</template>
