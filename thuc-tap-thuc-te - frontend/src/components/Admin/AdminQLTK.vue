<script>
export default {
  props: {
    accounts: { type: Array, default: [] },
  },
};
</script>

<template>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead align="center">
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Tên Đăng Nhập</th>
          <th scope="col">Mật Khẩu</th>
          <th scope="col">Cấp quyền</th>
          <th scope="col">Thao tác</th>
        </tr>
      </thead>
      <tbody align="center">
        <tr v-for="(account, index) in accounts" :key="account._id">
          <td>{{ index + 1 }}</td>
          <td>{{ account.TenDangNhap }}</td>
          <td>{{ account.MatKhau }}</td>
          <td v-if="account.CapQuyen == 0">Sinh viên</td>
          <td v-else-if="account.CapQuyen == 1">Lãnh đạo cấp khoa</td>
          <td v-else-if="account.CapQuyen == 2">Giảng viên hướng dẫn</td>
          <td v-else-if="account.CapQuyen == 3">Cán bộ hướng dẫn</td>
          <td v-else-if="account.CapQuyen == -1">Quản trị viên</td>
          <td><i class="fa-solid fa-pen-to-square" style="cursor: pointer"></i> <i class="fa-regular fa-trash-can"
              style="cursor: pointer"></i></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style>

</style>
