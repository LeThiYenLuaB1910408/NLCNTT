const express = require("express");
const controller = require("../controllers/report.controller");

const router = express.Router();


router.route("/report/:id")
    .put(controller.updateReport)
    .post(controller.createReport)
    .get(controller.allReport);
router.route("/report/:MSGV/:TenBaoCao")
    .get(controller.getReport)

router.route("/reports/:MSGV")
    .post(controller.uploadFile)
    .put(controller.deleteFile)
// router.route("/getfile")
//     .get(controller.getFile)


module.exports = router;