<script>
import GiangVien from '@/services/lecturer';
import LopHoc from '@/services/class';
import Calendar from '../Home/Calendar.vue';
export default {
  components: {
    Calendar
  },
  data() {
    return {
      students: [],
      giangvien: [],
      selected: null
    };
  },
  methods: {
    async getAll() {
      this.students = await LopHoc.getAllStudent();
      console.log(this.students);
      this.giangvien = await GiangVien.getAll();
      this.giangvien = this.giangvien.filter((e) => e.BoMon !== null)

    },
    async onChangeLecturer(data) {
      await LopHoc.update(data)
      this.getAll();
      this.selected.SinhVien.MSGV = data.MSGV
    }
  },
  mounted() {
    this.getAll();
  }
};
</script>

<template>
  <div class="container-fluid border-bottom border-dark pb-5">
    <div class="row">
      <div class="col-md-9 px-2">
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
                      <th scope="col">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody align="center" style="font-size: .9em;">
                    <tr v-for="(student, index) in this.students" :key="index">
                      <th scope="row">{{ index + 1 }}</th>
                      <td>{{ student.SinhVienLop._id }}</td>
                      <td>{{ student.SinhVienLop.HoTen }}</td>
                      <td>{{ student.SinhVienLop.MaLop }}</td>
                      <td>{{ student.SinhVienLop.ChuyenNganh }}</td>
                      <td>{{ student.CanBo.TenCongTy }}</td>
                      <td class="text-center">
                        <i class="fa-solid fa-circle-info fs-5 mt-1 text-secondary" data-bs-toggle="modal"
                          data-bs-target="#exampleModal" style="cursor: pointer" @click="this.selected = student"></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade hide " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div v-if="this.selected" class="modal-body">
                <h5 class="text-center mb-4">THÔNG TIN SINH VIÊN</h5>
                <div class="row">
                  <div class="col-3">
                    <p><strong>MSSV:</strong> {{ this.selected.SinhVienLop._id }}</p>
                  </div>
                  <div class="col-4">
                    <p><strong>Họ Tên:</strong> {{ this.selected.SinhVienLop.HoTen }}</p>
                  </div>
                  <div class="col-5">
                    <p><strong>Số Điện Thoại:</strong> {{ this.selected.SinhVienLop.Sdt }}</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-3">
                    <p><strong>Mã Lớp:</strong> {{ this.selected.SinhVienLop.MaLop }}</p>
                  </div>
                  <div class="col-4">
                    <p><strong>Chuyên Ngành:</strong> {{ this.selected.SinhVienLop.ChuyenNganh }}</p>
                  </div>
                  <div class="col-5">
                    <p><strong>Học Kỳ-Niên Khóa:</strong> {{ this.selected.HocKi }} {{ this.selected.NienKhoa }}</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-3">
                    <p><strong>Công Ty:</strong> {{ this.selected.CanBo.TenCongTy }}</p>
                  </div>
                  <div class="col-6">
                    <p><strong>Cán Bộ Công Ty:</strong> {{ this.selected.CanBo.HoTen }}</p>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="d-flex align-items-center">
                    <strong class="me-3">Giảng Viên Hướng Dẫn:</strong>
                    <span v-if="this.selected.SinhVien.MSGV == ''">
                      <select class="form-select " v-model="this.selected.newMSGV">
                        <option class="fw-bold" disabled>Chọn giảng viên</option>
                        <option v-for="(gv, index) in this.giangvien" :key="index" :value="gv.MSGV">
                          {{ gv.HoTen }} ({{ gv.MaLop.toString() }})
                        </option>

                      </select>
                    </span>
                    <span v-else>{{ this.giangvien.filter((e) => (e.MSGV == this.selected.SinhVien.MSGV) ?
                        e.HoTen : null)[0].HoTen
                    }}</span>
                    <div class="d-flex ms-3">
                      <i @click="this.selected.SinhVien.MSGV = ''"
                        class="fa-regular fa-pen-to-square fs-5 text-secondary me-2" style="cursor: pointer"></i>
                      <i @click="onChangeLecturer({ _id: this.selected._id, MSSV: this.selected.SinhVienLop._id, MSGV: this.selected.newMSGV })"
                        class="fa-regular fa-floppy-disk fs-5  text-secondary" style="cursor: pointer"></i>
                    </div>
                  </div>
                </div>

                <p><strong>File Công Việc:</strong> {{ this.selected.SinhVien.FileCongViec ?? 'Chưa cập nhật' }}
                </p>
                <p><strong>Điểm Số:</strong> {{ this.selected.SinhVien.DiemSo ?? 'Chưa cập nhật' }}</p>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>

              </div>
            </div>
          </div>
        </div>
        <div class="container topic">
          <div class="row mb-5">
            <h5 class="my-4 bao-cao text-secondary">CHỦ ĐỀ 2</h5>
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
      </div>
      <Calendar/>
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
