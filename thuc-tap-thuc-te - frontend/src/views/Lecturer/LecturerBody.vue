<script>
import LopHoc from '@/services/class';
import Report from '@/services/report';
import { useAccountStore } from "@/stores/AccountStore";
import FileBaoCao from '@/components/components/FileBaoCao.vue';
export default {
  components: {
    FileBaoCao
  },
  data() {
    const accStore = useAccountStore();
    return {
      accStore,
      students: [],
      selected: null,
      selectedReport: null,
      reports: null,
      infor: null,
      dataCreateReport: null,
      edit: false
    }; 
  },
  methods: {
    async getAll() {
      this.students = (await LopHoc.getAllStudent()).filter(e => e.SinhVien.MSGV == this.accStore.user._id);
      console.log(this.students);
      if (this.students.length != 0) {
        this.reports = await Report.getAll(this.accStore.user._id)
      }
      
      console.log(this.infor);
    },
    async onSetScoreReport(data) {
      await Report.update(this.accStore.user._id, data)
      this.getAll();
      this.selectedReport.Diem = data.DiemSo;
    },
    async onSetScoreStudent(data) {
      await LopHoc.update(data)
      this.getAll();
      this.selected.SinhVien.DiemSo = data.DiemSo;
    },
    async handleAddReport() {
      const data = {
        MSGV: this.accStore.user._id,
        BaoCao: this.dataCreateReport
      }
      await Report.create(this.accStore.user._id, data)
      this.reports = await Report.getAll(this.accStore.user._id)
      this.dataCreateReport = {
        MaLopTT: null,
        BaoCao: {
          QuyenHienThi: []
        }
      }
    },
    async handleUpdateReport() {
      await Report.update(this.accStore.user._id, this.dataCreateReport)
      this.reports = await Report.getAll(this.accStore.user._id)
      this.dataCreateReport = {
        MaLopTT: null,
        BaoCao: {
          QuyenHienThi: []
        }
      }
      this.edit = false
    },
    async selectSV(student){
      console.log(student);
      this.selected = student;
      this.selected.infor = await LopHoc.getInfor(student.SinhVien.MSSV)
      console.log(this.selected.infor);
    }

  },
  created() {
    this.getAll();
  }
};
</script>

