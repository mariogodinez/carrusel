<script>
import VueStar from 'vue-star'

	export default{
		data(){
			return {
        contact: 'whatsapp'

			}
		},
    watch:{
     
    },
    components:{
      VueStar
    },
    methods:{
      changeContact(value){
        this.contact = value
      }
      
    }
	}
</script>
<style>
  .modal-mask {
  position: fixed;
  z-index: 999543657658;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .8);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  max-width: 560px;
  margin: 0px auto;
  max-height:80vh;
  overflow:auto;
  padding:10px;
  position: relative;
  top:1vh;
  background-color: rgba(231, 236, 241, .9);
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
            <div class="margin-bottom20 padding5 flex flex-middle flex-between" style="position:fixed; top:10px;">
              <h4 class="margin-bottom5 color-darkblue font1-5em"></h4>
              <div class="back-white square30 rounded flex flex-center flex-middle" style="box-shadow:0 0 20px #777;" @click="$emit('closeModalRegister')">
                <p class="ion-close-round color-gray font1-3em"></p>
              </div>
            </div>

            <section class="back-white padding10">
              <div class="padding10">
                <h2 class="font-normal">Registrar Nuevo Prospecto</h2>
              </div>

              <div class="padding0-10">
                <h3 class="font-normal font1-3em color-darkblue margin-bottom5">Nombre</h3>
              </div>
              <div class="padding0-10 flex margin-bottom15">
                <input type="text" class="my-input" name="">
              </div>

              <div class="padding0-10">
                <h3 class="font-normal font1-3em color-darkblue margin-bottom5">Apellidos</h3>
              </div>
              <div class="padding0-10 flex margin-bottom15">
                <input type="text" class="my-input" name="">
              </div>

              <div class="padding0-10">
                <h3 class="font-normal font1-3em color-darkblue margin-bottom5">Correo</h3>
              </div>
              <div class="padding0-10 flex margin-bottom15">
                <input type="text" class="my-input" name="">
              </div>

              <div class="padding0-10">
                <h3 class="font-normal font1-3em color-darkblue margin-bottom5">Celular</h3>
              </div>
              <div class="padding0-10 flex margin-bottom15">
                <input type="text" class="my-input" name="">
              </div>

              <div class="padding0-10">
                <h3 class="font-normal font1-3em color-darkblue margin-bottom5">Venta estimada</h3>
              </div>
              <div class="padding0-10 flex margin-bottom15">
                <input type="text" class="my-input" name="">
              </div>

             
            </section>


            

          </article>
          <div class="modal-footer back-white padding-bottom10">
	          <div class="margin-bottom30 width100 flex flex-center">
                <button class="my-btn border2white width100 pointer back-green text-uppercase color-black font-bold" style="width:80%;">
                   <h3 class="font1-3em color-white">
                   Registrar prospecto</h3>
                </button>
                
              </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
