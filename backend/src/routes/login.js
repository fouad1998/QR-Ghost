import { Router } from "express"
import { verify, sign, decode } from "jsonwebtoken"
import sql from "sql-template-strings"
import { postgresPool } from "../db"

export const login = Router()
login.post("/login", async (req, res) => {
  console.log("request ", req.body)
  const { username, password } = req.body
  const { rowCount, rows } = await postgresPool.query(
    sql`
        SELECT
        *
        FROM
        users
        WHERE ((username = ${username} OR email = ${username}) AND password = CRYPT(${password}, password))
    `
  )
  if (rowCount === 0) {
    return res.status(401).json({ error: "username or password is incorrect" })
  }

  const {
    id,
    username: name,
    email,
    firstname,
    lastname,
    role,
    picture,
  } = rows[0]
  const jwt = sign(
    { id, username: name, email, firstname, lastname, role, picture },
    process.env.SECRET_JWT,
    {
      expiresIn: "30d",
      algorithm: "HS384",
    }
  )

  res.json({ jwt })
})

login.post("/verify", async (req, res) => {
  const authorization = req.headers["authorization"]
  if (!authorization) {
    return res.sendStatus(401)
  }

  try {
    verify(authorization, process.env.SECRET_JWT)
    res.sendStatus(200)
  } catch {
    return res.sendStatus(401)
  }
})

login.post("/update", async (req, res) => {
  const authorization = req.headers["authorization"]
  if (!authorization) {
    return res.sendStatus(401)
  }

  try {
    verify(authorization, process.env.SECRET_JWT)
    const d = decode(authorization)
    const { rowCount, rows } = await postgresPool.query(
      sql`
          SELECT
          *
          FROM
          users
          WHERE id = ${d.id}
      `
    )
    if (rowCount === 0) {
      return res.status(401).json({ error: "you are not authorized anymore" })
    }

    const jwt = sign({ ...rows[0] }, process.env.SECRET_JWT, {
      expiresIn: "30d",
      algorithm: "HS384",
    })

    res.json({ jwt })
  } catch {
    return res.sendStatus(401)
  }
})
