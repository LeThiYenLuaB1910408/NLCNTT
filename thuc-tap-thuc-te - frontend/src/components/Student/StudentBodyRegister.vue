<script>
import LopHoc from "@/services/class";
import { useAccountStore } from "@/stores/AccountStore";
export default {
  data() {
    const accStore = useAccountStore();
    console.log(accStore);
    return {
      date: new Date(),
      classes:[],
      data: {
        classCurrent: {},
        CanBo: {
          HoTen: null,
          Sdt: null,
          Email: null
        },
        CongTy:{
          TenCongTy: null,
          DiaDiem: null,
          Sdt: null,
          Email: null
        },
        ThongTin:{
          MSSV: accStore.user._id,
          MaLopTT: this.$route.params.id,
          NoiDung: {
            NoiDungCV: "",
            MayTinh: true,
            PhongLamViec: true,
            HoTro: ""
          }
        }
      },
      registered:null,
      accStore
    };
  },
  methods: {
    async retrieveClasses() {
      try {
        console.log(this.accStore.user);
        this.classes = await LopHoc.getClass(this.$route.params.id);
        this.data.classCurrent = this.classes.filter(e=>e.SinhVien.MSSV==this.accStore.user._id)[0];
        console.log(this.data.classCurrent);
      this.registered = await LopHoc.isRegistered(this.accStore.user._id)
      } catch (error) {
        console.log(error);
      }
    },
    async onSubmit(data){
      await LopHoc.RegisterClass(data);
      this.registered = await LopHoc.isRegistered(this.accStore.user._id)
      
    },

    refreshList() {
      this.retrieveClasses();
    },
  },
  created() {
    this.refreshList();
  },
};
</script>

