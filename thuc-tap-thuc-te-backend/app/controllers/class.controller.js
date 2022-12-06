const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const QuanLyLopHoc = require("../services/class.service");
const Information = require("../services/information.service");



exports.createClass = async (req, res, next) => {
    try {
        const quanLyLopHoc = new QuanLyLopHoc(MongoDB.client);
        const document = await quanLyLopHoc.createClass(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the class")
        );
    }
};

exports.getAllStudent = async (req, res, next) => {
    try {
        const quanLyLopHoc = new QuanLyLopHoc(MongoDB.client);
        let documents = await quanLyLopHoc.getAllStudent();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error getAllStudent")
        );
    }
};
exports.findAllClass = async (req, res, next) => {
    try {
        const quanLyLopHoc = new QuanLyLopHoc(MongoDB.client);
        let documents = await quanLyLopHoc.find({});
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error get all class")
        );
    }
};
exports.findOneClass = async (req, res, next) => {
    try {
        const quanLyLopHoc = new QuanLyLopHoc(MongoDB.client);
        const document = await quanLyLopHoc.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Class not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving class with id=${req.params.id}`)
        );
    }
};

exports.registerClass = async (req, res, next) => {
    try {
        const information = new Information(MongoDB.client);
        const document = await information.registerClass(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while register class")
        );
    }
};
exports.getInfor = async (req, res, next) => {
    try {
        const information = new Information(MongoDB.client);
        const document = await information.getInfor(req.params.MSSV);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while register class")
        );
    }
};
exports.isRegistered = async (req, res, next) => {
    try {
        const quanLyLopHoc = new QuanLyLopHoc(MongoDB.client);
        const document = await quanLyLopHoc.isRegistered(req.params.MaLopTT, req.params.MSSV);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error while get is registered")
        );
    }
};
exports.updateClass = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try {
        const quanLyLopHoc = new QuanLyLopHoc(MongoDB.client);
        const document = await quanLyLopHoc.update(req.body);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Class was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating class`)
        );
    }
};

