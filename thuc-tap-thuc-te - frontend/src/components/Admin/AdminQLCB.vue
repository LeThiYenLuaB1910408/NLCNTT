<script>
export default {
  data() {
    return {
      data: {
        CapQuyen: "3"
      },
      idEdit: null
    }
  },
  props: {
    CanBo: { type: Array, default: [] },
  },
  emits: ["delete:CanBo", "update:CanBo", "add:CanBo"],
  methods: {
    deleteTeacher(id) {
      this.$emit("delete:CanBo", id);
    },
    update() {
      this.$emit("update:CanBo", this.idEdit, this.data);
      this.idEdit = null
      this.data = { CapQuyen: "3" }
    },
    add() {
      this.$emit("add:CanBo", this.data);
    },
    setEdit(data) {
      this.data.HoTen = data.HoTen;
      this.data.Email = data.Email;
      this.data.Sdt = data.Sdt;
      this.data.TenDangNhap = data.TenDangNhap;
      this.data.TenCongTy = data.TenCongTy;
      this.idEdit = data._id;
    }
  }
};
</script>

<template>
  <div class="btn-group mb-3 border" role="group" aria-label="Basic ">
    <button class="btn btn-outline-primary rounded-0" type="button" data-bs-toggle="modal"
      data-bs-target="#exampleModal" @click="setEdit({})">
      <i class="fa-solid fa-plus me-2"></i>Thêm cán bộ
    </button>
    <button class="btn btn-outline-primary rounded-0" type="button" @click="refreshList()">
      <i class="fa-solid fa-arrows-rotate fs-5"></i>
    </button>
  </div>

  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead align="center">
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Họ và tên</th>
          <th scope="col">Số điện thoại</th>
          <th scope="col">Email</th>
          <th scope="col">Tên Công ty</th>
          <th scope="col">Tên Đăng Nhập</th>
          <th scope="col">Thao tác</th>
        </tr>
      </thead>
      <tbody align="center">
        <tr v-for="(teacher, index) in CanBo" :key="teacher._id">
          <td>{{ index + 1 }}</td>
          <td>{{ teacher.HoTen }}</td>
          <td>{{ teacher.Sdt }}</td>
          <td>{{ teacher.Email }}</td>
          <td>{{ teacher.TenCongTy }}</td>
          <td>{{ teacher.TenDangNhap }}</td>
          <td><i class="fa-solid fa-pen-to-square me-2" style="cursor: pointer" data-bs-toggle="modal"
              data-bs-target="#exampleModal" @click="setEdit(teacher)"></i>
            <i class="fa-regular fa-trash-can" style="cursor: pointer" @click="deleteTeacher(teacher._id)"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="modal fade hide" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container py-4 ms-0">
            <div class="header text-center">
              <h5>THÔNG TIN CÁN BỘ</h5>
            </div>
            <div class="mb-3 mt-3">
              <label for="lh" class="form-label">Họ Tên:</label>
              <input type="text" class="form-control border rounded-0" id="lh" placeholder="" name="lh"
                v-model="this.data.HoTen" />
            </div>
            <div class="mb-3 mt-3">
              <label for="lh" class="form-label">Email:</label>
              <input type="text" class="form-control border rounded-0" id="lh" placeholder="" name="lh"
                v-model="this.data.Email" />
            </div>
            <div class="row">
              <div class="mb-3 mt-3 col-md-6">
                <label for="lh" class="form-label">Số Điện Thoại:</label>
                <input type="text" class="form-control border rounded-0" id="lh" placeholder="" name="lh"
                  v-model="this.data.Sdt" />
              </div>
              <div class="mb-3 mt-3 col-md-6">
                <label for="lh" class="form-label">Tên Đăng Nhập:</label>
                <input type="text" class="form-control border rounded-0" id="lh" placeholder="" name="lh"
                  v-model="this.data.TenDangNhap" />
              </div>
            </div>
            <div class="mb-3 mt-3">
              <label for="lh" class="form-label">Tên Công Ty:</label>
              <input type="text" class="form-control border rounded-0" id="lh" placeholder="" name="lh"
                v-model="this.data.TenCongTy" />
            </div>


          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button v-if="this.idEdit != null" type="button" class="btn btn-primary" data-bs-dismiss="modal"
            @click="update">Lưu</button>
          <button v-else type="button" class="btn btn-primary" @click="add">Thêm</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>

</style>
