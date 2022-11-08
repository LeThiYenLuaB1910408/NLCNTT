<script>
import LopHoc from "@/services/class";
import { useAccountStore } from "@/stores/AccountStore";
export default {
  data() {
    const accStore = useAccountStore();
    return {
      date: new Date(),
      classes: [],
      classPast: [],
      classCurrent: {},
      registered: null,
      accStore,
    };
  },
  methods: {
    async retrieveClasses() {
      try {
        this.classes = await LopHoc.getAll();
        this.classes = this.classes.filter(
          (cl) => cl.ChuyenNganh == this.$route.params.id
        );
        this.classes.map((element) => {
          if (element.NienKhoa.startsWith(this.date.getFullYear().toString())) {
            this.classCurrent = element;
          }
        });

        this.classPast = this.classes.filter(
          (cl) => cl._id !== this.classCurrent._id
        );

        this.registered = await LopHoc.isRegistered(this.accStore.user._id);
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      this.retrieveClasses();
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
<template>
  <div class="container-fluid border-bottom border-dark">
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
              <li class="breadcrumb-item">
                <a>{{ $route.params.id }}</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Các Khóa Thực Tập
              </li>
            </ol>
          </nav>
        </div>

        <div class="container recently">
          <div class="row mb-5">
            <h5 class="my-4 khoa-hoc text-secondary">CÁC KHÓA HỌC GẦN ĐÂY</h5>
            <div
              v-if="this.classCurrent._id"
              class="col-md-4 card card-recently border rounded-0 me-4"
              style="width: 18rem"
            >
              <div class="card-body">
                <h5 class="card-title">
                  Thực Tập Thực Tế - {{ this.classCurrent.ChuyenNganh }}
                  {{ this.classCurrent.MaLopTT }}
                </h5>
                <h6 class="card-subtitle mb-4 mt-2 text-muted">
                  HK Hè - Khóa {{ this.classCurrent.NienKhoa }}
                </h6>
                <router-link :to="'/courses/' + this.classCurrent._id"
                  ><button v-if="!this.registered" class="btn border rounded-0">
                    Đăng Ký
                  </button>
                  <button v-else class="btn border rounded-0">Tham gia</button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="container past">
          <div class="row mb-5">
            <h5 class="my-4 khoa-hoc text-secondary">CÁC KHÓA HỌC KHÁC</h5>
            <div
              v-for="classs in this.classPast"
              :key="classs._id"
              class="col-md-4 card card-past border rounded-0 me-4"
              style="width: 18rem"
            >
              <div class="card-body">
                <h5 class="card-title">
                  Thực Tập Thực Tế - {{ classs.ChuyenNganh }}
                  {{ classs.MaLopTT }}
                </h5>
                <h6 class="card-subtitle mb-4 mt-2 text-muted">
                  HK Hè - Khóa {{ classs.NienKhoa }}
                </h6>
                <button class="btn btn-secondary border rounded-0">
                  Tham Gia
                </button>
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
.card-recently {
  box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.5);
}
.card-recently .btn {
  background-color: rgba(51, 73, 183, 0.814);
  color: aliceblue;
}

.card-recently .btn:hover,
.card-recently .btn:active {
  background-color: rgba(43, 63, 161, 0.814) !important;
  color: aliceblue !important;
}

.khoa-hoc {
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
