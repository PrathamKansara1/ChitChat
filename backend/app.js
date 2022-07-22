require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const user = require("./routes/userRoute");
const message = require("./routes/messageRoute");

app.use("/api/v1", user);
app.use("/api/v1", message);

module.exports = app;
