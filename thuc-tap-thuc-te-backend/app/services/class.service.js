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
            SinhVien: payload.MSSV ?? [],
        };

        // remove undefined fields
        Object.keys(lh).forEach(
            (key) => lh[key] === undefined && delete lh[key]
        );
        return lh;
    }

    async create(payload) {

        const lh = this.extractClassData(payload);
        console.log(lh);
        const result = await this.LopHoc.insertOne(
            lh
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.LopHoc.find(filter);
        return await cursor.toArray();
    }

    // async findByName(name) {
    //     return await this.find({
    //         name: { $regex: new RegExp(name), $options: "i" },
    //     });
    // }

    async findById(id) {
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
            {
                $lookup: {
                    from: 'giangvien',
                    localField: 'SinhVien.MSGV',
                    foreignField: '_id',
                    as: 'GiangVien'
                }
            },
            { '$unwind': '$GiangVien' }
        ]
        );
        const results = await result.toArray();
        console.log(results);
        return results.filter(e => e._id == id);
    }
    async isRegistered(id) {
        return await this.LopHoc.findOne({
            "SinhVien.MSSV": id,
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
            {
                $lookup: {
                    from: 'giangvien',
                    localField: 'SinhVien.MSGV',
                    foreignField: '_id',
                    as: 'GiangVien'
                }
            },
            { '$unwind': '$GiangVien' }
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

module.exports = QuanLyLopHoc;