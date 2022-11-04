import createApiClient from "./api.service";

class TaiKhoan{
    constructor(baseUrl = "/api"){
        this.api = createApiClient(baseUrl);
    }
    async getAll(){
        return (await this.api.get("/QLTK")).data;
    }
    async login(payload){
        return (await this.api.post("/QLTK", payload)).data;
    }




}

export default new TaiKhoan();