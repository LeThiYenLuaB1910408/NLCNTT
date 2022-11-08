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
      this.students = this.students.filter(e => e.SinhVien.MSCB == this.accStore.user._id)
    },
    async onChangeLecturer(data) {
      await LopHoc.update(data)
      this.getAll();
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
      <div class="col-md-9 px-5">
        <div class="container my-3">
          <nav
            style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E&#34;);"
            aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/canbo" class="text-decoration-none text-black">Trang Chủ</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/canbo" class="text-decoration-none text-black">Danh sách sinh viên thực tập
                </router-link>
              </li>

              <li class="breadcrumb-item active" aria-current="page">
                {{ this.$route.params.id }}
              </li>
            </ol>
          </nav>
        </div>




        <div class="container topic">
          <div class="row mb-5">
            <h5 class="my-4 bao-cao text-secondary">CÔNG VIỆC THỰC HIỆN</h5>
            <p class="text-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <i class="fa-solid fa-file me-2 text-dark"></i>Thêm file giao việc
            </p>
            <div class="modal fade hide" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div class="container py-4 ms-0">
                      <div class="header text-center">
                        <h5>THÔNG TIN GIAO VIỆC</h5>
                      </div>
                      <div class="mb-3 mt-3">
                        <label for="lh" class="form-label">Mô tả công việc:</label>
                        <input type="text" class="form-control border rounded-0" id="lh" placeholder="" name="lh" />
                      </div>
                      <div class="mb-3 mt-3">
                        <label for="lh" class="form-label">File giao việc chi tiết:</label>
                        <input type="file" class="form-control border rounded-0" />
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Xác nhận</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container past">
          <div class="row mb-5">
            <h5 class="my-4 bao-cao text-secondary">PHIẾU ĐÁNH GIÁ CUỐI CÙNG</h5>
            <div class="row">
              <div class="nop-bao-cao col-md-9">
                <i class="fa-solid fa-file me-2"></i>
                <a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#fileBaoCao">Gửi file
                  đánh giá cuối cùng</a>
                <div class="modal fade hide" id="fileBaoCao" tabindex="-1" aria-labelledby="exampleModalLabel"
                  aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <div class="container py-4 ms-0">
                          <div class="header text-center">
                            <h5>FILE ĐÁNH GIÁ</h5>
                          </div>
                          <div class="mb-3 mt-3">
                            <label for="lh" class="form-label">Mô tả công việc:</label>
                            <input type="text" class="form-control border rounded-0" id="lh" placeholder="" name="lh" />
                          </div>
                          <div class="mb-3 mt-3">
                            <label for="lh" class="form-label">File giao việc chi tiết:</label>
                            <input type="file" class="form-control border rounded-0" />
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Xác nhận</button>
                      </div>
                    </div>
                  </div>
                </div>
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
