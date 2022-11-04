<script>
import AdminQLSV from "../components/Admin/AdminQLSV.vue";
import SinhVien from "../services/student";
import AdminSiderBar from "../components/Admin/AdminSiderBar.vue";
import AdminHeader from "../components/Admin/AdminHeader.vue";
export default {
  components: {
    AdminQLSV,
    AdminSiderBar,
    AdminHeader,
  },
  data() {
    return {
      students: [],
    };
  },
  methods: {
    async retrieveStudents() {
      try {
        this.students = await SinhVien.getAll();
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      this.retrieveStudents();
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
          <h2 class="my-3">Quản Lý Sinh Viên</h2>
          <button class="btn rounded-0 h-100" @click="refreshList()">
            <i class="fa-solid fa-arrows-rotate fs-5"></i>
          </button>
        </div>
        <hr />
        <AdminQLSV :students="students" />
      </main>
    </div>
  </div>
</template>
<style></style>
