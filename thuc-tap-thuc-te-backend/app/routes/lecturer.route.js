const express = require("express");
const controller = require("../controllers/lecturer.controller");

const router = express.Router();



router.route("/QLGV")
    .post(controller.createTeacher);
router.route("/QLGV/:id")
    .put(controller.updateGV)
    .delete(controller.deleteGV);

router.route("/QLCB")
    .get(controller.getAllCB)
    .post(controller.createCB)
router.route("/QLCB/:id")
    .put(controller.updateCB)
    .delete(controller.deleteCB);

router.route("/allLecturer")
    .get(controller.getAllLecturer);



module.exports = router;