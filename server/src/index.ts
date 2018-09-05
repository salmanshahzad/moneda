import { config } from "dotenv";
import { join } from "path";
import app from "./app";

config({ path: join(__dirname, "..", "..", ".env") });

app.listen(process.env.PORT, () => console.log(`Moneda listening on http://localhost:${process.env.PORT}`));
