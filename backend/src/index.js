import "dotenv/config"
import express from "express"
import cors from "cors"
import { authorization } from "./middleware/authorization"
import { libraries } from "./routes/libraries"
import { login } from "./routes/login"
import { restaurants } from "./routes/restaurants"
import { students } from "./routes/students"
import path from "path"
import { me } from "./routes/me"
import { user } from "./routes/user"
import morgan from "morgan"
import { book } from "./routes/book"
import { emprunter } from "./routes/empruter"
import { meal } from "./routes/meal"
const app = express()
const port = 3000

app.use(cors())
app.use(express.static(path.resolve(__dirname, "../public")))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan(":date[iso] :remote-addr :method :url :status :res[content-length] - :response-time ms"))
app.use(login)
// Keep the order
app.use(authorization)
app.use(students)
app.use(restaurants)
app.use(libraries)
app.use(me)
app.use(user)
app.use(book)
app.use(emprunter)
app.use(meal)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
