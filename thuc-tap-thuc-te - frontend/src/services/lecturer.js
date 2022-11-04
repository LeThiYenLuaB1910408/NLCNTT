import createApiClient from "./api.service";

class GiangVien {
    constructor(baseUrl = "/api") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/allLecturer")).data;
    }
}

export default new GiangVien();