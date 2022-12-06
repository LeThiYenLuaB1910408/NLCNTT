const { ObjectId } = require("mongodb");

class Information {
    constructor(client) {
        this.CanBo = client.db().collection("canbocongty");
        this.CongTy = client.db().collection("congty");
        this.ThongTin = client.db().collection("thongtinthuctap");
        this.Lop = client.db().collection("lopthuctap");
    }
    // Dinh nghia cac phuong thuc truy xuat CSDL su dung mongodb API
    extractCanBoData(payload) {
        const canbo = {
            HoTen: payload.HoTen,
            Sdt: payload.Sdt,
            Email: payload.Email,
            TenDangNhap: payload.TenDangNhap ?? null,
            TenCongTy: payload.TenCongTy
        };
        return canbo;
    }
    extractCongTyData(payload) {
        const congty = {
            TenCongTy: payload.TenCongTy,
            DiaDiem: payload.DiaDiem,
            Sdt: payload.Sdt,
            Email: payload.Email
        };
        return congty;
    }
    extractThongTinData(payload) {
        const thongtin = {
            MSSV: payload.MSSV,
            NoiDung: {
                NoiDungCV: payload.NoiDung.NoiDungCV,
                MayTinh: payload.NoiDung.MayTinh,
                PhongLamViec: payload.NoiDung.PhongLamViec,
                HoTro: payload.NoiDung.HoTro ?? null
            }
        };
        return thongtin;
    }

    async registerClass(payload) {
        const congTy = this.extractCongTyData(payload.CongTy);
        const canBo = this.extractCanBoData({ ...payload.CanBo, TenCongTy: payload.CongTy.TenCongTy });
        const thongTin = this.extractThongTinData(payload.ThongTin);
        try {
            const resultCongTy = await this.CongTy.findOne({
                'Email': congTy.Email
            });
            if (resultCongTy == null) {
                this.CongTy.insertOne(
                    congTy
                );
            }
            let resultCanBo = await this.CanBo.findOne({
                'Email': canBo.Email
            });
            if (resultCanBo == null) {
                resultCanBo = await this.CanBo.insertOne(
                    canBo
                );
            }
             this.ThongTin.insertOne(
                thongTin
            );
    
            let result = await this.Lop.updateOne(
                { _id: ObjectId(payload.classCurrent._id) },
                { $push: { SinhVien: { MSSV: thongTin.MSSV, MSGV: '', MSCB: resultCanBo.insertedId ?? resultCanBo._id, DiemSo: '' } } }
            )
    
            return {message: "Đăng ký thành công"};
        } catch (error) {
            console.log(error);
        }
       
    }
    async getInfor(MSSV) {
        return await this.ThongTin.findOne({
            'MSSV': MSSV

        })

    }
}

module.exports = Information;