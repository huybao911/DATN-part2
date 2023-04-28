const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const cors = require("cors");
require("colors");

const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

const db = require("./config/db");

const app = express();

dotenv.config({ path: "./config/config.env" });

if (process.env.NODE_ENV === "production") console.log = function() {};

if (process.env.NODE_ENV === "development") app.use(logger("dev"));

app.use(cors());

// DB Connection
db(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Upload 
app.use("/images", express.static(path.join(__dirname, "public/images")));
// app.use(express.static(path.join('public/images')));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
     cb(null, file.fieldname + '-' + Date.now() + 
    path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
app.post("/api/v1/upload", upload.single("image"),(req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/api/v1/user", require("./routes/user"));
app.use("/api/v1/smanager", require("./routes/superManager"));
app.use("/api/v1/manager", require("./routes/Manager"));
app.use("/api/v1/admin", require("./routes/admin"));

module.exports = app;
