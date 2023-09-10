const express = require("express");
const dbConnect = require("./database/index");
const { PORT } = require("./config/index");
const router = require("./Routes/index");
const errorHandler = require("./middleware/errorhandler");

const app = express();

app.use(router);

dbConnect();
app.get("/", (req, res) => res.json({ msg: "Hello World" }));
app.use(errorHandler);  
app.listen(PORT, console.log("Backend is running on port: ${PORT}"));
