import { createPool } from "mysql2/promise";
export const pool = createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PWD || "root",
    database: process.env.DB_NAME || "tienda",
    port: process.env.DB_PORT || 3306
})