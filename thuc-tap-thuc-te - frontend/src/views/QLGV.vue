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
        async addTeacher(data) {
            try {
                await GiangVien.create(data);
                this.refreshList();
                this.teacher = {
                    _id: "",
                    HoTen: "",
                    Sdt: "",
                    BoMon: "",
                    MaLop: [],
                    CapQuyen: "2"
                };
            } catch (error) {
                console.log(error);
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
                <AdminQLGV :teachers="teachers" />
                <div class="btn-group mb-3 border" role="group" aria-label="Basic ">
                    <button class="btn btn-outline-primary rounded-0" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        <i class="fa-solid fa-plus me-2"></i>Thêm giảng viên
                    </button>
                    <button class="btn btn-outline-primary rounded-0" type="button" @click="refreshList()">
                        <i class="fa-solid fa-arrows-rotate fs-5"></i>
                    </button>
                </div>
                <div class="collapse" id="collapseExample">
                    <div class="container w-50 border border-dark py-4">
                        <div class="header text-center">
                            <h5>THÔNG TIN GIẢNG VIÊN</h5>
                        </div>
                        <div class="row">
                            <div class="col-md-3 mb-3 mt-3">
                                <label for="msgv" class="form-label">MSGV:</label>
                                <input type="text" class="form-control border rounded-0" id="msgv" name="msgv"
                                    v-model="this.teacher._id" />
                            </div>
                            <div class="col-md-5 mb-3 mt-3">
                                <label for="ht" class="form-label">Họ Tên</label>
                                <input type="text" class="form-control border rounded-0" id="ht" name="ht"
                                    v-model="this.teacher.HoTen" />
                            </div>
                            <div class="col-md-4 mb-3 mt-3">
                                <label for="sdt" class="form-label">Số điện thoại:</label>
                                <input type="text" class="form-control border rounded-0" id="sdt" name="sdt"
                                    v-model="this.teacher.Sdt" />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mb-3 mt-3">
                                <label for="ml" class="form-label">Mã Lớp Cố Vấn:</label>
                                <input type="text" class="form-control border rounded-0" id="ml" name="ml"
                                    v-model="this.teacher.MaLop" />
                            </div>
                            <div class="col-md-6 mb-3 mt-3">
                                <label for="cn" class="form-label">Bộ Môn:</label>
                                <select id="inputState" class="form-select" v-model="this.teacher.BoMon">
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

                        <div class="text-center mt-3">
                            <button class="btn btn-primary border rounded-0" data-bs-toggle="collapse" href="#btncheck1"
                                @click="addTeacher(this.teacher)">
                                Thêm Giảng Viên
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>
<style>

</style>
