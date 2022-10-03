<template>
    <div dir="rtl" style="height:100%;width:100vw">
      <div v-if="loggedin" style="width:100vw;padding: 0;">
        <NavigationBar />
        <div class="row w-100 " style="width:100vw">
          <div class="col" style="width:100vw">
            <router-view></router-view>
          </div>
        
    
        </div>
      </div>
    
      <Registerandlogin v-if="!loggedin" />
    </div>
    
</template>
  
<script>
  
  
  import Registerandlogin from './RegisterAndLogin.vue';
  import NavigationBar from './NavigationBar.vue'

  
  export default {
   
    data:()=>{
      return {
        loggedin:false
      }
    },
    components: {
    Registerandlogin,
    NavigationBar,

},
  mounted(){
    this.loggedin= localStorage.getItem('user')!=null;
  }
  }
  </script>