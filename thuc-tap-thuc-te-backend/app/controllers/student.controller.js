const QuanLyTaiKhoan = require("../services/account.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const QuanLySinhVien = require("../services/student.service");


exports.createStudent = async (req, res, next) => {
    try {
        const quanLySinhVien = new QuanLySinhVien(MongoDB.client);
        const quanLyTaiKhoan = new QuanLyTaiKhoan(MongoDB.client);
        const sv = await quanLySinhVien.createStudent(req.body);
        const tk = await quanLyTaiKhoan.create(req.body);
        return res.send({ message: 'Student created successfully' });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while add the student")
        );
    }
};

exports.findAllStudent = async (req, res, next) => {
    try {
        const quanLySinhVien = new QuanLySinhVien(MongoDB.client);
        let documents = await quanLySinhVien.find({});
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error while findAllStudent")
        );
    }
};
exports.deleteSV = async (req, res, next) => {
    try {
        const quanLySinhVien = new QuanLySinhVien(MongoDB.client);
        const quanLyTaiKhoan = new QuanLyTaiKhoan(MongoDB.client);
        const document = await quanLySinhVien.delete(req.params.id);
        await quanLyTaiKhoan.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Student not found"));
        }
        return res.send({ message: "Xóa Sinh Viên Thành Công!!!" });
    } catch (error) {
        return next(
            new ApiError(500, `Could not delete student`)
        );
    }
};
exports.updateSV = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const quanLySinhVien = new QuanLySinhVien(MongoDB.client);
        const document = await quanLySinhVien.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Student not found"));
        }
        return res.send({ message: "Student was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating student`)
        );
    }
};

