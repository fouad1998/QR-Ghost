import { Router } from 'express'
import sql from 'sql-template-strings'
import { postgresPool } from '../db'
import multer from '../multer'
import { qrCodeGen } from '../qrCodeGen'
import { sendEmail } from '../sendEmail'

export const emprunter = Router()
emprunter.get('/emprunters', async (req, res) => {
  if (req.user.role !== 'library') {
    return res.status(401).json({ error: 'you are not authorized' })
  }

  try {
    const { rows } = await postgresPool.query(
      sql`
          SELECT
          users.*,
          books.title as title,
          students_books.*
          FROM
          students_books
          INNER JOIN users ON users.id = students_books.student_id
          INNER JOIN books ON books.id = students_books.book_id 
          `
    )
    return res.json({
      emprunters: rows.map((e) => ({
        ...e,
        createdAt: new Date(e.created_at).toLocaleString('en', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      })),
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'server issue' })
  }
})

emprunter.get('/emprunter', async (req, res) => {
  const { id } = req.query

  try {
    const { rows } = await postgresPool.query(
      sql`
          SELECT
          users.*,
          books.*,
          students_books.*
          FROM
          students_books
          INNER JOIN users ON users.id = students_books.student_id
          INNER JOIN books ON books.id = students_books.book_id 
          where students_books.id = ${id}
          `
    )
    if (rows.length === 0) {
      return res.status(404).json({ error: 'does not exist' })
    }

    const e = rows[0]
    return res.json({
      emprunter: {
        ...e,
        createdAt: new Date(e.created_at).toLocaleString('en', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'server issue' })
  }
})

emprunter.post(
  '/emprunter/add',
  multer.none(),
  /**
   *
   * @param {import('../middleware/authorization').MyRequest} req
   */

  async (req, res) => {
    if (req.user.role !== 'library') {
      return res.status(401).json({ error: 'you are not authorized' })
    }

    const { student, book } = req.body
    const params = [student, book]
    for (const p of params) {
      if (typeof p !== 'string') {
        return res.status(400).json({ error: 'bad params ' + p })
      }
    }

    try {
      const {
        rows: { 0: bookObj },
      } = await postgresPool.query(
        sql`
      SELECT
      *
      FROM
      books
      where id = ${book}
      `
      )
      if (!bookObj) {
        return res.status(404).json({ error: 'book does not exist' })
      }

      const {
        rows: { 0: studentObj },
      } = await postgresPool.query(
        sql`
        SELECT
        *
        FROM
        users
        where id = ${student} AND role = 'student'
        `
      )
      if (!studentObj) {
        return res.status(404).json({ error: 'student does not exist' })
      }

      const {
        rows: {
          0: { id },
        },
      } = await postgresPool.query(
        sql`
          INSERT INTO
          students_books
          (student_id, book_id, created_at)
          VALUES
          (${student}, ${book}, ${new Date().toString()})
          RETURNING id
          `
      )
      const __html = `
      <div>
        Hello ${studentObj.firstname} ${studentObj.lastname.toUpperCase()},
      </div>
      <div>
        You have borrowed a book ${bookObj.title} successfuly by the ${
        req.user.firstname
      } ${req.user.lastname.toUpperCase()}.
      </div>
      <div>
      Your borrow QR badge is attached bellow
      </div>
`

      sendEmail({
        to: studentObj.email,
        subject: 'Book Borrow Process',
        html: __html,
        attachments: [
          {
            filename: 'Your borrow budget',
            path: await qrCodeGen(JSON.stringify({ emprunterID: id })),
          },
        ],
      })
      res.json({ id, student, book })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'server issue' })
    }
  }
)

emprunter.post('/emprunter/remove', multer.none(), async (req, res) => {
  if (req.user.role !== 'library') {
    return res.status(401).json({ error: 'you are not authorized' })
  }

  try {
    const { id } = req.body
    const {
      rows: { 0: studentBook },
    } = await postgresPool.query(
      sql`
      SELECT
      *
      FROM
      students_books
      INNER JOIN users ON users.id = students_books.student_id
      INNER JOIN books ON books.id = students_books.book_id
      WHERE students_books.id = ${id}
      `
    )
    const { rowCount } = await postgresPool.query(
      sql`
        DELETE
        FROM
        students_books
        WHERE
        id = ${id}
        `
    )
    if (rowCount === 0) {
      return res.status(404).json({ error: 'does not exist' })
    }

    const __html = `
    <div>
      Hello ${studentBook.firstname} ${studentBook.lastname.toUpperCase()},
    </div>
    <div>
      Your loan is returned ${studentBook.title} successfuly by the ${
      req.user.firstname
    } ${req.user.lastname.toUpperCase()}.
    </div>
`

    sendEmail({
      to: studentBook.email,
      subject: 'Book Borrow Process Done',
      html: __html,
    })
    res.json({ id })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'server issue' })
  }
})
