<script>
import AdminQLLH from "@/components/Admin/AdminQLLH.vue";
import LopHoc from "@/services/class";
export default {
  components: {
    AdminQLLH,
  },
  data() {
    return {
      date: new Date(),
      classes: [],
      classCurrent: [],

    };
  },
  methods: {
    async retrieveClasses() {
      this.classCurrent = []
      try {
        this.classes = await LopHoc.getAll();
        this.classes.map((element, index) => {
          if (element.NienKhoa.startsWith(this.date.getFullYear().toString())) {
            this.classCurrent.push(element);
          }
        });
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      this.retrieveClasses();
    },
  },
  created() {
    this.refreshList();
  },
};
</script>

<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="my-3">Quản Lý Lớp Học</h2>
    </div>
    <hr />
    <AdminQLLH :classCurrent="this.classCurrent" :classes="classes" @refresh:classes="refreshList" />

  </main>
</template>

<style>

</style>
