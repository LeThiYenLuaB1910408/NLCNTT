const { ObjectId } = require("mongodb");

class QuanLyTaiKhoan {
    constructor(client) {
        this.TaiKhoan = client.db().collection("taikhoan");
        this.SinhVien = client.db().collection("sinhvien");
        this.GiangVien = client.db().collection("giangvien");
        this.CanBo = client.db().collection("canbocongty");

    }
    // Dinh nghia cac phuong thuc truy xuat CSDL su dung mongodb API
    extractAccountData(payload) {
        const tk = {
            TenDangNhap: payload.TenDangNhap,
            MatKhau: payload.MatKhau,
            CapQuyen: payload.CapQuyen
        };

        // remove undefined fields
        Object.keys(tk).forEach(
            (key) => tk[key] === undefined && delete tk[key]
        );
        return tk;
    }

    // async create(payload) {

    //     const contact = this.extractContactData(payload);

    //     const result = await this.Contact.findOneAndUpdate(
    //         contact,
    //         { $set: { favorite: contact.favorite === true } },
    //         { returnDocument: "after", upsert: true }
    //     );
    //     return result.value;
    // }

    async find(filter) {
        const cursor = await this.TaiKhoan.find(filter);
        return await cursor.toArray();
    }

    async findByName(data) {
        const acc = await this.TaiKhoan.findOne({
            TenDangNhap: { $regex: new RegExp(data.TenDangNhap), $options: "i" },
            MatKhau: data.MatKhau
        })
        var user={};
        switch (acc.CapQuyen) {
            case "0":
                user = await this.SinhVien.findOne({"TenDangNhap": acc.TenDangNhap})
                break;
            case "1","2":
                user = await this.GiangVien.findOne({"TenDangNhap": acc.TenDangNhap})
                break;
            case "3":
                user = await this.CanBo.findOne({"TenDangNhap": acc.TenDangNhap})
                break;

            default:
                break;
        }
        return {...user,CapQuyen: acc.CapQuyen, tenDangNhap: acc.TenDangNhap};
    }

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

module.exports = QuanLyTaiKhoan;