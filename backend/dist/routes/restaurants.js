"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.restaurants = void 0;var _express = require("express");
var _addUser = require("../middleware/addUser");
var _removeUser = require("../middleware/removeUser");
var _users = require("../middleware/users");
var _multer = _interopRequireDefault(require("../multer"));

var restaurants = (0, _express.Router)();exports.restaurants = restaurants;

restaurants.get(
'/restaurants',
(0, _users.users)('restaurant', 'restaurants', ['admin', 'restaurant']));


restaurants.post(
'/restaurants/add',
_multer["default"].single('profile'),
(0, _addUser.addUser)('restaurant', ['admin']));


restaurants.post('/restaurants/remove', (0, _removeUser.removeUser)('restaurant', ['admin']));