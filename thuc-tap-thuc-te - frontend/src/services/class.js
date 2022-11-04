import createApiClient from "./api.service";

class LopHoc{
    constructor(baseUrl = "/api"){
        this.api = createApiClient(baseUrl);
    }
    async getAll(){
        return (await this.api.get("/QLLH")).data;
    }
    async getClass(id){
        return (await this.api.get(`/courses/${id}`)).data;
    }
    async RegisterClass(data){
        return (await this.api.post("/register", data)).data;
    }
    async isRegistered(id){
        return (await this.api.get(`/register/${id}`)).data;
    }
    async create(data) {
        return (await this.api.post('/QLLH', data)).data;
    }
    async update(data) {
        return (await this.api.put('/QLLH', data)).data;
    }




}

export default new LopHoc();