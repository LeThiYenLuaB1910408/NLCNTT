const { ObjectId } = require("mongodb");

class QuanLyLopHoc {
    constructor(client) {
        this.LopHoc = client.db().collection("lopthuctap");
    }
    // Dinh nghia cac phuong thuc truy xuat CSDL su dung mongodb API
    extractClassData(payload) {
        const lh = {
            MaLopTT: payload.MaLopTT,
            HocKi: payload.HocKi,
            NienKhoa: payload.NienKhoa,
            ChuyenNganh: payload.ChuyenNganh,
            SinhVien: [],
        };

        Object.keys(lh).forEach(
            (key) => lh[key] === undefined && delete lh[key]
        );
        return lh;
    }

    async createClass(payload) {

        const lh = this.extractClassData(payload);
        const result = await this.LopHoc.insertOne(
            lh
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.LopHoc.find(filter);
        return await cursor.toArray();
    }

    async findById(id) {
        let result = await this.LopHoc.aggregate([
            { '$unwind': '$SinhVien' },
            {
                $lookup: {
                    from: 'sinhvien',
                    localField: 'SinhVien.MSSV',
                    foreignField: '_id',
                    as: 'SinhVienLop'
                }
            },
            { '$unwind': '$SinhVienLop' },

            {
                $lookup: {
                    from: 'canbocongty',
                    localField: 'SinhVien.MSCB',
                    foreignField: '_id',
                    as: 'CanBo'
                }
            },
            { '$unwind': '$CanBo' },
            {
                $lookup: {
                    from: 'giangvien',
                    localField: 'SinhVien.MSGV',
                    foreignField: '_id',
                    as: 'GiangVien'
                }
            },
        ]
        );
        result = await result.toArray();
        return result.filter(e => e._id == id);
    }
    async isRegistered(MaLopTT, MSSV) {
        return await this.LopHoc.findOne({
            "_id": ObjectId(MaLopTT),
            "SinhVien.MSSV": MSSV,
        });
    }
    async getAllStudent() {
        const result = await this.LopHoc.aggregate([
            { '$unwind': '$SinhVien' },
            {
                $lookup: {
                    from: 'sinhvien',
                    localField: 'SinhVien.MSSV',
                    foreignField: '_id',
                    as: 'SinhVienLop'
                }
            },
            { '$unwind': '$SinhVienLop' },

            {
                $lookup: {
                    from: 'canbocongty',
                    localField: 'SinhVien.MSCB',
                    foreignField: '_id',
                    as: 'CanBo'
                }
            },
            { '$unwind': '$CanBo' },

        ]
        );
        return await result.toArray();
    }

    async update(payload) {
        const filter = {
            _id: ObjectId.isValid(payload._id) ? ObjectId(payload._id) : null

        };
        if (payload.MSGV) {
            const result = await this.LopHoc.findOneAndUpdate(
                filter,
                {
                    $set: {
                        "SinhVien.$[element].MSGV": payload.MSGV
                    }
                },
                {
                    arrayFilters: [{ "element.MSSV": payload.MSSV }],
                    returnDocument: "after"
                }
            );
            return result.value;
        }
        else {
            const result = await this.LopHoc.findOneAndUpdate(
                filter,
                {
                    $set: {
                        "SinhVien.$[element].DiemSo": payload.DiemSo
                    }
                },
                {
                    arrayFilters: [{ "element.MSSV": payload.MSSV }],
                    returnDocument: "after"
                }
            );
            return result.value;
        }
    }

}

module.exports = QuanLyLopHoc;