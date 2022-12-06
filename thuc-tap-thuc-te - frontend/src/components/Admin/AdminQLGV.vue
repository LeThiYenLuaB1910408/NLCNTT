<script>
export default {
  data() {
    return {
      data: {
        CapQuyen: "2"
      },
      idEdit: null
    }
  },
  props: {
    teachers: { type: Array, default: [] },
  },
  emits: ["delete:teachers", "update:teachers", "add:teachers"],
  methods: {
    deleteTeacher(id) {
      this.$emit("delete:teachers", id);
    },
    update() {
      this.$emit("update:teachers", this.idEdit, this.data);
      this.idEdit = null
      this.data = { CapQuyen: "2" }
    },
    add() {
      this.$emit("add:teachers", this.data);
    },
    setEdit(data) {
      this.data.HoTen = data.HoTen;
      this.data.Sdt = data.Sdt;
      this.data.MaLop = data.MaLop;
      this.data.Email = data.Email;
      this.data.BoMon = data.BoMon;
      this.data._id = data._id;
      this.idEdit =  data._id;
    }
  }
};
</script>

<template>
  <div class="btn-group mb-3 border" role="group" aria-label="Basic ">
    <button class="btn btn-outline-primary rounded-0" type="button" data-bs-toggle="modal"
      data-bs-target="#exampleModal" @click="setEdit({})">
      <i class="fa-solid fa-plus me-2"></i>Thêm giảng viên
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
          <th scope="col">MSGV</th>
          <th scope="col">Họ và tên</th>
          <th scope="col">Email</th>
          <th scope="col">Số điện thoại</th>
          <th scope="col">Mã lớp cố vấn</th>
          <th scope="col">Bộ môn</th>
          <th scope="col">Thao tác</th>
        </tr>
      </thead>
      <tbody align="center">
        <tr v-for="(teacher, index) in teachers" :key="teacher._id">
          <td>{{ index + 1 }}</td>
          <td>{{ teacher._id }}</td>
          <td>{{ teacher.HoTen }}</td>
          <td>{{ teacher.Email }}</td>
          <td>{{ teacher.Sdt }}</td>
          <td>{{ teacher.MaLop }}</td>
          <td>{{ teacher.BoMon }}</td>
          <td><i class="fa-solid fa-pen-to-square me-2" style="cursor: pointer" data-bs-toggle="modal"
              data-bs-target="#exampleModal" @click="setEdit(teacher)"></i>
            <i class="fa-regular fa-trash-can" style="cursor: pointer" @click="deleteTeacher(teacher._id)"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="modal fade hide" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container py-4 ms-0">
            <div class="header text-center">
              <h5>THÔNG TIN GIẢNG VIÊN</h5>
            </div>
            <div class="row">
              <div class="col-md-3 mb-3 mt-3">
                <label for="msgv" class="form-label">MSGV:</label>
                <input type="text" class="form-control border rounded-0" id="msgv" name="msgv"
                  v-model="this.data._id" />
              </div>
              <div class="col-md-5 mb-3 mt-3">
                <label for="ht" class="form-label">Họ Tên</label>
                <input type="text" class="form-control border rounded-0" id="ht" name="ht"
                  v-model="this.data.HoTen" />
              </div>
              <div class="col-md-4 mb-3 mt-3">
                <label for="sdt" class="form-label">Số điện thoại:</label>
                <input type="text" class="form-control border rounded-0" id="sdt" name="sdt"
                  v-model="this.data.Sdt" />
              </div>
            </div>

            <div class="row">
              <div class="col-md-3 mb-3 mt-3">
                <label for="ml" class="form-label">Mã Lớp Cố Vấn:</label>
                <input type="text" class="form-control border rounded-0" id="ml" name="ml"
                  v-model="this.data.MaLop" />
              </div>
              <div class="col-md-5 mb-3 mt-3">
                <label for="mail" class="form-label">Email:</label>
                <input type="email" class="form-control border rounded-0" id="mail" name="mail"
                  v-model="this.data.Email" />
              </div>
              <div class="col-md-4 mb-3 mt-3">
                <label for="cn" class="form-label">Bộ Môn:</label>
                <select id="inputState" class="form-select" v-model="this.data.BoMon">
                  <option selected>Choose...</option>
                  <option value="CNTT">CNTT</option>
                  <option value="THUD">THUD</option>
                  <option value="CNPM">CNPM</option>
                  <option value="MMT&TT">MMT&TT</option>
                  <option value="KHMT">KHMT</option>
                  <option value="HTTT">HTTT</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button v-if="this.idEdit != null" type="button" class="btn btn-primary" data-bs-dismiss="modal"
            @click="update">Lưu</button>
          <button v-else type="button" data-bs-dismiss="modal" class="btn btn-primary" @click="add">Thêm</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>

</style>
