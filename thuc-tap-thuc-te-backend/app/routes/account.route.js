const express = require("express");
const controller = require("../controllers/account.controller");

const router = express.Router();

router.route("/QLTK")
    .get(controller.findAllAccount)
    .post(controller.findOneAccount);

module.exports = router; 