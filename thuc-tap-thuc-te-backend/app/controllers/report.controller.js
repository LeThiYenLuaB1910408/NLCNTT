const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const Report = require("../services/report.service");
 

exports.createReport = async (req, res, next) => {
    try {
        const quanLyBaoCao = new Report(MongoDB.client);
        const rp = await quanLyBaoCao.createReport(req.params.id, req.body);
        return res.send(rp);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the report")
        );
    }
};
exports.updateReport = async (req, res, next) => {
    try {
        const quanLyBaoCao = new Report(MongoDB.client);
        const rp = await quanLyBaoCao.updateReport(req.params.id, req.body);
        return res.send({ message: "Update Successfully" });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while update the report")
        );
    }
};

exports.allReport = async (req, res, next) => {
    try {
        const quanLyBaoCao = new Report(MongoDB.client);
        let documents = await quanLyBaoCao.findOne(req.params.id);
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(500, "An error while getAllReport")
        );
    }
};
exports.getReport = async (req, res, next) => {
    try {
        const quanLyBaoCao = new Report(MongoDB.client);
        const documents = await quanLyBaoCao.getReport(req.params.MSGV, req.params.TenBaoCao);
        res.send(documents)
    } catch (error) {
        return next(
            new ApiError(500, "An error while getReport")
        );
    }
};
exports.uploadFile = async (req, res, next) => {
    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
    try {
        const quanLyBaoCao = new Report(MongoDB.client);
        const documents = await quanLyBaoCao.uploadFile(req.params.MSGV, req.files.file, req.body);
        res.send(documents)
    } catch (error) {
        return next(
            new ApiError(500, "An error while uploadFile")
        );
    }
};
exports.deleteFile = async (req, res, next) => {
    try {
        const quanLyBaoCao = new Report(MongoDB.client);
        const documents = await quanLyBaoCao.deleteFile(req.params.MSGV, req.body);
        res.send({message: "File deleted successfully"})
    } catch (error) {
        return next(
            new ApiError(500, "An error while deleteFile")
        );
    }
};
// exports.getFile = async (req, res, next) => {
//     const fs = require('fs');
//     try {
//         res.sendFile("/fileUpload/GV002/Báo Cáo Tổng Kết/B1910408/[L05.2] - Architectural design.pdf")
//         // var file = fs.readFileSync(req.body.url, 'binary');
//         // var stat = fs.statSync(req.body.url);

//         // res.setHeader('Content-Length', stat.size);
//         // res.setHeader('Content-Type', '*/*');
//         // res.setHeader('Content-Disposition', 'attachment; filename=your_file_name');
//         // res.write(file, 'binary');
//         res.end();
//     } catch (err) {
//         console.error(err);
//     }

// };

