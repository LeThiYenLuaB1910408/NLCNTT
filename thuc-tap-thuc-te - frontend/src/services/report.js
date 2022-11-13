import createApiClient from "./api.service";

class Report {
    constructor(baseUrl = "/api") {
        this.api = createApiClient(baseUrl);
    }
    async getAll(id) {
        return (await this.api.get(`/report/${id}`)).data;
    }
    async getFile(linkUrl) {
        return (await this.api.post(`/getfile/`, linkUrl,
            {
                responseType: 'blob'
            })).data;
    }
    // },{responseType:'blob'}/

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






}

export default new Report();