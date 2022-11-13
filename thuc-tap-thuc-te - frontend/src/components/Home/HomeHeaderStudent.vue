<script>
import HomeNavBarStudent from "../Home/HomeNavBarStudent.vue";

export default {
  components: { HomeNavBarStudent },
};
</script>

<template>
  <div class="header">
    <div class="logo">
      <img src="../../assets/cit.png" />
      <div class="slogan">
        <h2>CIT O-INTERNSHIP</h2>
        <h5>Hệ Thống Đăng Ký Thực Tập Trực Tuyến</h5>
      </div>
    </div>
    <div class="languages">
      <img src="../../assets/VietNam.png" class="me-2" />
      <img src="../../assets/UK.webp" />
    </div>
  </div>
  <HomeNavBarStudent />
</template>

<style scoped>
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

form {
  width: 300px;
  height: 50px;
  margin: 20px 0;
}

form button {
  background-color: rgba(51, 73, 183, 0.814);
}
form button:hover,
form button:active {
  background-color: rgba(95, 115, 217, 0.814) !important;
}
</style>
