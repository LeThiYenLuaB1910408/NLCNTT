<script>
import Report from '@/services/report';
import { useAccountStore } from "@/stores/AccountStore";
import Calendar from '@/components/components/Calendar.vue';
import FileBaoCao from '@/components/components/FileBaoCao.vue';
export default {
    components: {
        Calendar,
        FileBaoCao
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
                this.report = await Report.getReport(this.$route.params.MSGV, this.$route.params.TenBaoCao)
                if (this.report.BaoCao.BaiNop.length > 0) {
                    this.BaiNop = this.report.BaoCao.BaiNop.filter(e => e.MSSV == this.accStore.user._id)[0]
                    if (this.BaiNop == undefined) {
                        this.BaiNop = {}
                    }
                } else {
                    this.BaiNop = {}
                }
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
            await Report.submitFile(this.$route.params.MSGV, formData)
            this.getData();
        },
        async deleteFile() {
            const data = {
                TenBaoCao: this.$route.params.TenBaoCao,
                MSSV: this.accStore.user._id,
                File: this.BaiNop.File
            }
            await Report.deleteFile(this.$route.params.MSGV, data)
            this.getData();
        },
        secondToTime(duration) {
            var minutes = Math.floor((duration / (1000 * 60)) % 60),
                hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
                days = Math.floor((duration / (1000 * 60 * 60 * 24))),
                
                hours = (hours < 10) ? "0" + hours : hours;
                minutes = (minutes < 10) ? "0" + minutes : minutes;
               return (duration < 0)?  "Hết hạn nộp": days + " ngày, " + hours + " giờ, " + minutes + " phút";
            

        }
    },
    created() {
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
                                <router-link :to="'/courses/' + this.$route.params.MaLop"
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
                    <p class="ms-3">
                        {{ this.report.BaoCao.MoTa }}
                    </p>
                    <div class="ms-3 mb-3"> Hướng dẫn:
                        <ol class="mt-2">
                            <li>Sinh Viên nộp file dưới dạng .pdf</li>
                            <li>Cách đặt tên: <b>MSSV_HoTen_BaoCao.pdf</b></li>
                        </ol>
                    </div>
                    <h5 class="mb-4">Trạng Thái Nộp</h5>
                    <div class="noidung ms-4">
                        <table class="table border border-light">
                            <tr>
                                <td class="col-2 border ">Trạng thái nộp</td>
                                <td v-if="this.BaiNop.File != null" style="background: rgba(49,222,65,0.3);">Đã nộp bài
                                </td>
                                <td v-else style="background: rgb(230, 230, 230);">Chưa nộp bài</td>
                            </tr>
                            <tr>
                                <td class="col-2 border">Tình trạng chấm điểm</td>
                                <td v-if="this.BaiNop.DiemSo != null" style="background: rgba(49,222,65,0.3);">
                                    {{ this.BaiNop.DiemSo }}</td>
                                <td v-else style="background: rgb(230, 230, 230);">Chưa chấm điểm</td>
                            </tr>
                            <tr>
                                <td class="col-2 border">Hết hạn</td>
                                <td style="background: rgb(230, 230, 230);">{{ new
                                        Date(this.report.BaoCao.HanNop).toLocaleString("vi-VN", {
                                            timeZone: "Asia/Ho_Chi_Minh",
                                        })
                                }}</td>
                            </tr>
                            <tr>
                                <td class="col-2 border">Thời gian còn lại</td>
                                <td style="background: rgb(230, 230, 230);">{{ this.secondToTime(new
                                        Date(this.report.BaoCao.HanNop) - new
                                            Date())
                                }}</td>
                            </tr>
                            <tr>
                                <td class="col-2 border">Sửa đổi lần cuối</td>
                                <td style="background: rgb(230, 230, 230);">-</td>
                            </tr>
                            <tr>
                                <td class="col-2 border">Nộp tập tin</td>
                                <td v-if="this.BaiNop.File != null" style="background: rgb(230, 230, 230);">
                                    <FileBaoCao :fileName="this.BaiNop.File" />
                                </td>
                                <td v-else style="background: rgb(230, 230, 230);">
                                    <input type="file" class="form-control border rounded-0" @change="onChangeFile" />
                                </td>
                            </tr>
                            <tr>
                                <td class="col-2 border">Đăng tải bình luận</td>
                                <td style="background: rgb(230, 230, 230);">> Các bình luận(0)</td>
                            </tr>
                        </table>
                        <div class="submit text-center my-5">
                            <button v-if="this.BaiNop.File == null" @click="submitFile"
                                class="btn btn-primary border rounded-0">Nộp
                                Bài</button>
                            <div v-else class="row justify-content-center">
                                <button class="col-2 btn btn-primary border rounded-0">Sửa Bài Nộp</button>
                                <button class="col-2 btn btn-danger border rounded-0" @click="deleteFile">Loại Bỏ Bài
                                    Nộp</button>
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

.col-2 {
    width: 20%;
}
</style>
