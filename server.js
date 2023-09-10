const express = require("express");
const dbConnect = require("./database/index");
const { PORT } = require("./config/index");
const router = require("./Routes/index");
const errorHandler = require("./middleware/errorhandler");

const app = express();
app.use(express.json());

app.use(router);

dbConnect();

app.use(errorHandler);

app.listen(PORT, console.log("Backend is running on port: ${PORT}"));
