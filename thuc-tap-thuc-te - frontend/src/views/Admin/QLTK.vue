<script>
import AdminQLTK from "@/components/Admin/AdminQLTK.vue";
import TaiKhoan from "@/services/account";
export default {
  components: {
    AdminQLTK,
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
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="my-3">Quản Lý Tài Khoản</h2>
      <button class="btn btn-outline-primary rounded-0" @click="refreshList()">
        <i class="fa-solid fa-arrows-rotate fs-5"></i>
      </button>

    </div>
    <hr />
    <AdminQLTK :accounts="accounts" />
  </main>
</template>
<style>

</style>
