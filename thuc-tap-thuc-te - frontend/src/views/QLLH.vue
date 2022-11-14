<script>
import AdminQLLH from "../components/Admin/AdminQLLH.vue";
import LopHoc from "@/services/class";
import AdminHeader from "../components/Admin/AdminHeader.vue";
import AdminSiderBar from "../components/Admin/AdminSiderBar.vue";
export default {
  components: {
    AdminQLLH,
    AdminHeader,
    AdminSiderBar,
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
      this.classPast = []
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
  <AdminHeader />
  <div class="container-fluid">
    <div class="row">
      <AdminSiderBar />
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="d-flex justify-content-between align-items-center">
          <h2 class="my-3">Quản Lý Lớp Học</h2>
        </div>
        <hr />
        <AdminQLLH :classCurrent="this.classCurrent" :classes="classes" @refresh:classes="refreshList"/>

      </main>
    </div>
  </div>
</template>

<style>

</style>
