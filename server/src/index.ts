import mongoose from "mongoose";
import app from "./app";

mongoose.connect("mongodb://localhost:27017/moneda");

app.listen(3000);
