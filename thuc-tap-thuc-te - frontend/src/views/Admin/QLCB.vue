<script>
import AdminQLCB from "@/components/Admin/AdminQLCB.vue";
import GiangVien from "@/services/lecturer";
export default {
  components: {
    AdminQLCB,
  },
  data() {
    return {
      CanBo: []
    };
  },
  methods: {
    async deleteCanBo(id) {
      if (confirm("Bạn muốn xóa Cán Bộ này?")) {
        try {
          const result = await GiangVien.deleteCB(id);
          alert(result.message)
          this.retrieveCanBo();
        }
        catch (error) { alert(error); }
      }
    },
    async updateCanBo(id, data) {
      try {
        await GiangVien.updateCB(id, data);
        this.retrieveCanBo();
      }
      catch (error) {
        alert(error);
      }
    },
    async addCanBo(data) {
      try {
        await GiangVien.addCB(data);
        this.retrieveCanBo();
      }
      catch (error) {
        alert(error);
      }
    },
    async retrieveCanBo() {
      try {
        this.CanBo = await GiangVien.getAllCB();
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      this.retrieveCanBo();
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="my-3">Quản Lý Cán Bộ</h2>

    </div>
    <hr />
    <AdminQLCB :CanBo="CanBo" @delete:CanBo="deleteCanBo" @add:CanBo="addCanBo"
      @update:CanBo="updateCanBo" />
  </main>
</template>
<style>

</style>
