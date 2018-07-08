<script>

	export default{
		data(){
			return {
        contact: 'whatsapp'

			}
		},
    watch:{
     
    },
    props:['url','msg', 'productNot'],
    components:{
    },
    methods:{
      changeContact(value){
        this.contact = value
      }
      
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
  background-color: rgba(0,0,0, .9);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  max-width: 600px;
  margin: 0px auto;
  max-height:80vh;
  padding:10px;
  overflow:inherit;
  position: relative;
  top:1vh;
  background-color: white;
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
            <div class="modal-header flex flex-center flex-column margin-bottom20">
                <div class="padding20"></div>
                 <article class="flex flex-center">
                  <div class="margin-bottom20 rounded flex flex-center flex-middle color-red" style="width:70px;height:70px; border:4px solid;">
                      <p class="ion-close text-center" style="font-size:3.3em;"></p>
                    </div>
                </article>
                <div class="flex flex-center flex-middle text-center">
                  <h2 class="font-normal text-center font1-5em text-uppercase font-bold" style="color:#333;">¡Error!</h2>
                </div>
              </div>

              <article class="modal-body margin-bottom0 text-center padding10-20">
               

                <div v-if="productNot">
                  <h3  class="font-normal margin0 font1-3em"> El producto:</h3>
                  <p class="font-bold font1-3em" style="margin:5px 0;">{{productNot}}</p>
                  <h3 class="font-normal font1-3em">no se encuentra disponible. Elige otra opción.</h3>
                </div>

                <p class="font1-5em" style="color:#333; line-height:1.2em;" v-if="!productNot">{{ msg || 'Se ha detectado un error, intenta de nuevo.'}}</p>
              </article>
              <div class="padding20"></div>
          </article>
          
        </div>
      </div>
    </div>
  </transition>
</template>
