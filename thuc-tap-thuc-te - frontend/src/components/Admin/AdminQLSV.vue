<script>
export default {
  props: {
    students: { type: Array, default: [] },
  },
 
};
</script>

<template>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">MSSV</th>
          <th scope="col">Họ và tên</th>
          <th scope="col">Số điện thoại</th>
          <th scope="col">Mã lớp</th>
          <th scope="col">Chuyên ngành</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in students" :key="student._id">
          <td>{{ index + 1 }}</td>
          <td>{{ student._id }}</td>
          <td>{{ student.HoTen }}</td>
          <td>{{ student.Sdt }}</td>
          <td>{{ student.MaLop }}</td>
          <td>{{ student.ChuyenNganh }}</td>
          <td><i class="fa-solid fa-pen-to-square"></i></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style></style>
