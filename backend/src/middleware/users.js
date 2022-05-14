import sql from "sql-template-strings"
import { postgresPool } from "../db"


export function users(kind, key, allowed) {
  /**
   *
   * @param {import("./authorization").MyRequest} req
   */
  return async (req, res) => {
    if (!allowed.some((e) => e === req.user.role)) {
      return res.status(401).json({ error: "You are not authorized" })
    }
    try {
      const { rows } = await postgresPool.query(
        sql`
           SELECT
           *
           FROM
           users
           WHERE
           role = ${kind}
           `
      )

      res.json({ [key]: rows })
    } catch (error) {
      res.status(500).json({ error: "server issue" })
    }
  }
}
