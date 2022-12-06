const express = require("express");
const cors = require("cors");
require('dotenv').config();
const fileUpload = require('express-fileupload');
const accountRouter = require("./app/routes/account.route");
const classRouter = require("./app/routes/class.route");
const lecturerRouter = require("./app/routes/lecturer.route");
const reportRouter = require("./app/routes/report.route");
const studentRouter = require("./app/routes/student.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use("/api/account", accountRouter);
app.use("/api/class", classRouter);
app.use("/api/lecturer", lecturerRouter);
app.use("/api/report", reportRouter);
app.use("/api/student", studentRouter);

// handle 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(console.error.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});


module.exports = app;