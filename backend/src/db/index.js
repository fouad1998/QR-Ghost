import { Pool } from "pg"

export const postgresPool = new Pool({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || ""),
  min: 0,
  max: 0xffff,
  password: process.env.DATABASE_PASSWORD,
  user: process.env.DATABASE_USERNAME,
  database: process.env.DATABASE_DATABASE,
})