<template>
  <div class="container-fluid border-bottom border-dark pb-5">
    <div class="row">
      <div class="col-md-9 px-5">
        <div class="container my-3">
            <nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-decoration-none text-black"
                  >Trang Chủ</router-link
                >
              </li>
              <li class="breadcrumb-item">{{ this.data.classCurrent.ChuyenNganh }}</li>
              <router-link
                to="/ChuyenNganh/CNTT"
                class="breadcrumb-item text-decoration-none text-black"
              >
                Các Khóa Thực Tập
              </router-link>
              <li class="breadcrumb-item active" aria-current="page">
                Nội dung học phần
              </li>
            </ol>
          </nav>
        </div>

        <div class="container lop-hoc-phan">
          <div class="row mb-3">
            <h5 class="my-4 form text-secondary">THÔNG TIN LỚP HỌC PHẦN</h5>
            <div class="row">
              <p class="col-md-4"><span><strong>Lớp Học Phần:</strong></span>{{this.data.classCurrent.MaLopTT}} - {{this.data.classCurrent.ChuyenNganh}}</p>
              <p class="col-md-6"><span><strong>Học Kì - Niên Khóa:</strong></span>{{this.data.classCurrent.HocKi}} {{this.data.classCurrent.NienKhoa}}</p>
            </div>
            <div class="row">
              <p class="col-md-4"><span><strong>Giảng Viên Hướng Dẫn:</strong></span>{{this.data.classCurrent!={}?this.data.classCurrent.GiangVien.HoTen:null}}</p>
              <p class="col-md-4"><span><strong><i class="fa-solid fa-phone me-2"></i></strong></span>{{this.data.classCurrent!={}?this.data.classCurrent.GiangVien.Sdt:null}}</p>
            </div>
            <div class="row">
              <p class="col-md-4"><span><strong>Cán Bộ Hướng Dẫn:</strong></span>{{this.data.classCurrent!={}?this.data.classCurrent.CanBo.HoTen:null}}</p>
              <p class="col-md-3"><span><strong><i class="fa-solid fa-phone me-2"></i></strong></span>{{this.data.classCurrent!={}?this.data.classCurrent.CanBo.Sdt:null}}</p>
              <p class="col-md-4"><span><strong><i class="fa-regular fa-envelope"></i></strong></span>{{this.data.classCurrent!={}?this.data.classCurrent.CanBo.Email:null}}</p>
            </div>
          </div>
        </div>
        <div class="container content">
          <div class="row mb-3">
            <h5 class="my-4 form text-secondary">FORM ĐĂNG KÝ NỘI DUNG THỰC TẬP</h5>
            <div class="row ms-2">
              <p class="col-md-3">
                <i class="fa-solid fa-file-import me-2"></i>Vui lòng nhập form
                đăng ký:
              </p>

              <a
              v-if="!this.registered"
                class="btn border rounded-0 col-md-2 mb-2"
                data-bs-toggle="collapse"
                href="#collapseExample"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                ĐĂNG KÝ
              </a>
              <h6 class="text-danger col-md-2 mt-1" v-else>Đã đăng ký</h6>
            </div>

            <div v-if="!this.registered" class="collapse" id="collapseExample">
              <form @submit.prevent="onSubmit(this.data)" class="container w-50 border border-dark py-4">
                <div class="header text-center">
                  <h5>ĐĂNG KÝ THÔNG TIN THỰC TẬP</h5>
                </div>
                <div class="mb-3 mt-3">
                  <label for="cty" class="form-label"
                    >Tên công ty (Ghi chính xác)*:</label
                  >
                  <input
                    type="text"
                    class="form-control border rounded-0"
                    id="cty"
                    v-model="this.data.CongTy.TenCongTy"
                  />
                </div>
                <div class="mb-3 mt-3">
                  <label for="address" class="form-label"
                    >Địa chỉ công ty (Ghi chính xác)*:</label
                  >
                  <input
                    type="text"
                    class="form-control border rounded-0"
                    id="address"
                    v-model="this.data.CongTy.DiaDiem"
                  />
                </div>
                <div class="mb-3 mt-3">
                  <label for="sdt-cty" class="form-label"
                    >Điện thoại của công ty*:</label
                  >
                  <input
                    type="text"
                    class="form-control border rounded-0"
                    id="sdt-cty"
                    v-model="this.data.CongTy.Sdt"
                  />
                </div>
                <div class="mb-3 mt-3">
                  <label for="email-cty" class="form-label"
                    >Email của công ty*:</label
                  >
                  <input
                    type="text"
                    class="form-control border rounded-0"
                    id="email-cty"
                    v-model="this.data.CongTy.Email"
                  />
                </div>
                <div class="mb-3 mt-3">
                  <label for="cbhd" class="form-label"
                    >Họ tên cán bộ hướng dẫn tại công ty*:</label
                  >
                  <input
                    type="text"
                    class="form-control border rounded-0"
                    id="cbhd"
                    v-model="this.data.CanBo.HoTen"
                  />
                </div>
                <div class="mb-3 mt-3">
                  <label for="sdt-cbhd" class="form-label"
                    >Số điện thoại cán bộ hướng dẫn tại công ty*:</label
                  >
                  <input
                    type="text"
                    class="form-control border rounded-0"
                    id="sdt-cbhd"
                    v-model="this.data.CanBo.Sdt"
                  />
                </div>
                <div class="mb-3 mt-3">
                  <label for="email" class="form-label"
                    >Email cán bộ hướng dẫn tại công ty*:</label
                  >
                  <input
                    type="email"
                    class="form-control border rounded-0"
                    id="email"
                    v-model="this.data.CanBo.Email"
                  />
                </div>
                <div class="mb-3 mt-3">
                  <label for="ndcv" class="form-label"
                    >Nội dung công việc sẽ làm(bao gồm số buổi làm việc trên
                    tuần, ghi ngắn gọn, nội dung chính)*:</label
                  >
                  <input
                    type="text"
                    class="form-control border rounded-0"
                    id="ndcv"
                    v-model="this.data.ThongTin.NoiDung.NoiDungCV"
                  />
                </div>
                <fieldset class="row mb-3">
                  <div>
                    <legend class="col-form-label pt-0">
                      Công ty có máy tính cho SV thực tập không?*
                    </legend>
                  </div>

                  <div class="row m-2">
                    <div class="form-check col-md-6">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="Laptop"
                        id="yes"
                        value=true
                        v-model="this.data.ThongTin.NoiDung.MayTinh"
                      />
                      <label class="form-check-label" for="yes"> Có </label>
                    </div>
                    <div class="form-check col-md-6">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="Laptop"
                        id="no"
                        value=false
                        v-model="this.data.ThongTin.NoiDung.MayTinh"
                      />
                      <label class="form-check-label" for="no"> Không </label>
                    </div>
                  </div>
                </fieldset>
                <fieldset class="row mb-3">
                  <div>
                    <legend class="col-form-label pt-0">
                      Công ty có phòng làm việc cho SV thực tập không?*
                    </legend>
                  </div>

                  <div class="row m-2">
                    <div class="form-check col-md-6">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="Room"
                        id="yes"
                        value=true
                        v-model="this.data.ThongTin.NoiDung.PhongLamViec"
                      />
                      <label class="form-check-label" for="yes"> Có </label>
                    </div>
                    <div class="form-check col-md-6">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="Room"
                        id="no"
                        value=false
                        v-model="this.data.ThongTin.NoiDung.PhongLamViec"
                      />
                      <label class="form-check-label" for="no"> Không </label>
                    </div>
                  </div>
                </fieldset>

                <div class="mb-3 mt-3">
                  <label for="ho-tro" class="form-label"
                    >Hỗ trợ khác của công ty(nếu có, ví dụ: hỗ trợ tiền đi lại,
                    chỗ ở, lương,...):</label
                  >
                  <input
                    type="text"
                    class="form-control border rounded-0"
                    id="ho-tro"
                    v-model="this.data.ThongTin.NoiDung.HoTro"
                  />
                </div>

                <button type="submit" class="btn btn-success border rounded-0">
                  Gửi
                </button>
              </form>
            </div>
          </div>
        </div>
        <div class="container past">
          <div class="row mb-2">
            <h5 class="my-4 bao-cao text-secondary">BÁO CÁO</h5>
          </div>
          <div class="row ms-2">
              <div class="nop-bao-cao col-md-9">
                <i class="fa-solid fa-file me-2"></i>
                <a href="#" class="text-decoration-none">File đánh giá tổng kết</a>
                <p>Lớp học phần {{ this.data.classCurrent.MaLopTT }} - {{ this.data.classCurrent.ChuyenNganh }}</p>
              </div>
            </div>
          <div class="row ms-2">
              <div class="nop-bao-cao col-md-9">
                <i class="fa-solid fa-file me-2"></i>
                <a href="#" class="text-decoration-none">Nộp file báo cáo TTTT - {{ this.data.classCurrent.ChuyenNganh }}</a>
                <p>Lớp học phần {{ this.data.classCurrent.MaLopTT }} - {{ this.data.classCurrent.ChuyenNganh }}</p>
              </div>
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
.btn{
    background-color: rgba(80, 116, 235, 0.814);
    color: aliceblue;
}
.btn:hover{
    background-color: rgba(80, 116, 235, 0.814);
    color: aliceblue;
}
</style>
