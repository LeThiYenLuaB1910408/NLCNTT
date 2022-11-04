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
    logout() {
      this.acc.user = {};
      this.$router.push({ name: "login" });
    },
  },
};
</script>
<template>
  <header
    class="navbar sticky-top flex-md-nowrap px-0 shadow align-items-center"
  >
    <div class="d-flex">
      <div class="">
        <a class="navbar-brand col-md-3 col-lg-2 me-2 px-3 text-light" href="#"
          >CIT O-INTERNSHIP</a
        >
      </div>
      <div class="languages">
        <img src="../../assets/VietNam.png" class="me-2" />
        <img src="../../assets/UK.webp" />
      </div>
    </div>
    <nav class="nav-item me-5">
      <i class="dropdown me-2">
        <button
          class="btn dropdown-toggle text-light p-0"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        ></button>
        <ul
          class="dropdown-menu border rounded-0 shadow mt-3"
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
              ><i class="fa-solid fa-gear me-2 text-secondary"></i>Cài đặt</a
            >
          </li>
          <hr class="m-0" />
          <li>
            <a class="dropdown-item" @click="logout()" href="#"
              ><i class="fa-solid fa-right-from-bracket me-2 text-secondary"></i
              >Đăng xuất</a
            >
          </li>
        </ul> </i
      ><a class="text-light text-decoration-none">{{ acc.user.tenDangNhap }}</a>
      <button type="button" class="btn border rounded-circle ms-3 me-0">
        <i class="fa-regular fa-user text-light"></i>
      </button>
    </nav>
  </header>
</template>

<style scoped>
header {
  background-color: rgba(51, 73, 183, 0.814);
}
.languages img {
  width: 30px;
  height: 20px;
  cursor: pointer;
}
</style>
