import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // from .env
});

export default pool;
