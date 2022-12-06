<script>
import HomeNavBarLecturer from "@/components/Home/HomeNavBarLecturer.vue";
import Calendar from '@/components/components/Calendar.vue';

export default {
  components: {
    HomeNavBarLecturer,
    Calendar,
  },
};
</script>

<template>
  <header class="position-sticky top-0">
    <div>
      <div class="header">
        <div class="logo">
          <img src="@/assets/cit.png" />
          <div class="slogan">
            <h2>CIT O-INTERNSHIP</h2>
            <h5>Hệ Thống Đăng Ký Thực Tập Trực Tuyến</h5>
          </div>
        </div>
        <div class="languages">
          <img src="@/assets/VietNam.png" class="me-2" />
          <img src="@/assets/UK.webp" />
        </div>
      </div>
      <HomeNavBarLecturer />
    </div>
  </header>

  <main>
    <div class="container-fluid border-bottom border-dark pb-5">
      <div class="row">
        <router-view />
        <Calendar />
      </div>
    </div>

  </main>
</template>


<style scoped>
header {
  z-index: 1000;
  background: #fff;
}

.header {
  border-top: 5px solid rgba(51, 73, 183, 0.814);
  padding: 20px 0;
  display: flex;
  justify-content: space-evenly;
}

.logo img {
  width: 15%;
  margin-right: 30px;
}

.logo {
  display: flex;
}

.slogan {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.slogan h2 {
  font-weight: bold;
}

.languages {
  padding-top: 60px;
}

.languages img {
  width: 30px;
  height: 20px;
  cursor: pointer;
}
</style>
