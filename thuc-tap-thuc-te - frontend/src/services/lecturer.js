import createApiClient from "./api.service";

class GiangVien {
    constructor(baseUrl = "/api/lecturer") {
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
    async addCB(data) {
        return (await this.api.post('/QLCB', data)).data;
    }
    
    async deleteCB(id){
        return (await this.api.delete(`/QLCB/${id}`)).data;
    }
    async updateCB(id,data){
        return (await this.api.put(`/QLCB/${id}`,data)).data;
    }
    async deleteGV(id){
        return (await this.api.delete(`/QLGV/${id}`)).data;
    }
    async updateGV(id,data){
        return (await this.api.put(`/QLGV/${id}`,data)).data;
    }
}

export default new GiangVien();