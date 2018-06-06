import * as express from "express";
import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as mongoose from "mongoose";
import * as path from "path";
import routes from "./routes";

mongoose.connect("mongodb://localhost:27017/moneda");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(compression());
app.use(express.static(path.join(__dirname, "..", "..", "client", "dist")));

app.use("/api", routes);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "client", "dist", "index.html"));
});

export default app.listen(3000);
