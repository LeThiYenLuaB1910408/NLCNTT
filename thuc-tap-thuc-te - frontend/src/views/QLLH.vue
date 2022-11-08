<script>
import AdminQLLH from "../components/Admin/AdminQLLH.vue";
import LopHoc from "@/services/class";
import AdminHeader from "../components/Admin/AdminHeader.vue";
import AdminSiderBar from "../components/Admin/AdminSiderBar.vue";
export default {
  components: {
    AdminQLLH,
    AdminHeader,
    AdminSiderBar,
  },
  data() {
    return {
      classes: [],
      class: {
        _id: "",
        MaLopTT: "",
        NienKhoa: "",
        ChuyenNganh: "",
        HocKi: "",
      },
    };
  },
  methods: {
    async addClass(data) {
      try {
        await LopHoc.create(data);
        this.refreshList();
        this.class = {
          _id: "",
          MaLopTT: "",
          NienKhoa: "",
          ChuyenNganh: "",
          HocKi: "",
        };
      } catch (error) {
        console.log(error);
      }
    },

    async retrieveClasses() {
      try {
        this.classes = await LopHoc.getAll();
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      this.retrieveClasses();
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
          <h2 class="my-3">Quản Lý Lớp Học</h2>

        </div>
        <hr />
        <div class="btn-group mb-3 border" role="group" aria-label="Basic checkbox toggle button group">
          <button class="btn btn-outline-primary rounded-0" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
            <i class="fa-solid fa-plus me-2"></i>Tạo lớp học
          </button>
          <button class="btn btn-outline-primary rounded-0" type="button" @click="refreshList()">
            <i class="fa-solid fa-arrows-rotate fs-5"></i>
          </button>

        </div>
        <div class="collapse" id="collapseExample">
          <div class="container w-50 border border-dark py-4 ms-0">
            <div class="header text-center">
              <h5>THÔNG TIN LỚP HỌC</h5>
            </div>
            <div class="mb-3 mt-3">
              <label for="lh" class="form-label">Mã Lớp Học:</label>
              <input type="text" class="form-control border rounded-0" id="lh" placeholder="" name="lh"
                v-model="this.class.MaLopTT" />
            </div>
            <div class="mb-3 mt-3">
              <label for="lh" class="form-label">Chuyên Ngành:</label>
              <input type="text" class="form-control border rounded-0" id="lh" placeholder="" name="lh"
                v-model="this.class.ChuyenNganh" />
            </div>
            <div class="row">
              <div class="col-md-6 mb-3 mt-3">
                <label for="hk" class="form-label">Học Kì:</label>
                <select id="inputState" class="form-select" v-model="this.class.HocKi">
                  <option selected>Choose...</option>
                  <option>1</option>
                  <option>2</option>
                  <option>Hè</option>
                </select>
              </div>
              <div class="col-md-6 mb-3 mt-3">
                <label for="nk" class="form-label">Niên Khóa:</label>
                <select id="inputState" class="form-select" v-model="this.class.NienKhoa">
                  <option selected>Choose...</option>
                  <option>2019-2020</option>
                  <option>2020-2021</option>
                  <option>2021-2022</option>
                  <option>2022-2023</option>
                </select>
              </div>
            </div>
            <div class="text-center mt-3">
              <button class="btn btn-primary border rounded-0" data-bs-toggle="collapse" href="#btncheck1"
                @click="addClass(this.class)">
                Tạo Lớp Học
              </button>
            </div>
          </div>
        </div>
        <AdminQLLH :classes="classes" />
      </main>
    </div>
  </div>
</template>

<style>

</style>
