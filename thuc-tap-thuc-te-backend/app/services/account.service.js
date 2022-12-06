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
            _id: payload.TenDangNhap??payload._id,
            TenDangNhap: payload.TenDangNhap??payload._id,
            MatKhau: payload.TenDangNhap??payload._id,
            CapQuyen: payload.CapQuyen??"0"
        };
        // remove undefined fields
        Object.keys(tk).forEach(
            (key) => tk[key] === undefined && delete tk[key]
        );
        return tk;
    }

    async create(payload) {
        const tk = this.extractAccountData(payload);
        const result = await this.TaiKhoan.insertOne(
            tk
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.TaiKhoan.find(filter).sort({'CapQuyen':1});
        return await cursor.toArray();
    }

    async findByAccount(data) {
        const acc = await this.TaiKhoan.findOne({
            TenDangNhap: data.TenDangNhap,
            MatKhau: data.MatKhau
        })
        var user={};
        if(acc!=null){
            switch (acc.CapQuyen) {
                case "0":
                    user = await this.SinhVien.findOne({"TenDangNhap": acc.TenDangNhap})
                    break;
                case "1":
                    user = await this.GiangVien.findOne({"TenDangNhap": acc.TenDangNhap})
                    break;
                case "2":
                    user = await this.GiangVien.findOne({"TenDangNhap": acc.TenDangNhap})
                    break;
                case "3":
                    user = await this.CanBo.findOne({"TenDangNhap": acc.TenDangNhap})
                    break;
    
                default:
                    break;
            }
            return {...user,CapQuyen: acc.CapQuyen, TenDangNhap: acc.TenDangNhap};
        }
        return null;
    }

    async delete(id) {
        const result = await this.TaiKhoan.findOneAndDelete({
            _id: id,
        });

        return result.value;
    }
}

module.exports = QuanLyTaiKhoan;