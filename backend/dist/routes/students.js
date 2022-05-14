"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.students = void 0;var _express = require("express");
var _addUser = require("../middleware/addUser");
var _removeUser = require("../middleware/removeUser");
var _users = require("../middleware/users");
var _multer = _interopRequireDefault(require("../multer"));
var students = (0, _express.Router)();exports.students = students;
students.get(
"/students",
(0, _users.users)("student", "students", ["admin", "restaurant", "library"]));


students.post(
"/students/add",
_multer["default"].single("profile"),
(0, _addUser.addUser)("student", ["admin"]));


students.post("/students/remove",
(0, _removeUser.removeUser)("student", ["admin"]));