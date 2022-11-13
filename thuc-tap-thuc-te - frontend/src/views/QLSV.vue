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
        <AdminQLSV :students="students" />
        <div class="btn-group mb-3 border" role="group" aria-label="Basic ">
          <button class="btn btn-outline-primary rounded-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample"
            aria-expanded="false" aria-controls="collapseExample">
            <i class="fa-solid fa-plus me-2"></i>Thêm sinh viên
          </button>
          <button class="btn btn-outline-primary rounded-0" type="button" @click="refreshList()">
            <i class="fa-solid fa-arrows-rotate fs-5"></i>
          </button>
        </div>
        <div class="collapse" id="collapseExample">
          <div class="container w-50 border border-dark py-4">
            <div class="header text-center">
              <h5>THÔNG TIN SINH VIÊN</h5>
            </div>
            <div class="row">
              <div class="col-md-3 mb-3 mt-3">
                <label for="mssv" class="form-label">MSSV:</label>
                <input type="text" class="form-control border rounded-0" id="mssv" name="mssv"
                  v-model="this.student._id" />
              </div>
              <div class="col-md-5 mb-3 mt-3">
                <label for="ht" class="form-label">Họ Tên</label>
                <input type="text" class="form-control border rounded-0" id="ht" name="ht"
                  v-model="this.student.HoTen" />
              </div>
              <div class="col-md-4 mb-3 mt-3">
                <label for="sdt" class="form-label">Số điện thoại:</label>
                <input type="text" class="form-control border rounded-0" id="sdt" name="sdt"
                  v-model="this.student.Sdt" />
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3 mt-3">
                <label for="ml" class="form-label">Mã Lớp:</label>
                <input type="text" class="form-control border rounded-0" id="ml" name="ml"
                  v-model="this.student.MaLop" />
              </div>
              <div class="col-md-6 mb-3 mt-3">
                <label for="cn" class="form-label">Chuyên Ngành:</label>
                <select id="inputState" class="form-select" v-model="this.student.ChuyenNganh">
                  <option selected>Choose...</option>
                  <option value="CNTT">CNTT</option>
                  <option value="THUD">THUD</option>
                  <option value="CNPM">CNPM</option>
                  <option value="MMT&TT">MMT&TT</option>
                  <option value="KHMT">KHMT</option>
                  <option value="HTTT">HTTT</option>
                </select>
              </div>
            </div>

            <div class="text-center mt-3">
              <button class="btn btn-primary border rounded-0" data-bs-toggle="collapse" href="#btncheck1"
                @click="addStudent(this.student)">
                Thêm Sinh Viên
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<style>

</style>
