<script setup>
import HomeFooter from "./components/Home/HomeFooter.vue";
</script>

<template>
  <header class="position-sticky top-0">
    <div class="">
      <router-view class="view header" name="header" ></router-view>
    </div>
  </header>

  <main>
    <router-view class="view"></router-view>
  </main>

  <footer>
    <HomeFooter />
  </footer>
</template>

<style scoped>
header {
  z-index: 1000;
  background: #fff;
}
</style>
