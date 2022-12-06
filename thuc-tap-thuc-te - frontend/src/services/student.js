import createApiClient from "./api.service";

class SinhVien{
    constructor(baseUrl = "/api/student"){
        this.api = createApiClient(baseUrl);
    }
    async getAll(){
        return (await this.api.get("/QLSV")).data;
    }
    
    async create(data) {
        return (await this.api.post('/QLSV', data)).data;
    }

    async deleteSV(id){
        return (await this.api.delete(`/QLSV/${id}`)).data;
    }
    async updateSV(id,data){
        return (await this.api.put(`/QLSV/${id}`,data)).data;
    }


}

export default new SinhVien();