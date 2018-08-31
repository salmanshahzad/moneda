import express from "express";
import { json, urlencoded } from "body-parser";
import compression from "compression";
import { config } from "dotenv";
import { join } from "path";
import routes from "./routes";

config({ path: join(__dirname, "..", "..", ".env") });

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(compression());
app.use(express.static(join(__dirname, "..", "..", "client", "dist")));

app.use("/api", routes);

app.get("*", (req, res) => {
    res.sendFile(join(__dirname, "..", "..", "client", "dist", "index.html"));
});

export default app;
