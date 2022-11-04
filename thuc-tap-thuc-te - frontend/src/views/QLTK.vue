<script>
import AdminQLTK from "../components/Admin/AdminQLTK.vue";
import TaiKhoan from "../services/account";
import AdminSiderBar from "../components/Admin/AdminSiderBar.vue";
import AdminHeader from "../components/Admin/AdminHeader.vue";
export default {
  components: {
    AdminSiderBar,
    AdminQLTK,
    AdminHeader,
  },
  data() {
    return {
      accounts: [],
    };
  },
  methods: {
    async retrieveAccounts() {
      try {
        this.accounts = await TaiKhoan.getAll();
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      this.retrieveAccounts();
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<template>
  <AdminHeader />
  <div class="container-fluid">
    <div class="row">
      <AdminSiderBar />
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="d-flex justify-content-between align-items-center">
          <h2 class="my-3">Quản Lý Tài Khoản</h2>
          <div
          class="btn-group"
          role="group"
          aria-label="Basic checkbox toggle button group"
        >
          <input
            type="checkbox"
            class="btn-check"
            id="btncheck1"
            autocomplete="off"
            data-bs-toggle="collapse"
            href="#btncheck1"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          />
          <label class="btn btn-outline-primary" for="btncheck1"
            ><i class="fa-solid fa-plus me-2"></i>Tạo tài khoản</label
          >
          <input
            type="checkbox"
            class="btn-check"
            id="btncheck3"
            autocomplete="off"
          />
          <label class="btn btn-outline-primary" for="btncheck3" @click="refreshList()"
            ><i class="fa-solid fa-arrows-rotate fs-5"></i></label
          >
        </div>
        </div>
        <hr />
        <AdminQLTK :accounts="accounts" />
      </main>
    </div>
  </div>
</template>
<style></style>
