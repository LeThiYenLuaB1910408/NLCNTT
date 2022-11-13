const QuanLyTaiKhoan = require("../services/account.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const QuanLySinhVien = require("../services/student.service");
const QuanLyLopHoc = require("../services/class.service");
const Information = require("../services/information.service");
const Lecturer = require("../services/lecturer.service");
const CanBo = require("../services/canbo.service");
const Report = require("../services/report.service");
const { ObjectId } = require("mongodb");


exports.createClass = async (req, res, next) => {
    try {
        const quanLyLopHoc = new QuanLyLopHoc(MongoDB.client);
        const document = await quanLyLopHoc.createClass(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};

exports.createStudent = async (req, res, next) => {
    try {
        const quanLySinhVien = new QuanLySinhVien(MongoDB.client);
        const quanLyTaiKhoan = new QuanLyTaiKhoan(MongoDB.client);
        const sv = await quanLySinhVien.createStudent(req.body);
        const tk = await quanLyTaiKhoan.create(req.body);

        return res.send({ sv });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};

exports.createTeacher = async (req, res, next) => {
    try {
        const quanLyGiangVien = new Lecturer(MongoDB.client);
        const quanLyTaiKhoan = new QuanLyTaiKhoan(MongoDB.client);
        const gv = await quanLyGiangVien.createTeacher(req.body);
        const tk = await quanLyTaiKhoan.create(req.body);
        return res.send({ gv });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};
exports.createCB = async (req, res, next) => {
    try {
        const quanLyCanBo = new CanBo(MongoDB.client);
        const quanLyTaiKhoan = new QuanLyTaiKhoan(MongoDB.client);
        const cb = await quanLyCanBo.createCB(req.body);
        const tk = await quanLyTaiKhoan.create(req.body);
        return res.send({ cb });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};
exports.createReport = async (req, res, next) => {
    try {

        const quanLyBaoCao = new Report(MongoDB.client);
        const rp = await quanLyBaoCao.createReport(req.params.id, req.body);
        return res.send(rp);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};
exports.updateReport = async (req, res, next) => {
    try {

        const quanLyBaoCao = new Report(MongoDB.client);
        const rp = await quanLyBaoCao.updateReport(req.params.id, req.body);
        return res.send(rp);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};

exports.allReport = async (req, res, next) => {
    let documents = [];

    try {
        const quanLyBaoCao = new Report(MongoDB.client);
        documents = await quanLyBaoCao.findOne(req.params.id);
    } catch (error) {
        return next(
            new ApiError(500, "An error")
        );
    }
    return res.send(documents);
};
exports.findAllAccount = async (req, res, next) => {
    let documents = [];

    try {
        const quanLyTaiKhoan = new QuanLyTaiKhoan(MongoDB.client);
        documents = await quanLyTaiKhoan.find({});
    } catch (error) {
        return next(
            new ApiError(500, "An error")
        );
    }
    return res.send(documents);
};

exports.findOneAccount = async (req, res, next) => {
    let documents = {};

    try {
        const quanLyTaiKhoan = new QuanLyTaiKhoan(MongoDB.client);
        documents = await quanLyTaiKhoan.findByName(req.body);
        if (documents != null) {
            return res.send(documents);

        } else {
            return res.send({ error: true });
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error")
        );
    }
};
exports.findAllStudent = async (req, res, next) => {
    let documents = [];

    try {
        const quanLySinhVien = new QuanLySinhVien(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await quanLySinhVien.findByName(name);
        } else {
            documents = await quanLySinhVien.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error")
        );
    }
    return res.send(documents);
};
exports.getAllStudent = async (req, res, next) => {
    let documents = [];

    try {
        const quanLyLopHoc = new QuanLyLopHoc(MongoDB.client);


        documents = await quanLyLopHoc.getAllStudent();

    } catch (error) {
        return next(
            new ApiError(500, "An error")
        );
    }

    return res.send(documents);
};
exports.findAllStudent = async (req, res, next) => {
    let documents = [];

    try {
        const quanLySinhVien = new QuanLySinhVien(MongoDB.client);
        documents = await quanLySinhVien.find({});
    } catch (error) {
        return next(
            new ApiError(500, "An error")
        );
    }
    return res.send(documents);
};
exports.getAllLecturer = async (req, res, next) => {
    let documents = [];

    try {
        const lecturer = new Lecturer(MongoDB.client);
        documents = await lecturer.find({});

    } catch (error) {
        return next(
            new ApiError(500, "An error")
        );
    }

    return res.send(documents);
};
exports.getAllCB = async (req, res, next) => {
    let documents = [];

    try {
        const canbo = new CanBo(MongoDB.client);
        documents = await canbo.find({});

    } catch (error) {
        return next(
            new ApiError(500, "An error")
        );
    }

    return res.send(documents);
};
exports.findAllClass = async (req, res, next) => {
    let documents = [];

    try {
        const quanLyLopHoc = new QuanLyLopHoc(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await quanLyLopHoc.findByName(name);
        } else {
            documents = await quanLyLopHoc.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error")
        );
    }
    return res.send(documents);
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
exports.isRegistered = async (req, res, next) => {
    try {
        const quanLyLopHoc = new QuanLyLopHoc(MongoDB.client);

        const document = await quanLyLopHoc.isRegistered(req.params.id);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
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
            new ApiError(500, `Error updating class with id`)
        );
    }
};
exports.deleteCB = async (req, res, next) => {
    try {
        const quanLyCanBo = new CanBo(MongoDB.client);
        const document = await quanLyCanBo.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Xóa Cán Bộ Thành Công!!!" });
    } catch (error) {
        return next(
            new ApiError(500, `Could not delete contact with id=${req.params.id}`)
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
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Xóa Giảng Viên Thành Công!!!" });
    } catch (error) {
        return next(
            new ApiError(500, `Could not delete contact with id=${req.params.id}`)
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
        const tk = await quanLyTaiKhoan.create(req.body);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Class was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating class with id`)
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
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Lecturer was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating class with id`)
        );
    }
};
// exports.deleteAll = async(_req, res, next) => {
//     try{
//         const contactService = new ContactService(MongoDB.client);
//         const deletedCount = await contactService.deleteAll();
//         return res.send({message: `${deletedCount} contacts were deleted successfully`});
//     }catch(error){
//         return next(
//             new ApiError(500, "An error while retrieving favorite contacts")
//         );
//     }
// };
exports.getReport = async (req, res, next) => {

    const quanLyBaoCao = new Report(MongoDB.client);
    const documents = await quanLyBaoCao.getReport(req.params.MaLopTT,req.params.TenBaoCao );

    res.send(documents)
};
exports.uploadFile = async (req, res, next) => {
    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
    const quanLyBaoCao = new Report(MongoDB.client);
    const documents = await quanLyBaoCao.updateFile(req.params.MaLopTT, req.files.file, req.body);

    res.send(documents)
};
exports.getFile = async (req, res, next) => {
    const fs = require('fs');
    try {
        var file = fs.readFileSync(req.body.url, 'binary');
        var stat = fs.statSync(req.body.url);

        res.setHeader('Content-Length', stat.size);
        res.setHeader('Content-Type', '*/*');
        res.setHeader('Content-Disposition', 'attachment; filename=your_file_name');
        res.write(file, 'binary');
        res.end();
    } catch (err) {
        console.error(err);
    }

};

