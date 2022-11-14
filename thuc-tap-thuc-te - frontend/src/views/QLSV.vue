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
      student: {},
    };
  },
  methods: {
    async deleteStudent(id) {
      if (confirm("Bạn muốn xóa Sinh Viên này?")) {
        try {
          const result = await SinhVien.deleteSV(id);
          alert(result.message)
          this.retrieveStudents();
        }
        catch (error) { alert(error); }
      }
    },
    async updateStudent(id, data) {
      try {
        const result = await SinhVien.updateSV(id, data);
        alert(result.message)
        this.retrieveStudents();
      }
      catch (error) {
        alert(error);
      }
    },
    async addStudent(data) {
      try {
        await SinhVien.create(data);
        this.refreshList();
        this.student = {};
      } catch (error) {
        console.log(error);
      }
    },
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
        </div>
        <hr />
        <AdminQLSV :students="students" @delete:students="deleteStudent" @add:students="addStudent"
                    @update:students="updateStudent"/>
      </main>
    </div>
  </div>
</template>
<style>

</style>
