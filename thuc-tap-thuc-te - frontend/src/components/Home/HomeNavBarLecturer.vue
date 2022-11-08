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
    logout() {
      this.acc.user = {};
      this.$router.push({ name: "login" });
    },
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
      <div class="collapse d-block w-100" id="navbarSupportedContent">
        <ul
          class="navbar-nav d-flex justify-content-between"
          style="word-spacing: 4px; font-weight: 700"
        >
          <li class="nav-item me-4">
            <router-link class="nav-link text-light"
              >TRANG CHỦ</router-link
            >
          </li>

          <li class="nav-item me-4" v-if="acc.user.HoTen == null">
            <router-link to="/login" class="nav-link text-light"
              >ĐĂNG NHẬP</router-link
            >
          </li>
          <li class="nav-item me-4" v-else>
            <i class="dropdown me-2">
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
            <a class="text-light text-decoration-none">{{ acc.user.HoTen }}</a>

            <button type="button" class="btn border rounded-circle ms-2">
              <i class="fa-solid fa-user-tie text-light"></i>
            </button>
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
/* 
.dropdown-menu{
  box-shadow: 0px 2px 0px 0px black;
} */
</style>
