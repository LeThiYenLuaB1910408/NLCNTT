<script>
import LopHoc from "@/services/class";

export default {
  props: {
    classes: { type: Array, default: [] },
    classCurrent: { type: Array, default: [] },
  },
  data() {
    return {
      activeIndex: null,
      allStudent: [],
      studentInClass: []
    }
  },
  methods: {
    async getAllStudent() {
      this.allStudent = await LopHoc.getAllStudent();
    },
    async showStudents(id) {
      this.activeIndex = id;
      this.studentInClass = this.allStudent.filter((e) => e._id == id)
    }
  },
  mounted() {
    this.getAllStudent();
  }
};
</script>

<template>
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
  </div>
</template>
<style>

</style>
