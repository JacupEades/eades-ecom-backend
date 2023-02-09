const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { readdirSync } = require("fs");
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

// app
const app = express();

// database
mongoose
	.connect(process.env.DATABASE, {})
	.then(() => console.log("DB connected"))
	.catch((err) => console.log("DB Error => ", err));
// mongoose
// 	.connect(process.env.DATABASE, {
// 		useNewUrlParser: true,
// 		useCreateIndex: true,
// 		useFindAndModify: false,
// 	})
// 	.then(() => console.log("DB connected"))
// 	.catch((err) => console.log("DB Error => ", err));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

// routes middleware, this will import all routes from the routes folder
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
