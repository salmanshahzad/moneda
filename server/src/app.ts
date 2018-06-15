import * as express from "express";
import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as dotenv from "dotenv";
import * as path from "path";
import * as session from "express-session";
import routes from "./routes";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(compression());
app.use(session({secret: process.env.SECRET, resave: false, saveUninitialized: false}));
app.use(express.static(path.join(__dirname, "..", "..", "client", "dist")));

app.use("/api", routes);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "client", "dist", "index.html"));
});

export default app;
