<script>
import LopHoc from "@/services/class";
import Report from '@/services/report';
import FileBaoCao from '@/components/components/FileBaoCao.vue';
import Calendar from '@/components/components/Calendar.vue';

import { useAccountStore } from "@/stores/AccountStore";
export default {
  components: {
    FileBaoCao,
    Calendar
  },
  data() {
    const accStore = useAccountStore();
    return {
      studentClass: [],
      data: {
        classCurrent: {},
        CanBo: {},
        CongTy: {},
        ThongTin: {
          MSSV: accStore.user._id,
          NoiDung: {
            MayTinh: true,
            PhongLamViec: true,
          }
        }
      },
      registered: null,
      accStore,
      classCurrent: {},
      reportSinhVien: null,
      reports: null,
    };
  },
  methods: {
    async getData() {
      try {
        this.classCurrent = (await LopHoc.getAll()).filter(e => e._id == this.$route.params.id)[0]
        console.log(this.classCurrent);
        this.studentClass = await LopHoc.getStudentClass(this.$route.params.id);
        if (this.studentClass.length != 0) {
          this.data.classCurrent = this.studentClass.filter(e => e.SinhVien.MSSV == this.accStore.user._id)[0];
          if (this.data.classCurrent == undefined) {
            this.data.classCurrent = {}
          }
        }
        console.log(this.data.classCurrent);
        this.registered = await LopHoc.isRegistered(this.$route.params.id, this.accStore.user._id)
        if (this.data.classCurrent.SinhVien != null && this.data.classCurrent.SinhVien.MSGV != '') {
          this.reports = await Report.getAll(this.data.classCurrent.SinhVien.MSGV)
          this.reportSinhVien = this.reports.BaoCao.filter((e) => e.QuyenHienThi.includes(this.accStore.user.CapQuyen))
        }
      } catch (error) {
        console.log(error);
      }
    },
    async onSubmit() {
      this.data.classCurrent._id = this.$route.params.id;
      await LopHoc.RegisterClass(this.data);
      this.getData();
    },

  },
  created() {
    this.getData();
  },
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
                <router-link to="/" class="text-decoration-none text-black">Trang Ch???</router-link>
              </li>
              <li class="breadcrumb-item">{{ this.classCurrent.ChuyenNganh }}</li>
              <router-link to="/ChuyenNganh/CNTT" class="breadcrumb-item text-decoration-none text-black">
                C??c Kh??a Th???c T???p
              </router-link>
              <li class="breadcrumb-item active" aria-current="page">
                N???i dung h???c ph???n
              </li>
            </ol>
          </nav>
        </div>

        <div v-if="this.registered" class="container lop-hoc-phan">
          <div class="row mb-3" v-if="this.data.classCurrent._id != null">
            <h5 class="my-4 form text-secondary">TH??NG TIN L???P H???C PH???N</h5>
            <div class="row">
              <p class="col-md-4"><span><strong>L???p H???c Ph???n:</strong></span>{{ this.data.classCurrent.MaLopTT }} -
                {{ this.data.classCurrent.ChuyenNganh }}</p>
              <p class="col-md-6"><span><strong>H???c K?? - Ni??n Kh??a:</strong></span>{{ this.data.classCurrent.HocKi }}
                {{ this.data.classCurrent.NienKhoa }}</p>
            </div>
            <div v-if="this.data.classCurrent.GiangVien != null" class="row">
              <p class="col-md-4"><span><strong>Gi???ng Vi??n H?????ng
                    D???n:</strong></span>{{ this.data.classCurrent.GiangVien.length > 0 ?
                        this.data.classCurrent.GiangVien[0].HoTen : null
                    }}</p>
              <p class="col-md-3"><span><strong><i class="fa-solid fa-phone me-2"></i></strong></span>{{
                  this.data.classCurrent.GiangVien.length != 0 ? this.data.classCurrent.GiangVien[0].Sdt : null
              }}
              </p>
              <p class="col-md-4"><span><strong><i class="fa-regular fa-envelope"></i></strong></span>{{
                  this.data.classCurrent.GiangVien.length != 0 ? this.data.classCurrent.GiangVien[0].Email : null
              }}
              </p>
            </div>
            <div v-if="this.data.classCurrent.CanBo != null " class="row">
              <p class="col-md-4"><span><strong>C??n B??? H?????ng
                    D???n:</strong></span>{{this.data.classCurrent.CanBo.HoTen }}
              </p>
              <p class="col-md-3"><span><strong><i class="fa-solid fa-phone me-2"></i></strong></span>{{
                   this.data.classCurrent.CanBo.Sdt
              }}
              </p>
              <p class="col-md-4"><span><strong><i class="fa-regular fa-envelope"></i></strong></span>{{
                  this.data.classCurrent.CanBo.Email
              }}
              </p>
            </div>
          </div>
        </div>
        <div class="container content">
          <div class="row mb-3">
            <h5 class="my-4 form text-secondary">FORM ????NG K?? N???I DUNG TH???C T???P</h5>
            <div class="row ms-2">
              <p class="col-md-3">
                <i class="fa-solid fa-file-import me-2"></i>Vui l??ng nh???p form
                ????ng k??:
              </p>

              <a v-if="!this.registered" class="btn border rounded-0 col-md-2 mb-2" data-bs-toggle="modal"
                data-bs-target="#exampleModal">
                ????NG K??
              </a>
              <h6 class="text-danger col-md-2 mt-1" v-else>???? ????ng k??</h6>
            </div>
            <div class="modal fade hide" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div class="modal-dialog modal-dialog-scrollable modal-xs">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <form @submit.prevent="onSubmit" class="container ">
                      <div class="header text-center">
                        <h5>????NG K?? TH??NG TIN TH???C T???P</h5>
                      </div>
                      <div class="mb-3 mt-3">
                        <label for="cty" class="form-label">T??n c??ng ty (Ghi ch??nh x??c)*:</label>
                        <input type="text" class="form-control border rounded-0" id="cty"
                          v-model="this.data.CongTy.TenCongTy" />
                      </div>
                      <div class="mb-3 mt-3">
                        <label for="address" class="form-label">?????a ch??? c??ng ty (Ghi ch??nh x??c)*:</label>
                        <input type="text" class="form-control border rounded-0" id="address"
                          v-model="this.data.CongTy.DiaDiem" />
                      </div>
                      <div class="mb-3 mt-3">
                        <label for="sdt-cty" class="form-label">??i???n tho???i c???a c??ng ty*:</label>
                        <input type="text" class="form-control border rounded-0" id="sdt-cty"
                          v-model="this.data.CongTy.Sdt" />
                      </div>
                      <div class="mb-3 mt-3">
                        <label for="email-cty" class="form-label">Email c???a c??ng ty*:</label>
                        <input type="text" class="form-control border rounded-0" id="email-cty"
                          v-model="this.data.CongTy.Email" />
                      </div>
                      <div class="mb-3 mt-3">
                        <label for="cbhd" class="form-label">H??? t??n c??n b??? h?????ng d???n t???i c??ng ty*:</label>
                        <input type="text" class="form-control border rounded-0" id="cbhd"
                          v-model="this.data.CanBo.HoTen" />
                      </div>
                      <div class="mb-3 mt-3">
                        <label for="sdt-cbhd" class="form-label">S??? ??i???n tho???i c??n b??? h?????ng d???n t???i c??ng ty*:</label>
                        <input type="text" class="form-control border rounded-0" id="sdt-cbhd"
                          v-model="this.data.CanBo.Sdt" />
                      </div>
                      <div class="mb-3 mt-3">
                        <label for="email" class="form-label">Email c??n b??? h?????ng d???n t???i c??ng ty*:</label>
                        <input type="email" class="form-control border rounded-0" id="email"
                          v-model="this.data.CanBo.Email" />
                      </div>
                      <div class="mb-3 mt-3">
                        <label for="ndcv" class="form-label">N???i dung c??ng vi???c s??? l??m(bao g???m s??? bu???i l??m vi???c tr??n
                          tu???n, ghi ng???n g???n, n???i dung ch??nh)*:</label>
                        <input type="text" class="form-control border rounded-0" id="ndcv"
                          v-model="this.data.ThongTin.NoiDung.NoiDungCV" />
                      </div>
                      <fieldset class="row mb-3">
                        <div>
                          <legend class="col-form-label pt-0">
                            C??ng ty c?? m??y t??nh cho SV th???c t???p kh??ng?*
                          </legend>
                        </div>

                        <div class="row m-2">
                          <div class="form-check col-md-6">
                            <input class="form-check-input" type="radio" name="Laptop" id="yes" value=true
                              v-model="this.data.ThongTin.NoiDung.MayTinh" />
                            <label class="form-check-label" for="yes"> C?? </label>
                          </div>
                          <div class="form-check col-md-6">
                            <input class="form-check-input" type="radio" name="Laptop" id="no" value=false
                              v-model="this.data.ThongTin.NoiDung.MayTinh" />
                            <label class="form-check-label" for="no"> Kh??ng </label>
                          </div>
                        </div>
                      </fieldset>
                      <fieldset class="row mb-3">
                        <div>
                          <legend class="col-form-label pt-0">
                            C??ng ty c?? ph??ng l??m vi???c cho SV th???c t???p kh??ng?*
                          </legend>
                        </div>

                        <div class="row m-2">
                          <div class="form-check col-md-6">
                            <input class="form-check-input" type="radio" name="Room" id="yes" value=true
                              v-model="this.data.ThongTin.NoiDung.PhongLamViec" />
                            <label class="form-check-label" for="yes"> C?? </label>
                          </div>
                          <div class="form-check col-md-6">
                            <input class="form-check-input" type="radio" name="Room" id="no" value=false
                              v-model="this.data.ThongTin.NoiDung.PhongLamViec" />
                            <label class="form-check-label" for="no"> Kh??ng </label>
                          </div>
                        </div>
                      </fieldset>

                      <div class="mb-3 mt-3">
                        <label for="ho-tro" class="form-label">H??? tr??? kh??c c???a c??ng ty(n???u c??, v?? d???: h??? tr??? ti???n ??i
                          l???i,
                          ch??? ???, l????ng,...):</label>
                        <input type="text" class="form-control border rounded-0" id="ho-tro"
                          v-model="this.data.ThongTin.NoiDung.HoTro" />
                      </div>
                      <button type="submit" class="btn btn-success border rounded-0" data-bs-dismiss="modal">
                        G???i
                      </button>

                    </form>
                  </div>
                  <!-- <div class="modal-footer">
                    
                  </div> -->
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="container past" v-if="this.registered">
          <div class="row mb-2">
            <h5 class="my-4 bao-cao text-secondary">B??O C??O</h5>
          </div>
          <div v-for="(e, i) in this.reportSinhVien" class="row">
            <div v-if="e.TrangThai == 'true'" class="nop-bao-cao col-md-9 mb-5">
              <i class="fa-solid fa-file me-2"></i>
              <router-link :to='"/courses/" +this.data.classCurrent._id + "/" + this.data.classCurrent.SinhVien.MSGV + "/" + e.TenBaoCao'
                class="text-decoration-none">{{
                    e.TenBaoCao
                }}</router-link>

              <p>{{ e.MoTa }}</p>

            </div>
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


.btn {
  background-color: rgba(80, 116, 235, 0.814);
  color: aliceblue;
}

.btn:hover {
  background-color: rgba(80, 116, 235, 0.814);
  color: aliceblue;
}
</style>
