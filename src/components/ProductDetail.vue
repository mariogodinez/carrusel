<script>
  import Filters from './Filters.vue'
  import ModalFilters from './ModalFilters.vue'
  import Spinner from './Spinner.vue'
  import ModalZoomImg from './ModalZoomImg.vue'
  import ModalError from './ModalError.vue'




  export default {
    name: 'DetalleProducto',
    data() {
      return {
        type:null,
        errorMsg: '',
        error: false,
        productsOfImg: null,
        imgFull:'',
        selectFilterText: '',
        showfilters: false,
        spin: false,
        productToSeeId: null,
        productToImage: null,
        products: null,
        // products: [
        //     {
        //       id:1,
        //       name: 'Lorem ipsun'
        //     },
        //     {
        //       id:2,
        //       name: 'Lorem ipsun'
        //     },
        //     {
        //       id:3,
        //       name: 'Lorem ipsun'
        //     },
        //     {
        //       id:4,
        //       name: 'Lorem ipsun'
        //     }
        // ],
        productToSee: null,
      }
    },
    components:{
      Filters,
      ModalFilters,
      Spinner,
      ModalZoomImg,
      ModalError
    },
    computed: {
      userInfo(){
        return this.$store.getters.userInfo
      }
    },
    methods:{
      goBack(){
        this.$router.go(-1)
      },
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
          
          axios.post(apiUrl + '/api/products_by_name',  {name: self.selectFilterText})
            .then(res =>{
              self.spin = false

              if(res.data.length == 0){

                // self.errorMsg = `No se encuentra disponible. Elige otro opción`
                 self.error = true

                 setTimeout(function(){
                  self.error = false

                 }, 5000)

                 return false

              }

              let data = res.data



              data.forEach(item => item.selected = false)

              data.forEach(item => item.searched = self.selectFilterText)

              self.products = data
            })
            .catch(err =>{
              self.spin = false

            })
        }, 500)
      },
      addSeeProduct(obj, index){
        let self = this

        

        if(this.products[index].selected){
          return false
        }

        this.productToSee = obj
        this.products.forEach(item => item.selected = false)
        this.products[index].selected = true
        this.productToSee.forEach(item =>{
          self.$set( item, 'selected', false)
          self.$set( item, 'addedCart', 'removed')
          self.$set( item, 'added', false)


        })
        
      },
      addItem(obj, index, addCart){
        let self = this
        console.log(index)
        this.productToImage = obj
        this.productToSee.forEach(item => item.selected = false)


        this.productToSee[index].selected = true

        // return false
        if(addCart){
          // this.productToSee[index].addedCart = addCart
          let objSend = {
            'total_m2': obj.quantity,
            'quantity': 1,
            'user_id': self.userInfo.id,
            'available': self.productToSee[index].count,
            'measurements': obj.measurements,
            'block' : self.products[index].block,
            'name'  : self.products[0].searched,
            'm2'    : obj.quantity
          }

          axios.post(apiUrl + '/api/create_shopping_cart', objSend)
            .then(res =>{
              console.log(res)
                self.productToSee[index].added = true
                self.$store.dispatch('addNotifications', self.$store.getters.notifications + 1)
            })
            .catch(err =>{
              console.log(res)
            })
        }

        // if(addCart == 'removed'){
        //   this.productToSee[index].addedCart = addCart
        //   // this.removeToCart(obj)
        // }
      },
      sendToCart(obj){
        this.$store.dispatch('addToCart', obj)
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



      
    },
    created(){
      let self = this
      this.products = JSON.parse(localStorage.getItem('lastProductDetail'))


      this.selectFilterText = this.products[0].searched


      self.type = localStorage.lastBlockSelected

      axios.post(apiUrl + '/api/descriptions_by_type', {'type' : localStorage.getItem('lastBlockSelected')})
        .then(res=>{
          self.productsOfImg = res.data.descriptions

        })
        .catch(err=>{
          console.log(err.response)
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
<section class="back-white height100vh">
   <ModalFilters v-if="showfilters"></ModalFilters>
   <Spinner v-if="spin"></Spinner>
   <ModalZoomImg v-if="imgFull" :url="imgFull"></ModalZoomImg>
   <ModalError v-if="error" :msg="errorMsg" :productNot="selectFilterText"></ModalError>



    <section class="padding0-20 back-white flex flex-between" style="padding-top:20px;">
      <div class="color-yellow back-yellow hvr-buzz-out pointer square30 rounded flex flex-center flex-middle"  @click="goBack">
        <span class="ion-arrow-left-b color-white font1-5em relative" style="left:-1px;" ></span>
      </div>

      <article class="flex flex-middle">
         <h3 class="font1-3em font-normal margin-right10 text-center">Seleccionar  producto:</h3>
             <div class=" flex flex-center">
                <div class="my-select font1em back-black width100 color-white " style="width:350px;">
                  <select v-model="selectFilterText" @change="selectFilter">
                    <option value="">Nombre del producto</option>
                    <option :value="i.name" v-for="i in productsOfImg">{{i.name}}</option>
                  </select>
                  <div class="my-select-icon color-black">
                    <span class="ion-arrow-down-b" style="color:white;"></span>
                  </div>
               </div>
            </div>
      </article>
    </section>

    <section class="padding20-10 flex relative" style="padding-top:0;" v-if="products != null">
        <article class=" padding10" style="width:70%; margin-right:2%">
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
            <article class="item-back flex flex-between padding20-10 pointer" @click="addSeeProduct(i.group, index)" v-for="(i, index) in products" :class="{ activeBox : i.selected}">
              <div>
                <h3 class="font1em">{{i.searched}}</h3>
              </div>
              <div class="flex">
                <div style="width:85px; margin-right:2px;">
                  <h3 class="font1em text-center">{{i.block}}</h3>
                </div>

                <div style="width:85px; margin-right:2px;">
                  <h3 class="font1em text-center">{{i.count}}</h3>
                </div>

                <div style="width:85px; margin-right:2px;">
                  <h3 class="font1em text-center">{{i.quantity.toFixed(1)}}</h3>
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
                  <h3 class="font1em font-normal">Medidas</h3>
                </div>

                <div style="width:90px; margin-right:2px;">
                  <h3 class="font1em text-center font-normal">Piezas</h3>
                </div>

                <div style="width:90px; margin-right:2px;">
                  <h3 class="font1em text-center font-normal">Cantidad <span class="mts2">m</span></h3>
                </div>
              </div>
            </section>


            <section style="max-height:27vh; overflow-y:auto; border-bottom:1px solid #eee;">
              <article class="item-back flex flex-middle pointer" :class="{ activeBox : i.selected}" @click="addItem(i, index, false)" v-for="(i, index) in productToSee" style="">
              
                <div class="flex flex-middle flex-between" style="width:99%;">
                  <article class=" flex flex-middle width100">
                    <div style="width:90px;">
                      <h3 class="font1em text-center relative" style="left:5px;">{{i.measurements}} mts.</h3>
                    </div>

                    <div style="width:90px; margin-right:2px;">
                      <h3 class="font1em text-center margin-left20">{{i.count}}</h3>
                    </div>

                    <div style="width:90px; margin-right:2px;">
                      <h3 class="font1em text-center margin-left20">{{i.quantity}}</h3>
                    </div>
                  </article>
                  

                  <div class="relative flex flex-center flex-middle padding10" style="border-left:1px solid gray;" @click="addItem(i, index, true)" >
                    <div class="relative" style="top:5px;" v-if="!i.added">
                      <span class="ion-android-cart color-gray" style="font-size:2em"></span>
                      <span class="my-badge back-yellow flex flex-middle flex-center color-white" style="position: absolute; top:-10px; right:-12px;">
                        <h4 class=" font-normal ion-plus-round font1-3em relative" style="top:1px; left:1px;"></h4>
                      </span>
                    </div>

                    <transition appear name="custom-classes-transition" enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
                      <div class="relative" style="top:5px;" v-if="i.added">
                        <span class="ion-android-cart color-white" style="font-size:2em"></span>
                        <span class="my-badge back-green flex flex-middle flex-center color-white" style="position: absolute; top:-10px; right:-12px;">
                          <h4 class=" font-normal ion-checkmark font1-3em relative" style="top:1px; left:1px;"></h4>
                        </span>
                      </div>
                    </transition>
                    
                  </div>

                  

                    
                

                </div>
              </article>
              
            </section>
            <div class="flex flex-center" style="margin-top:5vh;">
              <figure class="pointer" @click="seeFullImg(false)" v-if="productToImage &&productToImage.image_url" style="width:80%;">
                <img :src="productToImage.image_url" class="width100">
              </figure>

              <figure class="" v-else style="width:80%;">
                <img src="./dist/img/no-image.png" class="width100">
              </figure>
            </div>
          </div>
          
          
          
          

        </article>
    </section>
</section>
 
</template>
