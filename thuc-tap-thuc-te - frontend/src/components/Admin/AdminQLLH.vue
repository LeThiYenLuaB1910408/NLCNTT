<script>
export default {
  props: {
    classes: { type: Array, default: [] },
  },
};
</script>

<template>
  <h5 class="mt-2">Danh sách lớp học</h5>
  <div class="container lop-hoc my-3">
    <!-- <ol class="list-group list-group-numbered"> -->
    <li
      class="list-group-item w-50 py-2 ps-2 border border-secondary rounded-0"
      v-for="(lh, index) in classes"
      :key="lh._id"
    >
      {{ index + 1 }}.
      <a href="#"> Lớp thực tập {{ lh.ChuyenNganh }} {{ lh.MaLopTT }} {{ lh.NienKhoa }}</a>
    </li>
    <!-- </ol> -->
  </div>
</template>

<style></style>
