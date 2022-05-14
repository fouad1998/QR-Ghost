import { Router } from "express"
import { addUser } from "../middleware/addUser"
import { removeUser } from "../middleware/removeUser"
import { users } from "../middleware/users"
import multer from "../multer"
export const students = Router()
students.get(
  "/students",
  users("student", "students", ["admin", "restaurant", "library"])
)

students.post(
  "/students/add",
  multer.single("profile"),
  addUser("student", ["admin"])
)

students.post("/students/remove", 
removeUser("student", ["admin"]))
