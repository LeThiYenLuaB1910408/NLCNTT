const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const contactsRouter = require("./app/routes/route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use("/api", contactsRouter);

// handle 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(console.error.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to contact book application."});
// });

module.exports = app;