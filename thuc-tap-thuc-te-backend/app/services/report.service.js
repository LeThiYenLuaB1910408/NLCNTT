
class Report {
    constructor(client) {
        this.Report = client.db().collection("baocao");
        this.SinhVien = client.db().collection("sinhvien");
    }
    // Dinh nghia cac phuong thuc truy xuat CSDL su dung mongodb API
    extractData(payload) {
        const rp = {
            MSGV: (payload.MSGV),
            BaoCao: [
                {
                    TenBaoCao: payload.BaoCao.TenBaoCao,
                    MoTa: payload.BaoCao.MoTa,
                    TrangThai: payload.BaoCao.TrangThai,
                    HanNop: payload.BaoCao.HanNop,
                    QuyenHienThi: payload.BaoCao.QuyenHienThi,
                    BaiNop: []
                }
            ]
        };

        // remove undefined fields
        Object.keys(rp).forEach(
            (key) => rp[key] === undefined && delete rp[key]
        );
        return rp;
    }

    async createReport(MSGV, payload) {
        const rp = this.extractData(payload);
        const cursor = await this.Report.findOne({
            "MSGV": (MSGV)
        });
        if (cursor == null) {
            const result = await this.Report.insertOne(
                rp
            );
            return result.value;
        } else {
            const result = await this.Report.updateOne(
                { "MSGV": (MSGV) },
                { $push: { BaoCao: rp.BaoCao[0] } }
            )
            return result.value;
        }

    }
    async updateReport(id, payload) {
        let result;
        if (payload.DiemSo != null) {
            result = await this.Report.findOneAndUpdate(
                { "MSGV": (id) },
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
            const sv = await this.SinhVien.findOne({
                MSSV: payload.MSSV
            })
            const nodemailer = require("nodemailer");

            var transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASS,
                },
            });

            await transporter.sendMail({
                from: '"Cuc Lua"',
                to: sv.Email,
                subject: "THÔNG BÁO ĐIỂM BÁO CÁO THỰC TẬP",
                text: "",
                html: "<div style='border: 1px solid black;border-top: 5px solid black;width: fit-content; padding: 10px;' >" +
                    "<p style='font-size: 12px'>ĐÃ CHẤM ĐIỂM</p>" +
                    "<p>BÀI BÁO CÁO THỰC TẬP HÈ <br/><span style='color: red'>Điểm: <span>"+payload.DiemSo+"</span></span></p>" +
                    "</div><p><b>Mọi thắc mắc vui lòng phản hồi về Email này!</b></p>",
            });

        }
        else {
            result = await this.Report.findOneAndUpdate(
                { "MSGV": (id) },
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
        const cursor = await this.Report.findOne({ "MSGV": (id) });
        return cursor;
    }
    async getReport(MSGV, TenBaoCao) {
        let cursor = await this.Report.aggregate([
            {
                $unwind: "$BaoCao"
            }
            , {
                $match: {
                    "MSGV": (MSGV),
                    "BaoCao.TenBaoCao": TenBaoCao
                }

            }
        ]

        );
        cursor = (await cursor.toArray())[0]
        return cursor;
    }
    async uploadFile(MSGV, file, data) {
        const fs = require('fs');
        let folderPath = "../thuc-tap-thuc-te - frontend/public/fileUpload/";
        try {
            
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath);
            }
            folderPath = folderPath + "/" + MSGV
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
                    "MSGV": (MSGV),
                },
                {
                    $push: {
                        'BaoCao.$[element].BaiNop': {
                            MSSV: data.MSSV,
                            File: `/fileUpload/${MSGV}/${data.TenBaoCao}/${data.MSSV}/${file.name}`
                        }
                    }
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
    async deleteFile(MSGV, data) {
        const fs = require('fs');
        fs.unlinkSync('../thuc-tap-thuc-te - frontend/public'+data.File);
        try {
            const result = await this.Report.updateOne(
                {
                    "MSGV": (MSGV),
                },
                {
                    $pull: {
                        'BaoCao.$[element].BaiNop': {
                            MSSV: data.MSSV
                        }
                    }
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

}

module.exports = Report;