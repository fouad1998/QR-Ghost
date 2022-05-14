import { Router } from "express"
import sql from "sql-template-strings"
import { postgresPool } from "../db"

export const user = Router()

user.get("/user", async (req, res) => {
  const { id } = req.query
  try {
    const { rows, rowCount } = await postgresPool.query(
      sql`
        SELECT
        *
        FROM
        users
        WHERE
        id=  ${id}
        `
    )

    if (rowCount === 0) {
      return res.status(404).json({ error: "does not exist" })
    }

    const { password, ...other } = rows[0]
    res.json({ ...other })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "server issue" })
  }
})
