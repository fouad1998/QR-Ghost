import sql from "sql-template-strings"
import { postgresPool } from "../db"
import { qrCodeGen } from "../qrCodeGen"
import { sendEmail } from "../sendEmail"

export function addUser(kind, allowed) {
  /**
   *
   * @param {import("./authorization").MyRequest} req
   */
  return async (req, res) => {
    if (!allowed.some((e) => e === req.user.role)) {
      return res.status(401).json({ error: "You are not authorized" })
    }

    try {
      const { username, firstname, lastname, email, password, ...other } =
        req.body
      const params = [username, firstname, lastname, email, password]
      for (const p of params) {
        if (typeof p !== "string") {
          console.log(p)
          return res.status(400).json({ error: "bad params " + p })
        }
      }

      const extra = { ...other }
      const {
        rows: {
          0: { id },
        },
      } = await postgresPool.query(
        sql`
         INSERT INTO
         users
         (username, firstname, lastname, email, password, role, picture, extra)
         VALUES
         (${username}, ${firstname}, ${lastname}, ${email}, CRYPT(${password}, gen_salt('bf')), ${kind}, ${req.file.filename}, ${extra})
         RETURNING id
         `
      )
      const __html = `
<div>
  Hello ${firstname} ${lastname.toUpperCase()},
</div>
<div>
  You are subscribed in QR-Ghost by ${
    req.user.firstname
  } ${req.user.lastname.toUpperCase()}. So welcome to our plateform
</div>
<div>
Your username is: ${username}
</div>
<div>
email is : ${email}
</div
<div>
password is: <strong>${password}</strong>
</div>
<div>
qr code is attached to this email
</div>`

      sendEmail({
        to: email,
        subject: "Inscription to QR Ghost",
        html: __html,
        attachments: [
          {
            filename: "You budget",
            path: await qrCodeGen(JSON.stringify({ userID: id })),
          },
        ],
      })
      return res.json({ id, username, firstname, lastname, email, extra })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "server issue" })
    }
  }
}
