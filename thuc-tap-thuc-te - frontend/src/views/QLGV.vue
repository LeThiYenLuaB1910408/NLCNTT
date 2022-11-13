<script>
import AdminQLGV from "../components/Admin/AdminQLGV.vue";
import GiangVien from "../services/lecturer";
import AdminSiderBar from "../components/Admin/AdminSiderBar.vue";
import AdminHeader from "../components/Admin/AdminHeader.vue";
export default {
    components: {
        AdminQLGV,
        AdminSiderBar,
        AdminHeader,
    },
    data() {
        return {
            teachers: [],
            teacher: {
                _id: "",
                HoTen: "",
                Sdt: "",
                BoMon: "",
                MaLop: [],
            },
        };
    },
    methods: {
        async deleteTeacher(id) {
            if (confirm("Bạn muốn xóa Giảng Viên này?")) {
                try {
                    const result = await GiangVien.deleteGV(id);
                    alert(result.message)
                    this.retrieveTeachers();
                }
                catch (error) { alert(error); }
            }
        },
        async updateTeacher(id, data) {
            try {
                const result = await GiangVien.updateGV(id, data);
                alert(result.message)
                this.retrieveTeachers();
            }
            catch (error) {
                alert(error);
            }
        },
        async addTeacher(data) {
            try {
                await GiangVien.create(data);
                this.retrieveTeachers();
            }
            catch (error) {
                alert(error);
            }
        },
        async retrieveTeachers() {
            try {
                this.teachers = await GiangVien.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveTeachers();
        },
    },
    mounted() {
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
                    <h2 class="my-3">Quản Lý Giảng Viên</h2>
                </div>
                <hr />
                <AdminQLGV :teachers="teachers" @delete:teachers="deleteTeacher" @add:teachers="addTeacher"
                    @update:teachers="updateTeacher" />
            </main>
        </div>
    </div>
</template>
<style>

</style>
