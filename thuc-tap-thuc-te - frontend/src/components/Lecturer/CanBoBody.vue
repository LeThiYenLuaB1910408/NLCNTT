<script>
import LopHoc from '@/services/class';

import { useAccountStore } from "@/stores/AccountStore";
import Calendar from '../Home/Calendar.vue';
export default {
  components: {
    Calendar
  },
  data() {
    const accStore = useAccountStore();

    return {
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
              <li class="breadcrumb-item active" aria-current="page">
                Nội dung học phần
              </li>
            </ol>
          </nav>
        </div>

        <div class="container content">
          <div class="row mb-5">
            <h5 class="my-4 form text-secondary">DANH SÁCH SINH VIÊN</h5>

            <div>
              <div class="card card-body border border-dark rounded-0">
                <table class="table">
                  <thead align="center">
                    <tr>
                      <th scope="col">STT</th>
                      <th scope="col">MSSV</th>
                      <th scope="col">Họ và Tên</th>
                      <th scope="col">Mã lớp</th>
                      <th scope="col">Chuyên Ngành</th>
                      <th scope="col">Số Điện Thoại</th>

                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody align="center">
                    <tr v-for="(student, index) in this.students" :key="index">
                      <th scope="row">{{ index + 1 }}</th>
                      <td>{{ student.SinhVienLop._id }}</td>
                      <td>{{ student.SinhVienLop.HoTen }}</td>
                      <td>{{ student.SinhVienLop.MaLop }}</td>
                      <td>{{ student.SinhVienLop.ChuyenNganh }}</td>
                      <td>{{ student.SinhVienLop.Sdt }}</td>

                      <td class="text-center pt-2">
                        <router-link :to="`/canbo/${student._id}/${student.SinhVienLop._id}`">Xem thông tin
                        </router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Calendar/>
    </div>
  </div>
</template>

<style scoped>

th,
span,
td {
  padding: 5px;
}

th span {
  font-size: 15px;
}

</style>
