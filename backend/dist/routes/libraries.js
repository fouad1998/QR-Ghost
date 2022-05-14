"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.libraries = void 0;var _express = require("express");
var _addUser = require("../middleware/addUser");
var _removeUser = require("../middleware/removeUser");
var _users = require("../middleware/users");
var _multer = _interopRequireDefault(require("../multer"));

var libraries = (0, _express.Router)();exports.libraries = libraries;

libraries.get(
'/libraries',
(0, _users.users)('library', 'libraries', ['admin', 'restaurant']));


libraries.post(
'/libraries/add',
_multer["default"].single('profile'),
(0, _addUser.addUser)('library', ['admin']));


libraries.post('/libraries/remove', (0, _removeUser.removeUser)('library', ['admin']));