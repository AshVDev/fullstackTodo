const PORT = 4001;
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/todo");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
connectToMongoDB("mongodb://127.0.0.1:27017/tododb").then(() =>
  console.log("Connected TO MongoDB")
);
const corsOption = { origin: "http://localhost:5173", credentials: true };
app.use(cors(corsOption));
app.use(cookieParser());

app.use(express.json());

app.use("/", router);

app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
