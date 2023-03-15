import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import route from "./route/userRoute.js";

const PORT = process.env.PORT || 5000;

const URL =
  "mongodb+srv://rahulstm08:EZmzqj2vXE9BGZYr@cluster0.jw9rlwh.mongodb.net/?retryWrites=true&w=majority";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", route);

mongoose.connect(URL);

app.listen(PORT, () => {
  console.log(`app is served on http://localhost:${PORT}`);
});
