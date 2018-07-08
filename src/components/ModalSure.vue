<script>
	export default{
		data(){
			return {
        contact: 'whatsapp'
			}
		},
    watch:{
     
    },
    components:{
    },
    methods:{
      changeContact(value){
        this.contact = value
      },
      closeModal(){
        this.$parent.$emit('closeModal', {reload: false})
      },
      confirmSend(){
        this.$parent.$emit('sendCotization', {send: true})
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
  max-width: 460px;
  min-height: 200px;
  margin: 0px auto;
  max-height:80vh;
  overflow:auto;
  padding:10px;
  position: relative;
  top:1vh;
  background: white;
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
        <div class="modal-container flex flex-center flex-middle">
          <article class="modal-body margin-bottom0 relative ">

            <section class="back-white padding10">
               <!--  <div class="margin-bottom20">
                  <p class="ion-checkmark color-green text-center" style="font-size:4em;"></p>
                </div> -->
                <div class="padding10"></div>

                <article class="margin-bottom20">
                  <h2 class="color-black text-center text-uppercase font1-5em">¿Está seguro de mandar esta cotización?</h2>
                </article>
                <div class="padding10"></div>
                
                <article class="flex flex-middle flex-center margin-bottom20">
                    <button class="my-btn back-yellow color-black" style="border:2px solid white; box-shadow:0 0 20px gray; width:200px;" @click="confirmSend">
                    <h3 class="font1-3em color-black text-uppercase">Solicitar</h3>
                  </button>
                </article>

                <article class="flex flex-middle flex-center">
                    <p class="font1-3em anchor text-center font-bold text-uppercase" @click="closeModal">Cancelar</p>
                </article>

                <div class="padding10"></div>

                
             
            </section>

          </article>
        </div>
      </div>
    </div>
  </transition>
</template>
