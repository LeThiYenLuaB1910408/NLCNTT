const { ObjectId } = require("mongodb");

class QuanLySinhVien {
    constructor(client) {
        this.SinhVien = client.db().collection("sinhvien");

    }
    // Dinh nghia cac phuong thuc truy xuat CSDL su dung mongodb API
    extractStudentData(payload) {
        const sv = {
            _id: payload._id,
            MSSV: payload._id,
            HoTen: payload.HoTen,
            Sdt: payload.Sdt,
            Email: payload.Email,
            MaLop: payload.MaLop,
            ChuyenNganh: payload.ChuyenNganh,
            TenDangNhap: payload._id,
        };

        // remove undefined fields
        Object.keys(sv).forEach(
            (key) => sv[key] === undefined && delete sv[key]
        );
        return sv;
    }

    async createStudent(payload) {
        const student = this.extractStudentData(payload);
        const result = await this.SinhVien.insertOne(
            student
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.SinhVien.find(filter);
        return await cursor.toArray();
    }


    async delete(id) {
        const result = await this.SinhVien.findOneAndDelete({
            _id: id,
        });

        return result.value;
    }

    async update(id, payload) {
        const filter = {
            _id: id
        };

        const result = await this.SinhVien.findOneAndUpdate(
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

module.exports = QuanLySinhVien;