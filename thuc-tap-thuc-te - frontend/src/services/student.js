import createApiClient from "./api.service";

class SinhVien{
    constructor(baseUrl = "/api"){
        this.api = createApiClient(baseUrl);
    }
    async getAll(){
        return (await this.api.get("/QLSV")).data;
    }
    
    async create(data) {
        return (await this.api.post('/QLSV', data)).data;
    }




}

export default new SinhVien();