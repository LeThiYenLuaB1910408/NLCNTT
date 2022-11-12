<script>
import LopHoc from '@/services/class';
import Report from '@/services/report';
import Calendar from '../Home/Calendar.vue';
import { useAccountStore } from "@/stores/AccountStore";
export default {
  components: {
    Calendar
  },
  data() {
    const accStore = useAccountStore();
    return {
      accStore,
      students: [],
      selected: null,
      selectedReport: null,
      reports: null,
      dataCreateReport: {
        MaLopTT: null,
        BaoCao: {
          QuyenHienThi: []
        }
      }
    };
  },
  methods: {

    async getAll() {
      this.students = await LopHoc.getAllStudent();
      if (this.students.length != 0) {
        this.reports = await Report.getAll(this.students[0]._id)
      }
      this.students = this.students.filter(e => e.SinhVien.MSGV == this.accStore.user._id)
    },
    async onSetScore(data) {
      await Report.update(data.MaLopTT,data)
      this.getAll();
      this.selectedReport.Diem = data.DiemSo;
    },

    async handleAddReport() {
      this.dataCreateReport.MaLopTT = this.students[0]._id;
      await Report.create(this.students[0]._id, this.dataCreateReport)
      this.reports = await Report.getAll(this.students[0]._id)
      this.dataCreateReport = {
        MaLopTT: null,
        BaoCao: {
          QuyenHienThi: []
        }
      }
    }
  },
  created() {
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
                      <td class="text-center">
                        <i class="fa-solid fa-circle-info fs-5 mt-1 text-secondary" style="cursor: pointer"
                          data-bs-toggle="modal" data-bs-target="#exampleModal" @click="this.selected = student"></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
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


                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container past">
          <div class="row mb-5">
            <h5 class="my-4 bao-cao text-secondary">BÁO CÁO</h5>
            <div v-if="this.reports != null" v-for="(e) in this.reports.BaoCao" class="row">
              <div class="nop-bao-cao col-md-9">
                <i class="fa-solid fa-file me-2"></i>
                <a class="text-decoration-none text-primary" style="cursor:pointer"
                  @click="this.selectedReport = e" data-bs-toggle="modal" data-bs-target="#infoReport">{{
                      e.TenBaoCao
                  }}</a>
                <p>{{ e.MoTa }}</p>
              </div>
              <div class="check col-md-3">
                <i class="fa-solid fa-pen-to-square fs-5 me-1"></i>Edit
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <div><i class="fa-solid fa-circle-plus me-2 fs-5"></i></div>
              <div class="" style="cursor: pointer" data-bs-toggle="modal" data-bs-target="#addReport">Thêm hoạt động
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade hide " id="infoReport" tabindex="-1" aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="container py-4 ms-0">
                  <div class="header text-center">
                    <h5>THÔNG TIN HOẠT ĐỘNG</h5>
                  </div>
                  <table class="table">
                    <thead align="center">
                      <tr>
                        <th scope="col">STT</th>
                        <th scope="col">MSSV</th>
                        <th scope="col">File</th>
                        <th scope="col">Điểm số</th>
                        <th scope="col">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody align="center">
                      <tr v-if="this.selectedReport!=null" v-for="(e, i) in this.selectedReport.BaiNop">
                        <th scope="row">{{ i + 1 }}</th>
                        <td>{{ e.MSSV }}</td>
                        <td>
                          <i v-if="e.File.slice(e.File.lastIndexOf('.') + 1) == 'pdf'"
                            class="fa-regular text-danger fa-file-pdf"></i>
                          <i v-else-if="e.File.slice(e.File.lastIndexOf('.') + 1) == 'docx'"
                            class="fa-regular text-primary fa-file-word"></i>
                          <i v-else-if="e.File.slice(e.File.lastIndexOf('.') + 1) == 'xlsx'"
                            class="fa-regular text-success fa-file-excel"></i>
                          <i v-else-if="e.File.slice(e.File.lastIndexOf('.') + 1) == 'jpg'"
                            class="fa-regular text-success fa-file-image"></i>
                          <i v-else-if="e.File.slice(e.File.lastIndexOf('.') + 1) == 'pptx'"
                            class="fa-regular fa-file-powerpoint" style="color:orange"></i>
                          <i v-else class="fa-regular  fa-file-lines"></i>
                          <a href="#" class="ms-2">
                            {{ e.File.slice(e.File.lastIndexOf("/") + 1) }}
                          </a>
                        </td>
                        <td>
                              <input v-if="e.DiemSo == null" type="text"
                                v-model="this.selectedReport.Diem" />
                              <span class="m-0" v-else> {{ e.DiemSo }}</span>


                        </td>
                        <td class="text-center">
                            <i @click="onSetScore({ MaLopTT: this.students[0]._id, TenBaoCao: this.selectedReport.TenBaoCao, DiemSo: this.selectedReport.Diem, MSSV: e.MSSV })"
                              class="fa-regular fa-floppy-disk fs-4 mt-1 text-secondary" style="cursor: pointer"></i>
                            <i @click="e.DiemSo = null"
                              class="fa-regular fa-pen-to-square fs-5 mt-1 text-secondary ms-2"
                              style="cursor: pointer"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>


                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="modal fade hide " id="addReport" tabindex="-1" aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="container py-4 ms-0">
                  <div class="header text-center">
                    <h5>THÔNG TIN HOẠT ĐỘNG</h5>
                  </div>
                  <div class="mb-3 mt-3">
                    <label for="lh" class="form-label">Tên Hoạt Động:</label>
                    <input type="text" class="form-control border rounded-0" id="lh" placeholder="" name="lh"
                      v-model="this.dataCreateReport.BaoCao.TenBaoCao" />
                  </div>
                  <div class="mb-3 mt-3">
                    <div class="form-floating">
                      <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
                        style="height: 100px" v-model="this.dataCreateReport.BaoCao.MoTa"></textarea>
                      <label for="floatingTextarea2">Mô Tả</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="mb-3 mt-3 col-md-6">
                      <label for="lh" class="form-label">Trạng Thái Hiển Thị:</label>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                          value=true v-model="this.dataCreateReport.BaoCao.TrangThai">
                        <label class="form-check-label" for="flexRadioDefault1">
                          Hiện
                        </label>
                      </div>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                          value=false v-model="this.dataCreateReport.BaoCao.TrangThai">
                        <label class="form-check-label" for="flexRadioDefault2">
                          Ẩn
                        </label>
                      </div>
                    </div>
                    <div class="mb-3 mt-3 col-md-6">
                      <label for="lh" class="form-label">Hiển Thị Với:</label>
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="0" id="flexCheckDefault"
                          v-model="this.dataCreateReport.BaoCao.QuyenHienThi">
                        <label class="form-check-label" for="flexCheckDefault">
                          Sinh Viên
                        </label>
                      </div>
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="3" id="flexCheckChecked"
                          v-model="this.dataCreateReport.BaoCao.QuyenHienThi">
                        <label class="form-check-label" for="flexCheckChecked">
                          Cán Bộ
                        </label>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                  @click="handleAddReport">Thêm</button>

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
      <Calendar />
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
