<script>
import AdminQLCB from "../components/Admin/AdminQLCB.vue";
import GiangVien from "../services/lecturer";
import AdminSiderBar from "../components/Admin/AdminSiderBar.vue";
import AdminHeader from "../components/Admin/AdminHeader.vue";
export default {
  components: {
    AdminQLCB,
    AdminSiderBar,
    AdminHeader,
  },
  data() {
    return {
      teachers: [],
      teacher: {
        HoTen: "",
        Sdt: "",
        Email: "",
        TenCongTy: "",
        TenDangNhap: "",
      },
    };
  },
  methods: {
    // async addAccount(data) {
    //   try {
    //     await GiangVien.createAccountCB(data);
    //     this.refreshList();
    //     this.teacher = {
    //       TenDangNhap: "",
    //       MatKhau: "",
    //       CapQuyen: "3"
    //     };
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async deleteTeacher(id) {
      if (confirm("Bạn muốn xóa Cán Bộ này?")) {
        try {
          const result = await GiangVien.deleteCB(id);
          alert(result.message)
          this.retrieveTeachers();
        }
        catch (error) { alert(error); }
      }
    },
    async updateTeacher(id,data) {
      console.log(data);
        try {
          await GiangVien.updateCB(id,data);
          this.retrieveTeachers();
        }
        catch (error) { alert(error);
      }
    },
    async addTeacher(data) {
        try {
          await GiangVien.addCB(data);
          this.retrieveTeachers();
        }
        catch (error) { alert(error);
      }
    },
    async retrieveTeachers() {
      try {
        this.teachers = await GiangVien.getAllCB();
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      this.retrieveTeachers();
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<template>
  <AdminHeader />
  <div class="container-fluid">
    <div class="row">
      <AdminSiderBar />
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="d-flex justify-content-between align-items-center">
          <h2 class="my-3">Quản Lý Cán Bộ</h2>
          
        </div>
        <hr />
        <AdminQLCB :teachers="teachers" @delete:teachers="deleteTeacher" @add:teachers="addTeacher"
          @update:teachers="updateTeacher" />
        <div class="btn-group mb-3 border" role="group" aria-label="Basic ">
          <button class="btn btn-outline-primary rounded-0" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
            <i class="fa-solid fa-plus me-2"></i>Thêm tài khoản cán bộ
          </button>
          <button class="btn btn-outline-primary rounded-0" type="button" @click="refreshList()">
            <i class="fa-solid fa-arrows-rotate fs-5"></i>
          </button>
        </div>
        <div class="collapse" id="collapseExample">
          <div class="container w-50 border border-dark py-4">
            <div class="header text-center">
              <h5>THÔNG TIN TÀI KHOẢN CÁN BỘ</h5>
            </div>
            <div class="row">
              <div class="col-md-3 mb-3 mt-3">
                <label for="mscb" class="form-label">Tên đăng nhập:</label>
                <input type="text" class="form-control border rounded-0" id="mscb" name="mscb"
                  v-model="this.teacher.TenDangNhap" />
              </div>
              <div class="col-md-5 mb-3 mt-3">
                <label for="ht" class="form-label">Mật khẩu</label>
                <input type="text" class="form-control border rounded-0" id="ht" name="ht"
                  v-model="this.teacher.MatKhau" />
              </div>
            </div>

            <div class="text-center mt-3">
              <button class="btn btn-primary border rounded-0" data-bs-toggle="collapse" href="#btncheck1"
                @click="addAccount(this.teacher)">
                Thêm Tài Khoản
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<style>

</style>
