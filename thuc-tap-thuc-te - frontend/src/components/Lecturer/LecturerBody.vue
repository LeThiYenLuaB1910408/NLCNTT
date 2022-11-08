<script>
import LopHoc from '@/services/class';

import { useAccountStore } from "@/stores/AccountStore";

export default {

  data() {
    const accStore = useAccountStore();

    return {
      date: new Date(),
      students: [],
      selected: "",
      accStore
    };
  },
  methods: {
    async getAll() {
      this.students = await LopHoc.getAllStudent();
      this.students = this.students.filter(e => e.SinhVien.MSGV == this.accStore.user._id)
    },
    async onChangeLecturer(data) {
      await LopHoc.update(data)
      this.getAll();
    }
  },
  created() {
    console.log(12345);
    this.getAll();
  }
};
</script>

<template>
  <div class="container-fluid border-bottom border-dark pb-5">
    <div class="row">
      <div class="col-md-9 px-5">
        <div class="container my-3">
          <nav
            style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E&#34;);"
            aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-decoration-none text-black">Trang Chủ</router-link>
              </li>
              <li class="breadcrumb-item"><a>Khoa Công Nghệ Thông Tin</a></li>
              <router-link to="/CNTT" class="breadcrumb-item text-decoration-none text-black">
                Các Khóa Thực Tập
              </router-link>
              <li class="breadcrumb-item active" aria-current="page">
                Nội dung học phần
              </li>
            </ol>
          </nav>
        </div>

        <div class="container content">
          <div class="row mb-5">
            <h5 class="my-4 form text-secondary">DANH SÁCH SINH VIÊN</h5>
            <p>
              <i class="fa-solid fa-clipboard-list me-2"></i>
              <a class="" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false"
                aria-controls="collapseExample">
                Danh sách sinh viên
              </a>
            </p>
            <div class="collapse" id="collapseExample">
              <div class="card card-body border border-dark rounded-0">
                <table class="table">
                  <thead align="center">
                    <tr>
                      <th scope="col">STT</th>
                      <th scope="col">MSSV</th>
                      <th scope="col">Họ và Tên</th>
                      <th scope="col">Mã lớp</th>
                      <th scope="col">Chuyên Ngành</th>
                      <th scope="col">Tên Công Ty</th>
                      <th scope="col">Điểm</th>
                      <th scope="col">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody align="center">
                    <tr v-for="(student, index) in this.students" :key="index">
                      <th scope="row">{{ index + 1 }}</th>
                      <td>{{ student.SinhVienLop._id }}</td>
                      <td>{{ student.SinhVienLop.HoTen }}</td>
                      <td>{{ student.SinhVienLop.MaLop }}</td>
                      <td>{{ student.SinhVienLop.ChuyenNganh }}</td>
                      <td>{{ student.CanBo.TenCongTy }}</td>
                      <td>
                        <input type="text" v-if="student.SinhVien.DiemSo == ''" placeholder="Điểm chữ" v-model="student.Diem"/>
                        <p v-else>{{ student.SinhVien.DiemSo
                        }}</p>
                      </td>
                      <td class="text-center pt-2">
                        <i @click="onChangeLecturer({ _id: student._id, MSSV: student.SinhVienLop._id, DiemSo: student.Diem })"
                          class="fa-regular fa-floppy-disk fs-4 mt-1 text-secondary" style="cursor: pointer"></i>
                        <i @click="student.SinhVien.DiemSo = ''"
                          class="fa-regular fa-pen-to-square fs-5 mt-1 text-secondary ms-2" style="cursor: pointer"></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="container past">
          <div class="row mb-5">
            <h5 class="my-4 bao-cao text-secondary">BÁO CÁO</h5>
            <div class="row">
              <div class="nop-bao-cao col-md-9">
                <i class="fa-solid fa-file me-2"></i>
                <a href="#" class="text-decoration-none">Nộp file báo cáo TTTT-CNTT</a>
                <p>Lớp học phần CT47101</p>
              </div>
              <div class="check col-md-3">
                <div class="form-check">
                  <input class="form-check-input border border-dark rounded-0" type="checkbox" value=""
                    id="flexCheckDefault">
                  Ẩn
                </div>
                <i class="fa-solid fa-pen-to-square fs-5 me-1"></i>Edit
              </div>
              <div class="d-flex justify-content-end">
                <div><i class="fa-solid fa-circle-plus me-2 fs-5"></i></div>
                <div class="">Thêm hoạt động</div>
              </div>
            </div>
          </div>
        </div>
        <div class="container topic">
          <div class="row mb-5">
            <h5 class="my-4 bao-cao text-secondary">CHỦ ĐỀ 3</h5>
          </div>
        </div>
        <div class="container topic">
          <div class="row mb-5">
            <h5 class="my-4 bao-cao text-secondary">CHỦ ĐỀ 4</h5>
          </div>
        </div>
        <div class="container topic">
          <div class="row mb-5">
            <h5 class="my-4 bao-cao text-secondary">CHỦ ĐỀ 5</h5>
          </div>
        </div>
      </div>
      <div class="col-md-3 mt-5">
        <div class="container thong-bao py-2 mt-4">
          <div class="row p-3">
            <h5><i class="fa-solid fa-bullhorn me-3"></i>THÔNG BÁO MỚI</h5>
            <hr />
          </div>
          <div class="row text-center pb-3">
            <i>Chưa có thông báo mới ...</i>
          </div>
        </div>
        <section class="container mt-5 pb-4">
          <div class="row p-3">
            <h5><i class="fa-regular fa-calendar-days me-3"></i>LỊCH</h5>
          </div>
          <v-date-picker v-model="date" class="w-100 border rounded-0" />
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form,
.bao-cao {
  background: rgb(228, 225, 225);
  padding: 10px 0 10px 5px;
  border-left: 3px solid rgba(80, 116, 235, 0.814);
}

section,
.thong-bao {
  box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.5);
  border-top: 5px solid rgba(80, 116, 235, 0.814);
  border-radius: 0;
}

th,
span,
td {
  padding: 5px;
}

th span {
  font-size: 15px;
}

.current a {
  text-decoration: none;
  font-weight: bold;
}
</style>
