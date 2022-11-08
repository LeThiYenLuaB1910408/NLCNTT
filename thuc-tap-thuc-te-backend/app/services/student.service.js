const { ObjectId } = require("mongodb");

class QuanLySinhVien {
    constructor(client) {
        this.SinhVien = client.db().collection("sinhvien");

    }
    // Dinh nghia cac phuong thuc truy xuat CSDL su dung mongodb API
    extractStudentData(payload) {
        const sv = {
            _id: payload._id,
            HoTen: payload.HoTen,
            Sdt: payload.Sdt,
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




    // async findByName(name) {
    //     return await this.find({
    //         name: { $regex: new RegExp(name), $options: "i" },
    //     });
    // }

    // async findById(id) {
    //     return await this.Contact.findOne({
    //         _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    //     });
    // }

    // async update(id, payload) {
    //     const filter = {
    //         _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    //     };
    //     const update = this.extractContactData(payload);
    //     const result = await this.Contact.findOneAndUpdate(
    //         filter,
    //         { $set: update },
    //         { returnDocument: "after" }
    //     );
    //     return result.value;
    // }

    // async delete(id) {
    //     const result = await this.Contact.findOneAndDelete({
    //         _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    //     });

    //     return result.value;
    // }
    // async findFavorite() {
    //     return await this.find({ favorite: true });
    // }
    // async deleteAll() {
    //     const result = await this.Contact.deleteMany();
    //     return result.deletedCount;
    // }
}

module.exports = QuanLySinhVien;