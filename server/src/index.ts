import app from "./app";
import { config } from "dotenv";
import { join } from "path";

config({ path: join(__dirname, "..", "..", ".env") });

app.listen(process.env.PORT);
