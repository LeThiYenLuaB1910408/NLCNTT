<script>
import Report from '@/services/report';
import { useAccountStore } from "@/stores/AccountStore";
import FileBaoCao from '@/components/components/FileBaoCao.vue';

export default {
  components: {
    FileBaoCao,
  },
  data() {
    const accStore = useAccountStore(); 

    return {
      accStore,
      reportCanBo: null,
      reports: null,
      selected: null,
      selectedFile: null
    };
  },
  methods: {
    async getAll() {
      this.reports = await Report.getAll(this.$route.params.MSGV)
      this.reportCanBo = this.reports.BaoCao.filter((e) => e.QuyenHienThi.includes(this.accStore.user.CapQuyen))
    },
    onChangeFile(e) {
      const selectedFile = e.target.files[0];
      this.selectedFile = selectedFile;
    },
    async submitFile() {
      const formData = new FormData();
      formData.append("file", this.selectedFile);
      formData.append("TenBaoCao", this.selected.TenBaoCao);
      formData.append("MSSV", this.$route.params.MSSV);
      await Report.submitFile(this.$route.params.MSGV, formData)
      this.getAll();
    },
    async deleteFile() {
      const data = {
        TenBaoCao: this.selected.TenBaoCao,
        MSSV: this.$route.params.MSSV,
        File: this.selected.BaiNop.filter(e => e.MSSV == this.$route.params.MSSV)[0].File
      }
      await Report.deleteFile(this.$route.params.MSGV, data)
      this.getAll();
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
            <router-link to="/canbo" class="text-decoration-none text-black">Trang Chủ</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/canbo" class="text-decoration-none text-black">Danh sách sinh viên thực tập
            </router-link>
          </li>

          <li class="breadcrumb-item active" aria-current="page">
            {{ this.$route.params.MSSV }}
          </li>
        </ol>
      </nav>
    </div>




    <div class="container topic">
      <div class="row mb-5">
        <h5 class="my-4 bao-cao text-secondary">CÔNG VIỆC THỰC HIỆN</h5>
        <div v-for="(e, i) in this.reportCanBo" class="row">
          <div v-if="e.TrangThai == 'true'" class="nop-bao-cao col-md-9 mb-5">
            <i class="fa-solid fa-file me-2"></i>
            <!-- <router-link to="/submit" class="text-decoration-none">{{ e.TenBaoCao }}</router-link> -->
            <a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#exampleModal"
              @click="this.selected = e">{{ e.TenBaoCao }}</a>
            <p>{{ e.MoTa }}</p>
            <div class="ms-4" v-for="(e, i) in e.BaiNop.filter(e => e.MSSV == this.$route.params.MSSV)">
              <FileBaoCao :fileName="e.File" />
            </div>
          </div>
        </div>
        <div class="modal fade hide" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" v-if="this.selected != null">
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
                    <input type="text" class="form-control border rounded-0" v-model="this.selected.MoTa" />
                  </div>
                  <div class="mb-3 mt-3">
                    <label for="lh" class="form-label">File giao việc chi tiết:</label><br />
                    <FileBaoCao v-if="this.selected.BaiNop.filter(e => e.MSSV == this.$route.params.MSSV).length > 0"
                      :fileName="this.selected.BaiNop.filter(e => e.MSSV == this.$route.params.MSSV)[0].File" />
                    <input v-else type="file" class="form-control border rounded-0" @change="onChangeFile" />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button v-if="this.selected.BaiNop.filter(e => e.MSSV == this.$route.params.MSSV).length > 0"
                  type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteFile">Xóa File</button>
                <button v-else type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="submitFile">Xác
                  nhận</button>
              </div>
            </div>
          </div>
        </div>
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
