import createApiClient from "./api.service";

class GiangVien {
    constructor(baseUrl = "/api") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/allLecturer")).data;
    }
    
    async create(data) {
        return (await this.api.post('/QLGV', data)).data;
    }
    async getAllCB() {
        return (await this.api.get("/QLCB")).data;
    }
    
    async deleteCB(id){
        return (await this.api.delete(`/QLCB/${id}`)).data;
    }
    async addCB(data) {
        return (await this.api.post('/QLCB', data)).data;
    }
    async updateCB(id,data){
        return (await this.api.put(`/QLCB/${id}`,data)).data;
    }
    // async createAccountCB(data) {
    //     return (await this.api.post('/QLCB', data)).data;
    // }
}

export default new GiangVien();