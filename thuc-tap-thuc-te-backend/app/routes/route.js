const express = require("express");
const controller = require("../controllers/controller");

const router = express.Router();

router.route("/QLTK")
    .get(controller.findAllAccount)
    .post(controller.findOneAccount);
router.route("/QLSV")
    .get(controller.findAllStudent)
    .post(controller.createStudent);
router.route("/QLGV")
    .post(controller.createTeacher);
router.route("/QLCB")
    .get(controller.getAllCB)
    .post(controller.createCB)
router.route("/QLCB/:id")
    .put(controller.updateCB)
    .delete(controller.deleteCB);
router.route("/QLGV/:id")
    .put(controller.updateGV)
    .delete(controller.deleteGV);
router.route("/QLLH")
    .get(controller.findAllClass)
    .put(controller.updateClass)
    .post(controller.createClass);
router.route("/courses/:id")
    .get(controller.findOneClass);
router.route("/register")
    .post(controller.registerClass);
router.route("/register/:id")
    .get(controller.isRegistered);
router.route("/allStudent")
    .get(controller.getAllStudent);
router.route("/allLecturer")
    .get(controller.getAllLecturer);


// router.route("/single-file")
//     .post(controller.upfile);

router.route("/report/:id")
    .put(controller.updateReport)
    .post(controller.createReport)
    .get(controller.allReport);
router.route("/reports/:class")
    .post(controller.uploadFile)



module.exports = router;