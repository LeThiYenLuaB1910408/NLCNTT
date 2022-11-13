const { ObjectId } = require("mongodb");

class Lecturer {
    constructor(client) {
        this.GiangVien = client.db().collection("giangvien");
    }
    // Dinh nghia cac phuong thuc truy xuat CSDL su dung mongodb API
    extractTeacherData(payload) {
        const MaLop = payload.MaLop.split(/[^a-zA-Z0-9]+\s/);
        const gv = {
            _id: payload._id,
            MSGV: payload._id,
            HoTen: payload.HoTen,
            Sdt: payload.Sdt,
            MaLop: MaLop,
            BoMon: payload.BoMon,
            TenDangNhap: payload._id
        };
// remove undefined fields
Object.keys(gv).forEach(
    (key) => gv[key] === undefined && delete gv[key]
    );
        return gv;
    }

    async createTeacher(payload) {
        const teacher = this.extractTeacherData(payload);
        const result = await this.GiangVien.insertOne(
            teacher
        );
        return result.value;
    }
    async find(filter) {
        const cursor = await this.GiangVien.find(filter);
        return await cursor.toArray();
    }

    async delete(id) {
        const result = await this.GiangVien.findOneAndDelete({
            _id: id,
        });

        return result.value;
    }

    async update(id, payload) {
        const filter = {
            _id: id
        };

        const result = await this.GiangVien.findOneAndUpdate(
            filter,
            {
                $set: payload
            },
            {
                returnDocument: "after"
            }
        );
        return result.value;


    }
}

module.exports = Lecturer;