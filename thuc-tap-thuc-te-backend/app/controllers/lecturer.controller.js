const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const QuanLyTaiKhoan = require("../services/account.service");
const Lecturer = require("../services/lecturer.service");
const CanBo = require("../services/canbo.service");


exports.createTeacher = async (req, res, next) => {
    try {
        const quanLyGiangVien = new Lecturer(MongoDB.client);
        const quanLyTaiKhoan = new QuanLyTaiKhoan(MongoDB.client);
        const gv = await quanLyGiangVien.createTeacher(req.body);
        await quanLyTaiKhoan.create(req.body);
        return res.send({ gv });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the teacher")
        );
    }
};

exports.createCB = async (req, res, next) => {
    try {
        const quanLyCanBo = new CanBo(MongoDB.client);
        const quanLyTaiKhoan = new QuanLyTaiKhoan(MongoDB.client);
        const cb = await quanLyCanBo.createCB(req.body);
        await quanLyTaiKhoan.create(req.body);
        return res.send({ cb });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating CB")
        );
    }
};

exports.getAllLecturer = async (req, res, next) => {
    try {
        const lecturer = new Lecturer(MongoDB.client);
        let documents = await lecturer.find({});
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error getAllLecturer")
        );
    }
};

exports.getAllCB = async (req, res, next) => {
    try {
        const canbo = new CanBo(MongoDB.client);
        let documents = await canbo.find({});
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error getAllCB")
        );
    }
};
exports.deleteCB = async (req, res, next) => {
    try {
        const quanLyCanBo = new CanBo(MongoDB.client);
        const document = await quanLyCanBo.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "CB not found"));
        }
        return res.send({ message: "Xóa Cán Bộ Thành Công!!!" });
    } catch (error) {
        return next(
            new ApiError(500, `Could not delete CB`)
        );
    }
};
exports.deleteGV = async (req, res, next) => {
    try {
        const quanLyGiangVien = new Lecturer(MongoDB.client);
        const quanLyTaiKhoan = new QuanLyTaiKhoan(MongoDB.client);
        const document = await quanLyGiangVien.delete(req.params.id);
        await quanLyTaiKhoan.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Lecturer not found"));
        }
        return res.send({ message: "Xóa Giảng Viên Thành Công!!!" });
    } catch (error) {
        return next(
            new ApiError(500, `Could not delete Lecturer`)
        );
    }
};
exports.updateCB = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try {
        const quanLyCanBo = new CanBo(MongoDB.client);
        const quanLyTaiKhoan = new QuanLyTaiKhoan(MongoDB.client);
        const document = await quanLyCanBo.update(req.params.id, req.body);
        await quanLyTaiKhoan.create(req.body);
        if (!document) {
            return next(new ApiError(404, "CB not found"));
        }
        return res.send({ message: "CB was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating CB`)
        );
    }
};
exports.updateGV = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const quanLyGiangVien = new Lecturer(MongoDB.client);
        const document = await quanLyGiangVien.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Lecturer not found"));
        }
        return res.send({ message: "Lecturer was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating Lecturer`)
        );
    }
};
