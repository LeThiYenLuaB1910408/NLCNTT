<script>
import Report from '@/services/report';
import { useAccountStore } from "@/stores/AccountStore";
import Calendar from '../Home/Calendar.vue';
export default {
    components: {
        Calendar
    },
    data() {
        const accStore = useAccountStore();
        return {
            accStore,
            report: null,
            BaiNop: {},
            selectedFile: ""

        };
    },
    methods: {
        async getData() {
            try {
                this.report = await Report.getReport(this.$route.params.MaLopTT, this.$route.params.TenBaoCao)
                if (this.report.BaoCao.BaiNop.length > 0) {
                    this.BaiNop = this.report.BaoCao.BaiNop.filter(e => e.MSSV == this.accStore.user._id)[0]
                }
                console.log(this.BaiNop);
            } catch (error) {
                console.log(error);
            }
        },
        onChangeFile(e) {
            const selectedFile = e.target.files[0];
            this.selectedFile = selectedFile;
        },
        async submitFile() {
            const formData = new FormData();
            formData.append("file", this.selectedFile);
            formData.append("TenBaoCao", this.$route.params.TenBaoCao);
            formData.append("MSSV", this.accStore.user._id);
            await Report.submitFile(this.$route.params.MaLopTT, formData)
            this.getData();
        },
    },
    mounted() {
        this.getData();
    },
};
</script>
<template>
    <div class="container-fluid border-bottom border-dark">
        <div class="row">
            <div class="col-md-9 px-5">
                <div class="container my-3">
                    <nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E&#34;);"
                        aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link to="/" class="text-decoration-none text-black">Trang Chủ</router-link>
                            </li>
                            <li class="breadcrumb-item">
                                <a>{{ this.accStore.user.ChuyenNganh }}</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                <router-link to="'/courses/' + this.accStore.user.MaLopTT"
                                    class="text-decoration-none text-black">Các khóa thực tập</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                {{ this.$route.params.TenBaoCao }}
                            </li>
                        </ol>
                    </nav>
                </div>
                <div class="row">
                    <h5 class="my-3 khoa-hoc text-secondary">Nộp {{ this.$route.params.TenBaoCao }}
                    </h5>
                    <div class="ms-3 my-3"> Hướng dẫn:
                        <ol class="mt-2">
                            <li>Sinh Viên nộp file dưới dạng .pdf</li>
                            <li>Cách đặt tên: <b>MSSV_HoTen_BaoCao.pdf</b></li>
                        </ol>
                    </div>
                    <h5 class="mb-4">Trạng Thái Nộp</h5>
                    <div class="noidung ms-4">
                        <table class="table border border-light">
                            <tr>
                                <td class="col-2 border border-light ">Trạng thái nộp</td>
                                <td v-if="this.BaiNop.File != null" style="background: rgba(49,222,65,0.3);">Đã nộp bài
                                </td>
                                <td v-else style="background: rgb(230, 230, 230);">Chưa nộp bài</td>
                            </tr>
                            <tr>
                                <td class="col-2 border border-right">Tình trạng chấm điểm</td>
                                <td v-if="this.BaiNop.DiemSo != null" style="background: rgba(49,222,65,0.3);">
                                    {{ this.BaiNop.DiemSo }}</td>
                                <td v-else style="background: rgb(230, 230, 230);">Chưa chấm điểm</td>
                            </tr>
                            <tr>
                                <td class="col-2 border border-right">Hết hạn</td>
                                <td style="background: rgb(230, 230, 230);">Monday, 14 November 2022, 12:00 AM</td>
                            </tr>
                            <tr>
                                <td class="col-2 border border-right">Thời gian còn lại</td>
                                <td style="background: rgb(230, 230, 230);">3 giờ 57 phút</td>
                            </tr>
                            <tr>
                                <td class="col-2 border border-right">Sửa đổi lần cuối</td>
                                <td style="background: rgb(230, 230, 230);">-</td>
                            </tr>
                            <tr>
                                <td class="col-2 border border-right">Nộp tập tin</td>
                                <td v-if="this.BaiNop.File != null" style="background: rgb(230, 230, 230);">
                                    <i v-if="this.BaiNop.File.includes('pdf')"
                                        class="fa-regular text-danger fa-file-pdf"></i>
                                    <i v-else-if="this.BaiNop.File.includes('docx')"
                                        class="fa-regular text-primary fa-file-word"></i>
                                    <i v-else-if="this.BaiNop.File.includes('xlsx')"
                                        class="fa-regular text-success fa-file-excel"></i>
                                    <i v-else-if="this.BaiNop.File.includes('jpg')"
                                        class="fa-regular text-success fa-file-image"></i>
                                    <i v-else-if="this.BaiNop.File.includes('pptx')"
                                        class="fa-regular fa-file-powerpoint" style="color:orange"></i>
                                    <i v-else class="fa-regular  fa-file-lines"></i>
                                    <a href="#">
                                        {{ this.BaiNop.File.slice(this.BaiNop.File.lastIndexOf("/") + 1) }}
                                    </a>
                                </td>
                                <td v-else style="background: rgb(230, 230, 230);">
                                    <input type="file" class="form-control border rounded-0" @change="onChangeFile" />
                                </td>
                            </tr>
                            <tr>
                                <td class="col-2 border border-right">Đăng tải bình luận</td>
                                <td style="background: rgb(230, 230, 230);">> Các bình luận(0)</td>
                            </tr>
                        </table>
                        <div class="submit text-center my-5">
                            <button v-if="this.BaiNop.File == null" @click="submitFile" class="btn btn-primary border rounded-0">Nộp
                                Bài</button>
                            <div v-else class="row justify-content-center">
                                <button class="col-2 btn btn-primary border rounded-0">Sửa Bài Nộp</button>
                                <button class="col-2 btn btn-danger border rounded-0">Loại Bỏ Bài Nộp</button>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            <Calendar />
        </div>
    </div>
</template>

<style scoped>
.khoa-hoc {
    background: rgb(228, 225, 225);
    padding: 10px 0 10px 5px;
    border-left: 3px solid rgba(80, 116, 235, 0.814);
}

td {
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid rgba(255, 255, 255);
}
.col-2{
    width: 20%;
}
</style>
