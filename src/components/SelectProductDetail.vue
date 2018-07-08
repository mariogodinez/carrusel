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

              // self.products = data

              localStorage.lastProductDetail = JSON.stringify(data)
              self.$router.push({name: 'product-detail'})

            })
            .catch(err =>{
              self.spin = false

            })
        }, 500)
      },
      addSeeProduct(obj, index){
        let self = this

        this.productToSee = obj
        this.products.forEach(item => item.selected = false)
        this.products[index].selected = true
        this.productToSee.forEach(item =>{
          self.$set( item, 'selected', false)
          self.$set( item, 'addedCart', 'removed')

        })
        
      },
      addItem(obj, index, addCart){
        let self = this
        console.log(index)
        this.productToImage = obj
        this.productToSee.forEach(item => item.selected = false)
        this.productToSee[index].selected = true

        // return false
        if(true){
          this.productToSee[index].addedCart = addCart
          let objSend = {
            'total_m2': obj.quantity,
            'quantity': 1,
            'user_id': self.userInfo.id,
            'available': self.productToSee[index].count,
            'measurements': obj.measurements,
            'block' : self.products[index].block,
            'name'  : self.selectFilterText,
            'm2'    : obj.quantity
          }

          axios.post(apiUrl + '/api/create_shopping_cart', objSend)
            .then(res =>{
              console.log(res)
            })
            .catch(err =>{
              console.log(res)
            })
        }

        if(addCart == 'removed'){
          this.productToSee[index].addedCart = addCart
          // this.removeToCart(obj)
        }
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



    <section class="padding0-20 back-white" style="padding-top:20px;">
      <div class="color-yellow back-yellow hvr-buzz-out pointer square30 rounded flex flex-center flex-middle"  @click="goBack">
        <span class="ion-arrow-left-b color-white font1-5em relative" style="left:-1px;" ></span>
      </div>
    </section>

    
    
     <section class="padding20 " >
       <div class="back-lightgray padding20 flex flex-middle flex-center" style="min-height:170px; min-width:300px">
          <article class="">
            <div class="margin-bottom20">
                <h3 class="font1-3em font-normal text-center">Modelo Seleccionado:</h3>

                <h3 class="font1-5em font-normal margin-bottom5 text-center">{{type}}
                </h3>
              </div>

             <h3 class="font1-3em font-normal margin-bottom10 text-center">Seleccionar  producto</h3>
             <div class=" flex flex-center">
                <div class="my-select font1em back-black width100 color-white " style="width:290px;">
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
          
       </div>
     </section>
</section>
 
</template>
