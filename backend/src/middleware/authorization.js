import { decode, verify } from "jsonwebtoken"
/**
 * @typedef User
 * @type {{role: "student" | "admin" | "library" | "restaurant"} }
 */

/**
 * @typedef MyRequest
 * @type {import("express").Request & {user:User}}
 */

/**
 *
 * @param {MyRequest} req
 * @param {import("express").Response} res
 * @param {*} next
 */
export function authorization(req, res, next) {
  const authorization = req.headers["authorization"]
  if (typeof authorization !== "string") {
    res.status(401).json({ error: "you are not authentificated" })
    return
  }

  try {
    verify(authorization, process.env.SECRET_JWT)

    /**
     * @type {User}
     */
    const user = decode(authorization)
    req.user = user
    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({ error: "you are not authentificated" })
  }
}
