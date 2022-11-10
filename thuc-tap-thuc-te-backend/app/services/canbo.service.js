const { ObjectId } = require("mongodb");

class CanBo {
    constructor(client) {
        this.CanBo = client.db().collection("canbocongty");
    }
    // Dinh nghia cac phuong thuc truy xuat CSDL su dung mongodb API
    extractCBData(payload) {
        const cb = {
            HoTen: payload.HoTen,
            Sdt: payload.Sdt,
            Email: payload.Email,
            TenDangNhap: payload.TenDangNhap,
            TenCongTy: payload.TenCongTy
        };

        // remove undefined fields
        Object.keys(cb).forEach(
            (key) => cb[key] === undefined && delete cb[key]
        );
        return cb;
    }

    async createCB(payload) {
        const teacher = this.extractCBData(payload);
        const result = await this.CanBo.insertOne(
            teacher
        );
        return result.value;
    }
    async find(filter) {
        const cursor = await this.CanBo.find(filter);
        return await cursor.toArray();
    }
    async delete(id) {
        const result = await this.CanBo.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });

        return result.value;
    }

    async update(id,payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? ObjectId(id) : null
        };
        const update = this.extractCBData(payload)
        const result = await this.CanBo.findOneAndUpdate(
            filter,
            {
                $set: update
            },
            {
                returnDocument: "after"
            }
        );
        return result.value;


    }

}

module.exports = CanBo;