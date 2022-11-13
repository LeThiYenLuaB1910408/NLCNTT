<script>
export default {
    props: {
        reports: { type: Array, default: [] },
        MSSV: {type: String, default:""}
    },
    emits: ["submit:report"],
    data() {
        return {
            selected: null,
            selectedFile: ""
        }
    },
    methods: {
        onChangeFile(e) {
            const selectedFile = e.target.files[0];
            this.selectedFile = selectedFile;
        },
        submitFile() {
            this.$emit("submit:report", this.selectedFile, this.selected.TenBaoCao);
        }
    }
}
</script>
<template>
    <div v-for="(e, i) in this.reports" class="row">
        <div v-if="e.TrangThai=='true'" class="nop-bao-cao col-md-9 mb-5">
            <i class="fa-solid fa-file me-2"></i>
            <router-link to="/submit" class="text-decoration-none" 
                >{{ e.TenBaoCao }}</router-link>
            <!-- <a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#exampleModal"
                @click="this.selected = e">{{ e.TenBaoCao }}</a> -->
            <p>{{ e.MoTa }}</p>
            <div class="ms-4" v-for="(e, i) in e.BaiNop.filter(e => e.MSSV == this.MSSV)">
                <i v-if="e.File.slice(e.File.lastIndexOf('.') + 1) == 'pdf'"
                    class="fa-regular text-danger fa-file-pdf"></i>
                <i v-else-if="e.File.slice(e.File.lastIndexOf('.') + 1) == 'docx'"
                    class="fa-regular text-primary fa-file-word"></i>
                <i v-else-if="e.File.slice(e.File.lastIndexOf('.') + 1) == 'xlsx'"
                    class="fa-regular text-success fa-file-excel"></i>
                <i v-else-if="e.File.slice(e.File.lastIndexOf('.') + 1) == 'jpg'"
                    class="fa-regular text-success fa-file-image"></i>
                <i v-else-if="e.File.slice(e.File.lastIndexOf('.') + 1) == 'pptx'" class="fa-regular fa-file-powerpoint"
                    style="color:orange"></i>
                <i v-else class="fa-regular  fa-file-lines"></i>
                <a href="#" class="ms-2">
                    {{ e.File.slice(e.File.lastIndexOf("/") + 1) }}
                </a>
            </div>
        </div>
    </div>
    <div class="modal fade hide" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" v-if="this.selected != null">
                    <div class="container py-4 ms-0">
                        <div class="header text-center">
                            <h5>THÔNG TIN GIAO VIỆC</h5>
                        </div>
                        <div class="mb-3 mt-3">
                            <label for="lh" class="form-label">Mô tả công việc:</label>
                            <input type="text" class="form-control border rounded-0" v-model="this.selected.MoTa" />
                        </div>
                        <div class="mb-3 mt-3">
                            <label for="lh" class="form-label">File giao việc chi tiết:</label>
                            <input type="file" class="form-control border rounded-0" @change="onChangeFile" />
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="submitFile">Xác
                        nhận</button>
                </div>
            </div>
        </div>
    </div>
</template>