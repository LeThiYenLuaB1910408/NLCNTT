const { ObjectId } = require("mongodb");

class Report {
    constructor(client) {
        this.Report = client.db().collection("baocao");
    }
    // Dinh nghia cac phuong thuc truy xuat CSDL su dung mongodb API
    extractData(payload) {
        const rp = {
            MaLopTT: ObjectId(payload.MaLopTT),
            BaoCao:[
                {
                  TenBaoCao: payload.BaoCao.TenBaoCao,
                  MoTa:payload.BaoCao.MoTa,
                  TrangThai:payload.BaoCao.TrangThai,
                  QuyenHienThi:payload.BaoCao.QuyenHienThi,
                  BaiNop:[
                    {
                      MSSV:payload.BaoCao.BaiNop, 
                      File:payload.BaoCao.File
                    }
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

    async createReport(id,payload) {
        const rp = this.extractData(payload);
        const cursor = await this.Report.findOne({
            "MaLopTT": ObjectId(id)
        });
        if(cursor==null){
            const result = await this.Report.insertOne(
                rp
            );
            return result.value;
        }else{
            const result = await this.Report.updateOne(
                { "MaLopTT": ObjectId(id) },
                { $push: { BaoCao: rp.BaoCao[0] } }
            )
            console.log(result);
        }

    }
    
    async findOne(id) {
        const cursor = await this.Report.findOne({"MaLopTT":ObjectId(id)});
        return await cursor;
    }
    async updateFile(MaLop,file,data) {
        file.mv(`./fileUpload/${file.name}`, function (err) {
            if (err) {
                console.log(err)
                return res.status(500).send({ msg: "Error occured" });
            }
            // returing the response with file path and name
        });
        console.log(file);
        const result = await this.Report.findOneAndUpdate(
            {
                "MaLopTT":MaLop,
                "BaoCao.TenBaoCao": data.TenBaoCao
            },
            {
                $set: {
                    "BaoCao.BaiNop.$[element].MSSV": data.MSSV,
                    "BaoCao.BaiNop.$[element].File": file.name,
                }
            },
            {
                arrayFilters: [{ "element.MSSV": data.MSSV }],
                returnDocument: "after"
            }
        );
        console.log(1);
        return result.value;
        // return await cursor;
        // return res.send({name: file.name, path: `/${file.name}`});
    }

}

module.exports = Report;