<script>
import HomeFooter from "@/components/Home/HomeFooter.vue";
export default {
  components: {
    HomeFooter,
  }
}
</script>

<template>
  <router-view />
  
  <footer>
    <HomeFooter />
  </footer>
</template>

<style scoped>
</style>
