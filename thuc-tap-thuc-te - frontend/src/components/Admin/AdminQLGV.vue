<script>
export default {
  props: {
    teachers: { type: Array, default: [] },
  },
 
};
</script>

<template>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead align="center">
        <tr>
          <th scope="col">STT</th>
          <th scope="col">MSGV</th>
          <th scope="col">Họ và tên</th>
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
          <td>{{ teacher.Sdt }}</td>
          <td>{{ teacher.MaLop }}</td>
          <td>{{ teacher.BoMon }}</td>
          <td><i class="fa-solid fa-pen-to-square" style="cursor: pointer"></i> <i class="fa-regular fa-trash-can" style="cursor: pointer"></i></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style></style>
