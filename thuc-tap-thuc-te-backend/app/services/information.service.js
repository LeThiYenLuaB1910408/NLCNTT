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
            MaLopTT: ObjectId(payload.MaLopTT),
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
        console.log(payload);
        const congTy = this.extractCongTyData(payload.CongTy);
        const canBo = this.extractCanBoData({ ...payload.CanBo, TenCongTy: payload.CongTy.TenCongTy });
        const resultCongTy = await this.CongTy.insertOne(
            congTy
        );
        const resultCanBo = await this.CanBo.insertOne(
            canBo
        );
        const thongTin = this.extractThongTinData(payload.ThongTin);
        const resultThongTin = await this.ThongTin.insertOne(
            thongTin
        );
        
        const result = await this.Lop.updateOne(
            { _id: ObjectId(payload.classCurrent._id) },
            { $push: { SinhVien: {MSSV:thongTin.MSSV, MSGV:"", MSCB:resultCanBo.insertedId} } }
         )
         console.log(result);

        return { resultCanBo, resultCongTy, resultThongTin ,result};
    }


}

module.exports = Information;