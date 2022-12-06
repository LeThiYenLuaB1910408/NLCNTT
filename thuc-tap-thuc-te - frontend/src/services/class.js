import createApiClient from "./api.service";

class LopHoc{
    constructor(baseUrl = "/api/class"){
        this.api = createApiClient(baseUrl);
    }
    async getAll(){
        return (await this.api.get("/QLLH")).data;
    }
    async create(data) {
        return (await this.api.post('/QLLH', data)).data;
    }
    async update(data) {
        return (await this.api.put('/QLLH', data)).data;
    }
    async getStudentClass(id){
        return (await this.api.get(`/courses/${id}`)).data;
    }
    async RegisterClass(data){
        return (await this.api.post("/register", data)).data;
    }
    async isRegistered(MaLopTT,MSSV){
        return (await this.api.get(`/register/${MaLopTT}/${MSSV}`)).data;
    }
    async getAllStudent(){
        return (await this.api.get("/allStudent")).data;
    }
    async getInfor(MSSV){
        return (await this.api.get(`/infor/${MSSV}`)).data;
    }


 
} 

export default new LopHoc();