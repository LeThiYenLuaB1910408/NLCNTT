const { ObjectId } = require("mongodb");
const { Blob } = require('buffer') ;

class Report {
    constructor(client) {
        this.Report = client.db().collection("baocao");
    }
    // Dinh nghia cac phuong thuc truy xuat CSDL su dung mongodb API
    extractData(payload) {
        const rp = {
            MaLopTT: ObjectId(payload.MaLopTT),
            BaoCao: [
                {
                    TenBaoCao: payload.BaoCao.TenBaoCao,
                    MoTa: payload.BaoCao.MoTa,
                    TrangThai: payload.BaoCao.TrangThai,
                    QuyenHienThi: payload.BaoCao.QuyenHienThi,
                    BaiNop: [

                    ]
                }
            ]
        };

        // remove undefined fields
        Object.keys(rp).forEach(
            (key) => rp[key] === undefined && delete rp[key]
        );
        return rp;
    }

    async createReport(id, payload) {
        const rp = this.extractData(payload);
        const cursor = await this.Report.findOne({
            "MaLopTT": ObjectId(id)
        });
        if (cursor == null) {
            const result = await this.Report.insertOne(
                rp
            );
            return result.value;
        } else {
            const result = await this.Report.updateOne(
                { "MaLopTT": ObjectId(id) },
                { $push: { BaoCao: rp.BaoCao[0] } }
            )
        }

    }
    async updateReport(id, payload) {
        let result;
        if (payload.DiemSo != null) {
            result = await this.Report.findOneAndUpdate(
                { "MaLopTT": ObjectId(id) },
                {
                    $set: {
                        'BaoCao.$[element].BaiNop.$[elem].DiemSo': payload.DiemSo
                    }
                },
                {
                    arrayFilters: [
                        { "element.TenBaoCao": payload.TenBaoCao },
                        { 'elem.MSSV': payload.MSSV }
                    ],
                    returnDocument: "after"
                }
            )
        }
        else {
            result = await this.Report.findOneAndUpdate(
                { "MaLopTT": ObjectId(id) },
                {
                    $set: {
                        'BaoCao.$[element]': payload
                    }
                },
                {
                    arrayFilters: [
                        { "element.TenBaoCao": payload.TenBaoCao },
                    ],
                    returnDocument: "after"
                }
            )
        }
        return result.value;

    }

    async findOne(id) {
        const cursor = await this.Report.findOne({ "MaLopTT": ObjectId(id) });
        return await cursor;
    }
    async updateFile(MaLop, file, data) {
        const fs = require('fs');
        let folderPath = "./fileUpload/" + MaLop;
        try {
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath);
            }
            folderPath = folderPath + "/" + data.TenBaoCao
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath);
            }
            folderPath = folderPath + "/" + data.MSSV
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath);
            }
        } catch (err) {
            console.error(err);
        }
        file.mv(`${folderPath}/${file.name}`, function (err) {
            if (err) {
                console.log(err)
                return res.status(500).send({ msg: "Error occured" });
            }
        });
        try {
            const result = await this.Report.updateOne(
                {
                    "MaLopTT": ObjectId(MaLop),
                },
                {
                    $push: {
                        'BaoCao.$[element].BaiNop': {
                            MSSV: data.MSSV,
                            File: `${folderPath}/${file.name}`
                        }
                    }
                    // $set: {
                    //     "BaoCao.BaiNop.$[element].MSSV": data.MSSV,
                    //     "BaoCao.BaiNop.$[element].File": file.name,
                    // }
                },
                {
                    arrayFilters: [{ "element.TenBaoCao": data.TenBaoCao }],
                    returnDocument: "after"
                }
            );
            return result.value;
        } catch (error) {
            console.log(error);
        }

    }
    async getFile(payload) {

        

    }

}

module.exports = Report;