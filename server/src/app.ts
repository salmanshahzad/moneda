import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import dotenv from "dotenv";
import path from "path";
import session from "express-session";
import routes from "./routes/index";

dotenv.config({path: path.join(__dirname, "..", "..", ".env")});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(compression());
app.use(session({secret: process.env.SECRET, resave: false, saveUninitialized: false}));
app.use(process.env.BASE, express.static(path.join(__dirname, "..", "..", "client", "dist")));

app.use("/api", routes);

app.get(process.env.BASE + "*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "client", "dist", "index.html"));
});

export default app;
