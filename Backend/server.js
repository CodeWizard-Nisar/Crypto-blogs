const express = require("express");
const dbConnect = require("./database/index");
const { PORT } = require("./config/index");
const router = require("./Routes/index");

const app = express();

app.use(router); 

dbConnect();
app.get("/", (req, res) => res.json({ msg: "Hello World" }));

app.listen(PORT, console.log("Backend is running on port: ${PORT}"));
