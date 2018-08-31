import { config } from "dotenv";
import { join } from "path";
import pg from "pg";
import knex from "knex";

config({ path: join(__dirname, "..", ".env") });

// convert integers and floats
pg.types.setTypeParser(20, val => parseInt(val));
pg.types.setTypeParser(1700, val => parseFloat(val));

export default knex({
    client: "pg",
    connection: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
});
