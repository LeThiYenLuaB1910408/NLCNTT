const QuanLyTaiKhoan = require("../services/account.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");


exports.findAllAccount = async (req, res, next) => {
    try {
        const quanLyTaiKhoan = new QuanLyTaiKhoan(MongoDB.client);
        let documents = await quanLyTaiKhoan.find({});
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error while findAllAccount")
        );
    }
};

exports.findOneAccount = async (req, res, next) => {
    try {
        const quanLyTaiKhoan = new QuanLyTaiKhoan(MongoDB.client);
        let documents = await quanLyTaiKhoan.findByAccount(req.body);
        if (documents != null) {
            return res.send(documents);
        } else {
            return res.send({ error: true });
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error while findOneAccount")
        );
    }
};
