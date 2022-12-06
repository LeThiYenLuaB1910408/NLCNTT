const express = require("express");
const controller = require("../controllers/student.controller");

const router = express.Router();

router.route("/QLSV")
    .get(controller.findAllStudent)
    .post(controller.createStudent);
router.route("/QLSV/:id")
    .put(controller.updateSV)
    .delete(controller.deleteSV);

module.exports = router;