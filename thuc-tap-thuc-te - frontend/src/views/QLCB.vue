<script>
import AdminQLCB from "../components/Admin/AdminQLCB.vue";
import GiangVien from "../services/lecturer";
import AdminSiderBar from "../components/Admin/AdminSiderBar.vue";
import AdminHeader from "../components/Admin/AdminHeader.vue";
export default {
  components: {
    AdminQLCB,
    AdminSiderBar,
    AdminHeader,
  },
  data() {
    return {
      teachers: [],
      teacher: {
        HoTen: "",
        Sdt: "",
        Email: "",
        TenCongTy: "",
        TenDangNhap: "",
      },
    };
  },
  methods: {
    async deleteTeacher(id) {
      if (confirm("Bạn muốn xóa Cán Bộ này?")) {
        try {
          const result = await GiangVien.deleteCB(id);
          alert(result.message)
          this.retrieveTeachers();
        }
        catch (error) { alert(error); }
      }
    },
    async updateTeacher(id,data) {
        try {
          await GiangVien.updateCB(id,data);
          this.retrieveTeachers();
        }
        catch (error) { alert(error);
      }
    },
    async addTeacher(data) {
        try {
          await GiangVien.addCB(data);
          this.retrieveTeachers();
        }
        catch (error) { alert(error);
      }
    },
    async retrieveTeachers() {
      try {
        this.teachers = await GiangVien.getAllCB();
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      this.retrieveTeachers();
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
          <h2 class="my-3">Quản Lý Cán Bộ</h2>
          
        </div>
        <hr />
        <AdminQLCB :teachers="teachers" @delete:teachers="deleteTeacher" @add:teachers="addTeacher"
          @update:teachers="updateTeacher" />
      </main>
    </div>
  </div>
</template>
<style>

</style>
