const express = require("express");
const controller = require("../controllers/class.controller");

const router = express.Router();

router.route("/QLLH")
    .get(controller.findAllClass)
    .put(controller.updateClass)
    .post(controller.createClass);

router.route("/courses/:id")
    .get(controller.findOneClass);
router.route("/register")
    .post(controller.registerClass);
router.route("/register/:MaLopTT/:MSSV")
    .get(controller.isRegistered);
    
router.route("/allStudent")
    .get(controller.getAllStudent);

router.route("/infor/:MSSV")
    .get(controller.getInfor);

module.exports = router; 