<template>

  <div class="col-md-9 px-5">
    <div class="container my-3">
      <nav
        style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E&#34;);"
        aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/" class="text-decoration-none text-black">Trang Ch???</router-link>
          </li>
          <li class="breadcrumb-item"><a>Khoa {{ this.accStore.user.BoMon }}</a></li>
          <router-link to="/CNTT" class="breadcrumb-item text-decoration-none text-black">
            C??c Kh??a Th???c T???p
          </router-link>
          <li class="breadcrumb-item active" aria-current="page">
            N???i dung h???c ph???n
          </li>
        </ol>
      </nav>
    </div>

    <div class="container content">
      <div class="row mb-5">
        <h5 class="my-4 form text-secondary">DANH S??CH SINH VI??N</h5>
        <p>
          <i class="fa-solid fa-clipboard-list me-2"></i>
          <a class="" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false"
            aria-controls="collapseExample">
            Danh s??ch sinh vi??n
          </a>
        </p>
        <div class="collapse" id="collapseExample">
          <div class="card card-body border border-dark rounded-0">
            <table class="table">
              <thead align="center">
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">MSSV</th>
                  <th scope="col">H??? v?? T??n</th>
                  <th scope="col">M?? l???p</th>
                  <th scope="col">Chuy??n Ng??nh</th>
                  <th scope="col">T??n C??ng Ty</th>
                  <th scope="col">Thao t??c</th>
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
                    <i class="fa-solid fa-circle-info fs-5 mt-1 text-secondary" @click="selectSV(student)" style="cursor: pointer"
                      data-bs-toggle="modal" data-bs-target="#infoStudent" ></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal fade hide " id="infoStudent" tabindex="-1" aria-labelledby="infoStudent" aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div v-if="this.selected" class="modal-body">
                <h5 class="text-center mb-4">TH??NG TIN SINH VI??N</h5>
                <div class="row">
                  <div class="col-3">
                    <p><strong>MSSV:</strong> {{ this.selected.SinhVienLop._id }}</p>
                  </div>
                  <div class="col-4">
                    <p><strong>H??? T??n:</strong> {{ this.selected.SinhVienLop.HoTen }}</p>
                  </div>
                  <div class="col-5">
                    <p><strong>S??? ??i???n Tho???i:</strong> {{ this.selected.SinhVienLop.Sdt }}</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-3">
                    <p><strong>M?? L???p:</strong> {{ this.selected.SinhVienLop.MaLop }}</p>
                  </div>
                  <div class="col-4">
                    <p><strong>Chuy??n Ng??nh:</strong> {{ this.selected.SinhVienLop.ChuyenNganh }}</p>
                  </div>
                  <div class="col-5">
                    <p><strong>H???c K???-Ni??n Kh??a:</strong> {{ this.selected.HocKi }} {{ this.selected.NienKhoa }}</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-3">
                    <p><strong>C??ng Ty:</strong> {{ this.selected.CanBo.TenCongTy }}</p>
                  </div>
                  <div class="col-6">
                    <p><strong>C??n B??? C??ng Ty:</strong> {{ this.selected.CanBo.HoTen }}</p>
                  </div>
                </div>
                <div class="row">
                  <p><strong>N???i Dung Th???c T???p:</strong></p>
                </div>
                <div class="row ms-5" v-if=" this.selected.infor.NoiDung!=null">
                  <ol>
                    <li>
                      <p><strong>Th???i gian l??m vi???c:</strong> {{ this.selected.infor.NoiDung.NoiDungCV }}</p>
                    </li>
                    <li>
                      <p><strong>H??? tr??? m??y t??nh:</strong> {{ this.selected.infor.NoiDung.MayTinh==true ? 'C??' : 'Kh??ng' }}</p>
                    </li>
                    <li>
                      <p><strong>H??? tr??? ph??ng l??m vi???c:</strong> {{ this.selected.infor.NoiDung.PhongLamViec==true ? 'C??' : 'Kh??ng' }}</p>
                    </li>
                  </ol>

                </div>
                <div class="row mb-3">
                  <div class="d-flex align-items-center">
                    <div class="col-md-5">
                      <strong class="me-2">Ch???m ??i???m:</strong>
                      <input v-if="this.selected.SinhVien.DiemSo == null" type="text" v-model="this.selected.Diem" />
                      <span class="m-0 text-danger fw-bold" v-else> {{ this.selected.SinhVien.DiemSo }}</span>
                    </div>

                    <div class="d-flex">
                      <i @click="onSetScoreStudent({ _id: this.selected._id, MSSV: this.selected.SinhVienLop._id, DiemSo: this.selected.Diem })"
                        class="fa-regular fa-floppy-disk fs-4 mt-1 text-secondary" style="cursor: pointer"></i>
                      <i @click="this.selected.SinhVien.DiemSo = null"
                        class="fa-regular fa-pen-to-square fs-5 mt-1 text-secondary ms-2" style="cursor: pointer"></i>
                    </div>
                  </div>
                </div>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">????ng</button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container past">
      <div class="row mb-5">
        <h5 class="my-4 bao-cao text-secondary">B??O C??O</h5>
        <div v-if="this.reports != null" v-for="(e, i) in this.reports.BaoCao" class="row" :key="i">
          <div class="nop-bao-cao col-md-9">
            <i class="fa-solid fa-file me-2"></i>
            <a class="text-decoration-none text-primary" style="cursor:pointer" @click="this.selectedReport = e"
              data-bs-toggle="modal" data-bs-target="#infoReport">{{
                  e.TenBaoCao
              }}</a>
            <p>{{ e.MoTa }}</p>
          </div>
          <div class="check col-md-3">
            <button type="button" class="border-0 " data-bs-toggle="modal" data-bs-target="#addReport"
              @click="this.dataCreateReport = e; this.edit = true">
              <i class="fa-solid fa-pen-to-square fs-5 me-1"></i>Edit
            </button>
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <div><i class="fa-solid fa-circle-plus me-2 fs-5"></i></div>
          <div class="" style="cursor: pointer" data-bs-toggle="modal" data-bs-target="#addReport"
            @click="this.dataCreateReport = { QuyenHienThi: [] }">Th??m ho???t ?????ng
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade hide " id="infoReport" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div v-if="this.selectedReport != null" class="modal-body">
            <div class="container py-4 ms-0">
              <div class="header text-center">
                <h5>TH??NG TIN HO???T ?????NG</h5>
              </div>
              <table class="table">
                <thead align="center">
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">MSSV</th>
                    <th scope="col">File</th>
                    <th v-if="this.selectedReport.QuyenHienThi.length == 1 && this.selectedReport.QuyenHienThi[0] == '0'" scope="col">??i???m s???</th>
                    <th v-if="this.selectedReport.QuyenHienThi.length == 1 && this.selectedReport.QuyenHienThi[0] == '0'" scope="col">Thao t??c</th>
                  </tr>
                </thead>
                <tbody align="center">
                  <tr v-if="this.selectedReport != null" v-for="(e, i) in this.selectedReport.BaiNop">
                    <th scope="row">{{ i + 1 }}</th>
                    <td>{{ e.MSSV }}</td>
                    <td>
                      <FileBaoCao :fileName="e.File" />
                    </td>
                    <td v-if="this.selectedReport.QuyenHienThi.length == 1 && this.selectedReport.QuyenHienThi[0] == '0'">
                      <input v-if="e.DiemSo == null" type="text" v-model="this.selectedReport.Diem" />
                      <span class="m-0" v-else> {{ e.DiemSo }}</span>
                    </td>
                    <td v-if="this.selectedReport.QuyenHienThi.length == 1 && this.selectedReport.QuyenHienThi[0] == '0'" class="text-center">
                      <i @click="onSetScoreReport({ TenBaoCao: this.selectedReport.TenBaoCao, DiemSo: this.selectedReport.Diem, MSSV: e.MSSV })"
                        class="fa-regular fa-floppy-disk fs-4 mt-1 text-secondary" style="cursor: pointer"></i>
                      <i @click="e.DiemSo = null" class="fa-regular fa-pen-to-square fs-5 mt-1 text-secondary ms-2"
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
    <div class="modal fade hide " id="addReport" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" v-if="this.dataCreateReport != null">
            <div class="container py-4 ms-0">
              <div class="header text-center">
                <h5 v-if="this.edit">CH???NH S???A TH??NG TIN</h5>
                <h5 v-else>TH??NG TIN HO???T ?????NG</h5>
              </div>
              <div class="mb-3 mt-3">
                <label for="lh" class="form-label">T??n Ho???t ?????ng:</label>
                <input type="text" class="form-control border rounded-0" id="lh" placeholder="" name="lh"
                  v-model="this.dataCreateReport.TenBaoCao" />
              </div>
              <div class="mb-3 mt-3">
                <div class="form-floating">
                  <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
                    style="height: 100px" v-model="this.dataCreateReport.MoTa"></textarea>
                  <label for="floatingTextarea2">M?? T???</label>
                </div>
              </div>
              <div class="row">
                <div class="mb-3 mt-3 col-md-4">
                  <label for="lh" class="form-label">Ng??y H???t H???n:</label>
                <input type="datetime-local" class="form-control border rounded-0" id="lh" placeholder="" name="lh"
                  v-model="this.dataCreateReport.HanNop" />
               
              </div>
                <div class="mb-3 mt-3 col-md-4">
                  <label for="lh" class="form-label">Tr???ng Th??i Hi???n Th???:</label>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                      value=true v-model="this.dataCreateReport.TrangThai">
                    <label class="form-check-label" for="flexRadioDefault1">
                      Hi???n
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                      value=false v-model="this.dataCreateReport.TrangThai">
                    <label class="form-check-label" for="flexRadioDefault2">
                      ???n
                    </label>
                  </div>
                </div>
                <div class="mb-3 mt-3 col-md-4">
                  <label for="lh" class="form-label">Hi???n Th??? V???i:</label>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="0" id="flexCheckDefault"
                      v-model="this.dataCreateReport.QuyenHienThi">
                    <label class="form-check-label" for="flexCheckDefault">
                      Sinh Vi??n
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="3" id="flexCheckChecked"
                      v-model="this.dataCreateReport.QuyenHienThi">
                    <label class="form-check-label" for="flexCheckChecked">
                      C??n B???
                    </label>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div class="modal-footer">
            <button v-if="this.edit" type="button" class="btn btn-primary" data-bs-dismiss="modal"
              @click="handleUpdateReport">C???p Nh???t</button>
            <button v-else type="button" class="btn btn-primary" data-bs-dismiss="modal"
              @click="handleAddReport">Th??m</button>

          </div>
        </div>
      </div>
    </div>
    <div class="container topic">
      <div class="row mb-5">
        <h5 class="my-4 bao-cao text-secondary">CH??? ????? 3</h5>
      </div>
    </div>
    <div class="container topic">
      <div class="row mb-5">
        <h5 class="my-4 bao-cao text-secondary">CH??? ????? 4</h5>
      </div>
    </div>
    <div class="container topic">
      <div class="row mb-5">
        <h5 class="my-4 bao-cao text-secondary">CH??? ????? 5</h5>
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

th,
span,
td {
  padding: 5px;
}

th span {
  font-size: 15px;
}
</style>
