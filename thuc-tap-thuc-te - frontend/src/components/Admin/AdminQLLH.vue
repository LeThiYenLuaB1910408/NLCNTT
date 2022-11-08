<script>
export default {
  props: {
    classes: { type: Array, default: [] },
    classCurrent: { type: Array, default: [] },
  },
};
</script>

<template>
  <div class="row">
    <div class="container lop-hoc my-3 col-lg-4">
      <h5 class="mt-2">Danh sách lớp học gần đây</h5>

      <li class="list-group-item py-2 ps-2 border border-secondary rounded-0" v-for="(lh, index) in classCurrent"
        :key="lh._id">
        {{ index + 1 }}.
        <a data-bs-toggle="collapse" href="#collapseExample1" role="button" aria-expanded="false"
          aria-controls="collapseExample"> Lớp thực tập {{ lh.ChuyenNganh }} {{ lh.MaLopTT }} {{ lh.NienKhoa }}</a>
      </li>
      <h5 class="mt-2">Danh sách lớp học</h5>
      <li class="list-group-item py-2 ps-2 border border-secondary rounded-0" v-for="(lh, index) in classes"
        :key="lh._id">
        {{ index + 1 }}.
        <a data-bs-toggle="collapse" href="#collapseExample1" role="button" aria-expanded="false"
          aria-controls="collapseExample"> Lớp thực tập {{ lh.ChuyenNganh }} {{ lh.MaLopTT }} {{ lh.NienKhoa }}</a>
      </li>
      <!-- </ol> -->
    </div>

    <div class="col-lg-8">
      <div class="collapse" id="collapseExample1">
        <div class="card card-body">
          Some placeholder content for the collapse component. This panel is hidden by default but revealed when the
          user
          activates the relevant trigger.
        </div>
      </div>
    </div>
  </div>



</template>

<style>

</style>
