<script>
  import Filters from './Filters.vue'
  import ModalFilters from './ModalFilters.vue'
  import Spinner from './Spinner.vue'


  export default {
    name: 'carrousel',
    data() {
      return {
        spin: false,
        money:'',
        swiperOption: {
        },
        showfilters: false,
        slides: [
          {
            name: 'Marmol Crema Marfil Blanco',
            count: 796,
            id: 0,
            imgUrl: './dist/img/img-1.jpg'
          },
          {
            name: 'Carrara Black',
            count: 428,
            id: 1,
            imgUrl: './dist/img/img-2.jpg'
          },
          {
            name: 'Grayshell Luxury',
            count: 19,
            id: 2,
            imgUrl: './dist/img/img-3.jpg'
          },
          {
            name: 'Onix Velluto',
            count: 174,
            id: 3,
            imgUrl: './dist/img/img-4.jpg'
          },
          {
            name: 'Travertino Arabe',
            count: 85,
            id: 4,
            imgUrl: './dist/img/img-5.jpg'
          },
          {
            name: 'Marmol Crema Marfil Blanco',
            count: 796,
            id: 0,
            imgUrl: './dist/img/img-1.jpg'
          },
          {
            name: 'Carrara Black',
            count: 428,
            id: 1,
            imgUrl: './dist/img/img-2.jpg'
          },
          {
            name: 'Grayshell Luxury',
            count: 19,
            id: 2,
            imgUrl: './dist/img/img-3.jpg'
          },
          {
            name: 'Onix Velluto',
            count: 174,
            id: 3,
            imgUrl: './dist/img/img-4.jpg'
          },
          {
            name: 'Travertino Arabe',
            count: 85,
            id: 4,
            imgUrl: './dist/img/img-5.jpg'
          }
        ]
      }
    },
    components:{
      Filters,
      ModalFilters,
      Spinner
    },
    computed: {
      apiUrl(){
        return window.apiUrl
      }
    },
    watch:{
      money(val){
        if(val.length > 3){
          // val.split()
        }
      }
    },
    methods:{
      hideFilter(){
        this.$parent.$emit('showFilter')
      },
      onLastSlide(){
      console.log('hola last')
      },
      onAfterSlideChange(){
      console.log('hola after')
      },
      onBeforeSlideChange(){
        console.log('hola before')
      },
      goBlocks(slide){
        localStorage.lastBlockSelected = slide.type
        this.$router.push({name: 'product-select-detail'})
      }
    },
    created(){
      let self = this
      this.spin = true
      axios.post(apiUrl + '/api/main_page')
        .then(res =>{
          console.log(res)
          
          self.slides = res.data
          setTimeout(function(){
            self.spin = false
          }, 2000)
        })
        .catch(err =>{
          console.log(err.response)
          setTimeout(function(){
            self.spin = false
          }, 500)

        })
    },
    mounted() {
     let self = this
      this.$on('hideFilter', function(data){
        self.showfilters = false
        if(data.status){

        }
      })

      this.$on('filtered', function(data){
        self.showfilters = false
        if(data.status){
          self.slides = data.datos
        }
      })

      this.$on('showFilter', function(data){
        self.showfilters = true
        if(data.status){

        }
      })
    }
  }
</script>

<style type="text/css">
  .carousel-3d-container figure {
    margin: 0;
  }

  .carousel-3d-container figcaption {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    bottom: 0;
    position: absolute;
    bottom: 0;
    padding: 15px;
    font-size: 12px;
    min-width: 100%;
    box-sizing: border-box;
  }

.carousel-3d-slide{
  overflow:inherit !important;
  border:0;
  box-shadow:0 0 20px #000;

}

.carousel-3d-container{
  overflow:inherit !important;
}
  .carousel-3d-container figcaption {
      background-color: rgba(0, 0, 0, 0);
      color: black;
      bottom: 0;
      position: relative;
      bottom: 0px;
      padding: 15px;
      font-size: 12px;
      min-width: 100%;
      box-sizing: border-box;
    }


</style>

<!-- The ref attr used to find the swiper instance -->
<template >
<section class="back-white height100vh">
   <Filters></Filters>
   <ModalFilters v-if="showfilters"></ModalFilters>
   <article class=" back-white padding20">
     
   </article>

    <Spinner v-if="spin"></Spinner>

    <section class="padding20 back-white relative" style="top:40px;">
          <carousel-3d :controls-visible="true" :controls-prev-html="'&#10092;'" :controls-next-html="'&#10093;'" 
                       :controls-width="30" :controls-height="60" :clickable="true">
            <slide v-for="(slide, i) in slides" :index="i" >
              <figure class="width100 height100 poiter" @click="goBlocks(slide)">
                <img :src="apiUrl + '/' + slide.image_url" class="width100 height100">
              </figure>
              
              
              <figcaption class="relative">
                <div class="flex flex-middle flex-center">
                  <span class="font1-5em">
                    {{slide.type}} 
                  </span>
                  <span class="square50 font1-3em margin-left10 flex flex-middle flex-center rounded" style="border:2px solid black;">{{slide.eagil_quantity}}</span>
                </div>
                  
              </figcaption>
            </slide>
          </carousel-3d>

    </section>
</section>
 
</template>
