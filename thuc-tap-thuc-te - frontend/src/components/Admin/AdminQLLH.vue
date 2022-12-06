<script>
import LopHoc from "@/services/class";

export default {
  props: {
    classes: { type: Array, default: [] },
    classCurrent: { type: Array, default: [] },
  },
  data() {
    return {
      year: new Date().getFullYear(),
      activeIndex: null,
      allStudent: [],
      studentInClass: [],
      class: {},
      data: {
        CT471: "CNTT",
        CT472: "CNPM",
        CT473: "MMT&TT",
        CT474: "KHMT",
        CT475: "THUD",
        CT476: "HTTT",
      }
    }
  },
  emits: ["refresh:classes"],
  methods: {
    async getAllStudent() {
      this.allStudent = await LopHoc.getAllStudent();
    },
    refreshList() {
      this.$emit("refresh:classes");
    },
    async addClass() {
      try {
        await LopHoc.create(this.class);
        this.class = {};
        this.refreshList();
      } catch (error) {
        console.log(error);
      }
    },
    async showStudents(id) {
      this.activeIndex = id;
      this.studentInClass = this.allStudent.filter((e) => e._id == id)
    },
  },
  mounted() {
    this.getAllStudent();
  }
};
</script>

<template>
  <div class="btn-group mb-3 border" role="group" aria-label="Basic checkbox toggle button group">
    <button class="btn btn-outline-primary rounded-0" type="button" data-bs-toggle="modal"
      data-bs-target="#exampleModal">
      <i class="fa-solid fa-plus me-2"></i>Tạo lớp học
    </button>
    <button class="btn btn-outline-primary rounded-0" type="button" @click="refreshList()">
      <i class="fa-solid fa-arrows-rotate fs-5"></i>
    </button>

  </div>
  <div class="row">
    <div class="container lop-hoc my-3 col-lg-4">
      <h5 class="mt-2">Danh sách lớp học gần đây</h5>

      <li class="list-group-item py-2 ps-2 border border-secondary rounded-0" v-for="(lh, index) in classCurrent"
        :key="lh._id">
        {{ index + 1 }}.
        <a href="#" @click="showStudents(lh._id)"> Lớp thực tập {{ lh.ChuyenNganh }} {{ lh.MaLopTT }} {{ lh.NienKhoa
        }}</a>
      </li>
      <h5 class="mt-2">Danh sách lớp học</h5>
      <li class="list-group-item py-2 ps-2 border border-secondary rounded-0" v-for="(lh, index) in classes"
        :key="lh._id">
        {{ index + 1 }}.
        <a href="#" @click="showStudents(lh._id)"> Lớp thực tập {{ lh.ChuyenNganh }} {{ lh.MaLopTT }} {{ lh.NienKhoa
        }}</a>
      </li>
    </div>

    <div class="col-lg-8">
      <div v-if="this.activeIndex != null">
        <div class="card card-body">
          <i class="fa-solid fa-xmark ms-auto fs-5" @click="this.activeIndex = null" style="cursor: pointer"></i>
          <h5 class="text-center mb-4">Danh sách sinh viên lớp</h5>
          <p>Số lượng sinh viên: {{ this.studentInClass.length }} </p>
          <table class="table table-striped table-sm">
            <thead align="center">
              <tr>
                <th scope="col">STT</th>
                <th scope="col">MSSV</th>
                <th scope="col">Họ và tên</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Mã lớp</th>
                <th scope="col">Chuyên Ngành</th>
              </tr>
            </thead>
            <tbody align="center">
              <tr v-for="(e, i) in this.studentInClass" :key="i">
                <td>{{ i + 1 }}</td>
                <td>{{ e.SinhVienLop._id }}</td>
                <td>{{ e.SinhVienLop.HoTen }}</td>
                <td>{{ e.SinhVienLop.Sdt }}</td>
                <td>{{ e.SinhVienLop.MaLop }}</td>
                <td>{{ e.SinhVienLop.ChuyenNganh }}</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>

    <div class="modal fade hide" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="header text-center">
              <div class="header text-center">
                <h5>THÔNG TIN LỚP HỌC</h5>
              </div>
              <div class="row">
                <div class=" col-md-6 mb-3 mt-3">
                  <label for="lh" class="form-label">Mã Lớp Học:</label>
                  <select id="inputState" class="form-select" v-model="this.class.MaLopTT"
                    @change="this.class.ChuyenNganh = this.data[this.class.MaLopTT];">
                    <option selected>Choose...</option>
                    <option value="CT471">CT471</option>
                    <option value="CT472">CT472</option>
                    <option value="CT473">CT473</option>
                    <option value="CT474">CT474</option>
                    <option value="CT475">CT475</option>
                    <option value="CT476">CT476</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3 mt-3">
                  <label for="lh" class="form-label">Chuyên Ngành:</label>
                  <input type="text" disabled class="form-control" v-model="this.class.ChuyenNganh" />

                </div>
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
                    <option>{{this.year-1}} - {{this.year}}</option>
                    <option>{{this.year}} - {{this.year+1}}</option>
                    <option>{{this.year+1}} - {{this.year+2}}</option>
                  </select>
                </div>
              </div>
              <div class="text-center mt-3">
                <button class="btn btn-primary border rounded-0" data-bs-toggle="modal" @click="addClass">
                  Tạo Lớp Học
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>

</style>
