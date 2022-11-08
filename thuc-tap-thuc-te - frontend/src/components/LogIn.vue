<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import TaiKhoan from "../services/account";
import { useAccountStore } from "@/stores/AccountStore";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const loginFormSchema = yup.object().shape({
      TenDangNhap: yup
        .string()
        .required("Tên đăng nhập không rỗng.")
        .min(4, "Tên phải ít nhất 4 ký tự"),
      MatKhau: yup.string().required("Mật khẩu không rỗng."),
    });
    const accStore = useAccountStore();

    return {
      loginFormSchema,
      acc: {
        TenDangNhap: "",
        MatKhau: "",
      },
      user: {},
      accStore
    };
  },

  methods: {
    async submitAcc(data) {
      try {
        this.user = await TaiKhoan.login(data);
        this.accStore.user = this.user;
        if (!this.user.error) {
          switch (this.user.CapQuyen) {
            case "-1":
              this.$router.push({ name: "QLTK" });
              break;
            case "1":
              this.$router.push({ name: "leader" });
              break;
            case "2":
              this.$router.push('/lecturer');
              break;
            case "3":
              this.$router.push({ name: "canbo" });
              break;

            default:
              this.$router.push({ name: "home" });
              break;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <div class="container-fluid form py-5">
    <div class="row d-flex justify-content-center py-5">
      <div class="col-md-4 slogan text-light text-center pt-5">
        <h2>CIT O-INTERNSHIP</h2>
        <h5>Hệ Thống Đăng Ký Thực Tập Trực Tuyến</h5>
      </div>
      <div class="col-md-4 log-in py-5">
        <div class="tieu-de">
          <h5 class="text-center fw-bold">ĐĂNG NHẬP</h5>
        </div>

        <Form @submit="submitAcc(this.acc)" :validation-schema="loginFormSchema" id="signinForm"
          class="form-horizontal container">
          <div class="form-group mb-4">
            <label for="name" class="form-label">Tên Đăng Nhập</label>
            <Field type="text" class="form-control py-2 border border-secondary rounded-0" id="name" name="TenDangNhap"
              v-model="this.acc.TenDangNhap" />
            <ErrorMessage name="name" class="error-feedback" />
          </div>
          <div class="form-group mb-4">
            <label for="password" class="form-label">Mật Khẩu</label>
            <Field type="password" class="form-control py-2 border border-secondary rounded-0" id="password"
              name="MatKhau" v-model="this.acc.MatKhau" />
            <ErrorMessage name="password" class="error-feedback" />
          </div>
          <p v-if="this.user.error" class="text-danger">
            Tên đăng nhập hoặc mật khẩu không đúng
          </p>
          <div class="form-group form-check mb-4">
            <label class="form-check-label">
              <input class="form-check-input border border-secondary rounded-0" type="checkbox" name="remember"
                id="remember" value="remember_me" />
              Ghi Nhớ Tôi</label>
          </div>
          <button class="submit btn col-12 py-2 mb-3 border border-secondary rounded-0">
            Đăng Nhập
          </button>
          <router-link to="/"><button
              class="btn btn-secondary col-12 btn_submit py-2 border border-secondary rounded-0">
              Trang Chủ
            </button></router-link>
          <!-- <router-link to="/lecturer"
            ><button
              class="btn btn-secondary col-12 btn_submit py-2 border border-secondary rounded-0"
            >
              Trang Chủ
            </button></router-link
          > -->
        </Form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form {
  border-top: 5px solid rgba(51, 73, 183, 0.814);
  border-bottom: 5px solid rgba(51, 73, 183, 0.814);
}

.slogan {
  background-color: rgba(51, 73, 183, 0.814);
}

.log-in {
  border: 2px solid rgba(51, 73, 183, 0.814);
  color: rgba(51, 73, 183, 0.814);
  font-weight: bold;
}

.submit {
  background-color: rgba(51, 73, 183, 0.814);
  color: white;
}
</style>
