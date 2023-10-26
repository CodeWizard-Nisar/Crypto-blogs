const express = require("express");
const dbConnect = require("./database/index");
const { PORT } = require("./config/index");
const router = require("./Routes/index");
const errorHandler = require("./middleware/errorhandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000"],
};

const app = express();

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

app.use(router);

dbConnect();

app.use("/storage", express.static("storage"));

app.use(errorHandler);

app.listen(PORT, console.log("Backend is running on port: ${PORT}"));
