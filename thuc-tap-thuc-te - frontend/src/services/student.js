import createApiClient from "./api.service";

class SinhVien{
    constructor(baseUrl = "/api"){
        this.api = createApiClient(baseUrl);
    }
    async getAll(){
        return (await this.api.get("/QLSV")).data;
    }
    async getAllStudent(){
        return (await this.api.get("/allStudent")).data;
    }




}

export default new SinhVien();