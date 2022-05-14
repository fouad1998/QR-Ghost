import { Router } from "express"
import sql from "sql-template-strings"
import { postgresPool } from "../db"
import multer from "../multer"

export const book = Router()

book.get("/books", async (req, res) => {
  if (req.user.role !== "library") {
    return res.status(401).json({ error: "you are not authorized" })
  }

  try {
    const { rows } = await postgresPool.query(
      sql`
          SELECT
          *
          FROM
          books
          `
    )

    res.json({ books: rows })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "server issue" })
  }
})

book.post(
  "/books/add",
  multer.single("cover"),
  /**
   *
   * @param {import("../middleware/authorization").MyRequest} req
   */
  async (req, res) => {
    if (req.user.role !== "library") {
      return res.status(401).json({ error: "you are not authorized" })
    }

    const { title, description } = req.body
    const params = [title, description]
    for (const p of params) {
      if (typeof p !== "string") {
        return res.status(400).json({ error: "bad params " + p })
      }
    }

    if (!req.file) {
      return res.status(400).json({ error: "bad params " })
    }

    try {
      const {
        rows: { 0: book },
      } = await postgresPool.query(
        sql`
            INSERT INTO
            books
            (title, description, cover)
            VALUES
            (${title}, ${description}, ${req.file.filename})
            RETURNING id, title, description, cover
            `
      )
      res.json({ ...book })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "server issue" })
    }
  }
)

book.post("/books/remove", multer.none(), async (req, res) => {
  if (req.user.role !== "library") {
    return res.status(401).json({ error: "you are not authorized" })
  }

  try {
    const { id } = req.body
    const { rowCount } = await postgresPool.query(
      sql`
    DELETE
    FROM
    books
    WHERE
    id = ${id}
    `
    )
    if (rowCount === 0) {
      return res.status(404).json({ error: "does not exist" })
    }

    res.json({ id })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "server issue" })
  }
})

book.get("/book", async (req, res) => {
  const { id } = req.query
  try {
    const { rows, rowCount } = await postgresPool.query(
      sql`
          SELECT
          *
          FROM
          books
          WHERE
          id=  ${id}
          `
    )

    if (rowCount === 0) {
      return res.status(404).json({ error: "does not exist" })
    }

    const { ...other } = rows[0]
    res.json({ ...other })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "server issue" })
  }
})
