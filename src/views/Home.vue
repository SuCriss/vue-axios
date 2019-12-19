<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  created() {
    let userInfo = {
        username: "李凯",
        password:"likaia098890"
      };
      this.axios.get("/mock",userInfo).then((response)=>{
        const data = response.data;
        // 设置token
        // localStorage.setItem('token', data.token);
        console.log(data);
      }).catch((error)=>{
        console.log(error);
      });
  },
}
</script>
