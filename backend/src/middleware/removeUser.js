import sql from "sql-template-strings"
import { postgresPool } from "../db"

export function removeUser(kind, allowed) {
  /**
   *
   * @param {import("./authorization").MyRequest} req
   */
  return async (req, res) => {
    if (!allowed.some((e) => e === req.user.role)) {
      return res.status(401).json({ error: "You are not authorized" })
    }

    try {
      const { id } = req.body
      if (typeof id !== "string") {
        return res.status(400).json({ error: "bad params " + p })
      }

      const { rowCount } = await postgresPool.query(
        sql`
            DELETE
            FROM
         users
         WHERE role = ${kind} AND id = ${id}
         `
      )
      if (rowCount !== 1) {
        return res.status(404).json({ error: "user does not exist" })
      }

      return res.json({ id })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "server issue" })
    }
  }
}
