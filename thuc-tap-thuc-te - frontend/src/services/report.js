import createApiClient from "./api.service";

class Report {
    constructor(baseUrl = "/api/report") {
        this.api = createApiClient(baseUrl);
    }
    async getAll(id) {
        return (await this.api.get(`/report/${id}`)).data;
    }
    async getReport(MaLop, TenBaoCao) {
        return (await this.api.get(`/report/${MaLop}/${TenBaoCao}`)).data;
    }

    // async getFile(linkUrl) {
    //     return (await this.api.get(`/getfile/`, linkUrl)).data;
    // }

    async create(id, data) {
        return (await this.api.post(`/report/${id}`, data)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/report/${id}`, data)).data;
    }
    async submitFile(lop, data) {
        return (await this.api.post(`/reports/${lop}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })).data;
    }
    async deleteFile(MaLopTT, data) {
        return (await this.api.put(`/reports/${MaLopTT}`, data)).data;
    }






}

export default new Report();