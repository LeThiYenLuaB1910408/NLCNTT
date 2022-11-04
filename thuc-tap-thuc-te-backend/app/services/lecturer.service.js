const { ObjectId } = require("mongodb");

class Lecturer {
    constructor(client) {
        this.GiangVien = client.db().collection("giangvien");
    }
    // Dinh nghia cac phuong thuc truy xuat CSDL su dung mongodb API

    async find(filter) {
        const cursor = await this.GiangVien.find(filter);
        return await cursor.toArray();
    }


}

module.exports = Lecturer;