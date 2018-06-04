 <template>
  <div id="app">
<!--     <router-link to="/app">Router App</router-link>
    <router-link to="/login">Login</router-link> -->
	
	   <HeaderComponent v-if="logged"></HeaderComponent>

    <router-view style="padding-top:60px;"></router-view>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'


export default {
  name: 'app',
  components: {
    HeaderComponent
  },
  computed:{
    logged(){
      return this.$store.getters.logged
    }
  }
}
</script>
