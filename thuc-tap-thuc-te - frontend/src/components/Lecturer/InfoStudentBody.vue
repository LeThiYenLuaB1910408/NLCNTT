<script>
import Report from '@/services/report';
import { useAccountStore } from "@/stores/AccountStore";
import FileBaoCao from '../Home/FileBaoCao.vue';
import Calendar from '../Home/Calendar.vue';

export default {
  components:{
    FileBaoCao,
    Calendar
  },
  data() {
    const accStore = useAccountStore();

    return {
      accStore,
      reportCanBo: null,
      reports: null,
      selected: null,
      fileSelected: null
    };
  },
  methods: {
    async getAll() {
      this.reports = await Report.getAll(this.$route.params.class)
      this.reportCanBo = this.reports.BaoCao.filter((e) => e.QuyenHienThi.includes(this.accStore.user.CapQuyen))
    },
    async submitFile(file,TenBaoCao) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("TenBaoCao", TenBaoCao);
      formData.append("MSSV", this.$route.params.id);
      await Report.submitFile(this.$route.params.class, formData)
      this.getAll();
    },
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
            <FileBaoCao :MSSV="this.$route.params.id" :reports="this.reportCanBo" @submit:report="submitFile"/>
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

</style>
