<script>
import Report from '@/services/report'
export default {
    props: {
        fileName: { type: String, default: "" }
    },
    methods: {
        async downloadFile(url) {
            const res = await Report.getFile({ url: url });
            var fileURL = window.URL.createObjectURL(new Blob([res]));
            var fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', url.slice(url.lastIndexOf("/") + 1));
            document.body.appendChild(fileLink);
            fileLink.click();
        }
    }
}
</script>
<template>

    <i v-if="fileName.includes('pdf')" class="fa-regular text-danger fa-file-pdf"></i>
    <i v-else-if="fileName.includes('docx')" class="fa-regular text-primary fa-file-word"></i>
    <i v-else-if="fileName.includes('xlsx')" class="fa-regular text-success fa-file-excel"></i>
    <i v-else-if="fileName.includes('jpg')" class="fa-regular text-success fa-file-image"></i>
    <i v-else-if="fileName.includes('pptx')" class="fa-regular fa-file-powerpoint" style="color:orange"></i>
    <i v-else class="fa-regular  fa-file-lines"></i>
    <a class="ms-2" style="cursor:pointer" @click="downloadFile(fileName)">
        {{ fileName.slice(fileName.lastIndexOf("/") + 1) }}
    </a>

</template>