<script>
import { useAccountStore } from "@/stores/AccountStore";

export default {
  setup() {
    const acc = useAccountStore();
    console.log(acc.user);
    return {
      acc,
    };
    
  },
  methods: {
    khoahocscroll() {
      document.documentElement.scrollTop = 840;
    },
    bomonscroll() {
      document.documentElement.scrollTop = 20;
    },
    logout(){
      this.acc.user = {};
      this.$router.push({ name: "login" });
    }
  },
};
</script>

<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark"
    style="background-color: rgba(51, 73, 183, 0.814)"
  >
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse justify-content-center"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav" style="word-spacing: 4px; font-weight: 700">
          <li class="nav-item me-4">
            <router-link to="/" class="nav-link text-light"
              >TRANG CHỦ</router-link
            >
          </li>
          <li class="nav-item me-4" @click="bomonscroll">
            <a class="nav-link text-light">CÁC KHOA</a>
          </li>
          <li class="nav-item me-4" @click="khoahocscroll">
            <a class="nav-link text-light">CÁC KHÓA THỰC TẬP</a>
          </li>
          <li class="nav-item me-4">
            <a class="nav-link text-light" href="#3">NHÀ TUYỂN DỤNG</a>
          </li>
          <li class="nav-item me-4" v-if="acc.user.HoTen==null">
            <router-link to="/login" class="nav-link text-light"
              >ĐĂNG NHẬP</router-link
            >
          </li>
          <li class="nav-item me-4" v-else>
            <button type="button" class="btn border rounded-circle me-2">
              <i class="fa-regular fa-user text-light"></i></button
            ><a class="text-light text-decoration-none">{{ acc.user.HoTen }}</a>
            <i class="dropdown ms-2">
              <button
                class="btn dropdown-toggle text-light p-0"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></button>
              <ul
                class="dropdown-menu border rounded-0 shadow"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <a class="dropdown-item" href="#"
                    ><i class="fa-solid fa-user me-2 text-secondary"></i
                    ><i class="fw-normal">Trang cá nhân</i></a
                  >
                </li>
                <hr class="m-0" />
                <li>
                  <a class="dropdown-item" href="#"
                    ><i class="fa-solid fa-message me-2 text-secondary"></i>Tin
                    nhắn</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="#"
                    ><i class="fa-solid fa-gear me-2 text-secondary"></i>Cài
                    đặt</a
                  >
                </li>
                <hr class="m-0" />
                <li>
                  <a class="dropdown-item" @click="logout()"
                    ><i
                      class="fa-solid fa-right-from-bracket me-2 text-secondary"
                    ></i
                    >Đăng xuất</a
                  >
                </li>
              </ul>
            </i>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  background-color: rgba(51, 73, 183, 0.814);
}
nav li {
  cursor: pointer;
}
.container-fluid {
  display: flex;
  justify-content: center;
}

a:hover {
  color: black !important;
}
</style>
