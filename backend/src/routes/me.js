import { Router } from "express"
import { postgresPool } from "../db"
import multer from "../multer"
import sql from "sql-template-strings"
export const me = Router()
me.post(
  "/me",
  multer.single("profile"),
  /**
   *
   * @param {import("../middleware/authorization").MyRequest} req
   */
  async (req, res) => {
    try {
      const { id, username, firstname, lastname, email, picture } = req.body
      const params = [username, firstname, lastname, email]
      for (const p of params) {
        if (typeof p !== "string") {
          return res.status(400).json({ error: "bad params " + p })
        }
      }

      const { rowCount, rows } = await postgresPool.query(
        sql`
           UPDATE
           users
           SET
           username = ${username}, firstname = ${firstname}, lastname = ${lastname}, email = ${email}, picture = ${
          req.file?.filename || picture
        }
           WHERE
           id = ${req.user.id}
           RETURNING picture
           `
      )
      if (rowCount === 0) {
        return res.status(404).json({ error: "You do not exist" })
      }

      return res.json({
        id,
        username,
        firstname,
        lastname,
        email,
        picture,
        ...(rows[0] || {}),
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "server issue" })
    }
  }
)

me.post(
  "/me/password",
  multer.none(),
  /**
   *
   * @param {import("../middleware/authorization").MyRequest} req
   */
  async (req, res) => {
    try {
      const { oldp, newp } = req.body
      const params = [oldp, newp]
      for (const p of params) {
        if (typeof p !== "string") {
          return res.status(400).json({ error: "bad params " + p })
        }
      }

      const { rowCount } = await postgresPool.query(
        sql`
           UPDATE
           users
           SET
           password = CRYPT(${newp}, gen_salt('bf'))
           WHERE
           id = ${req.user.id} AND password = CRYPT(${oldp}, password)
           `
      )
      if (rowCount === 0) {
        return res.status(404).json({ error: "You do not exist" })
      }

      return res.sendStatus(200)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "server issue" })
    }
  }
)
