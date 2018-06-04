<script>
	export default{
		data(){
			return {
        

			}
		},
    watch:{
     
    },
    components:{
    },
    methods:{
      hideFilter(){
        this.$parent.$emit('hideFilter', {status: false})
      },
      
    }
	}
</script>
<style scoped>
  .modal-mask {
  position: fixed;
  z-index: 999543657658;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 1);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  max-width: 880px;
  margin: 0px auto;
  max-height:80vh;
  overflow:auto;
  padding:10px;
  position: relative;
  top:1vh;
  background-color: rgba(255,255,255,0);
  border-radius: 5px;
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin:0;
}

.modal-default-button {
  text-align:center;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <article class="modal-body margin-bottom0 relative" style="padding-top:10px;">
            <div class=" padding5 flex flex-middle flex-between">
              <h4 class="margin-bottom5 color-darkblue font1-5em"></h4>
              <div class="color-yellow pointer square30 rounded flex flex-center flex-middle" style="border:2px solid;" @click="hideFilter">
                <p class="ion-close-round color-yellow font1-3em" ></p>
              </div>
            </div>

            <section class="padding10 flex width100" >
              <article class="padding10 width100" style="margin-right:40px;">
                <div class=" width100 margin-right20 margin-bottom20">
                  <h3 class="font-normal color-white opacity0">:</h3>
                  <div class="relative flex width100">

                    <input type="text" placeholder="Buscar..." class="my-input" >
                    <span class="ion-search  color-gray absolute" style="top:.3em; right:.5em; font-size:1.5em;"></span>
                  </div>
                </div>

                <div class=" flex flex-between margin-bottom20">
                    <div class="margin-right20">
                    <h3 class="font-normal color-white margin-right5">Color:</h3>
                    <div class="relative back-lightgray my-select" style="width:140px;">
                      <select>
                        <option>-</option>
                        <option>Guadalajara</option>
                      </select>
                      <span class="color-black my-select-icon ion-arrow-down-b"></span>
                    </div>
                  </div>

                  <div class="margin-right20">
                    <h3 class="font-normal color-white margin-right5">Cantidad:</h3>
                    <div class="relative back-lightgray my-select" style="width:140px;">
                      <select>
                        <option>-</option>
                        <option>Guadalajara</option>
                      </select>
                      <span class="color-black my-select-icon ion-arrow-down-b"></span>
                    </div>
                  </div>


                  <div class=" ">
                    <h3 class="font-normal color-white margin-right5">Precio:</h3>
                    <div class="relative back-lightgray my-select" style="width:140px;">
                      <select>
                        <option>-</option>
                        <option>Guadalajara</option>
                      </select>
                      <span class="color-black my-select-icon ion-arrow-down-b"></span>
                    </div>
                  </div>
                </div>
                

                <div class="flex-right flex" style="padding-top:13px;">
                  <p class="color-yellow font1-3em anchor"><span class="ion-trash-a"></span> Limpiar filtros</p>
                </div>

                
              </article>

              
              <article class="" style="margin-top:8px;">
                <div class="">
                  <h3 class="font-normal color-white">Cd:</h3>
                  <div class="relative back-lightgray my-select" style="width:140px;">
                    <select>
                      <option>-</option>
                      <option>Guadalajara</option>
                    </select>
                    <span class="color-black my-select-icon ion-arrow-down-b"></span>
                  </div>
                </div>



                <div class="" style="margin-top:15px;">
                  <h3 class="font-normal color-white ">Medidas:</h3>
                  <div class="relative back-lightgray my-select" style="width:140px;">
                    <select>
                      <option>-</option>
                      <option>Guadalajara</option>
                    </select>
                    <span class="color-black my-select-icon ion-arrow-down-b"></span>
                  </div>
                </div>

                 <div class="" style="margin-top:20px;">
                  <button class="my-btn back-yellow width100" style="border:1px solid white">
                    <h3 class="text-uppercase">Filtrar</h3>
                  </button>
                </div>
              </article>

            </section>

          </article>
          <!-- <div class="modal-footer back-white padding-bottom10">
          </div> -->
        </div>
      </div>
    </div>
  </transition>
</template>
