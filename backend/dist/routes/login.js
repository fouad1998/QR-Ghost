"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.login = void 0;var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _express = require("express");
var _jsonwebtoken = require("jsonwebtoken");
var _sqlTemplateStrings = _interopRequireDefault(require("sql-template-strings"));
var _db = require("../db");var _templateObject, _templateObject2;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {(0, _defineProperty2["default"])(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}

var login = (0, _express.Router)();exports.login = login;
login.post("/login", /*#__PURE__*/function () {var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {var _req$body, username, password, _yield$postgresPool$q, rowCount, rows, _rows$, id, name, email, firstname, lastname, role, picture, jwt;return _regenerator["default"].wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            console.log("request ", req.body);_req$body =
            req.body, username = _req$body.username, password = _req$body.password;_context.next = 4;return (
              _db.postgresPool.query((0,
              _sqlTemplateStrings["default"])(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n        SELECT\n        *\n        FROM\n        users\n        WHERE ((username = ", " OR email = ", ") AND password = CRYPT(", ", password))\n    "])),




              username, username, password)));case 4:_yield$postgresPool$q = _context.sent;rowCount = _yield$postgresPool$q.rowCount;rows = _yield$postgresPool$q.rows;if (!(


            rowCount === 0)) {_context.next = 9;break;}return _context.abrupt("return",
            res.status(401).json({ error: "username or password is incorrect" }));case 9:_rows$ =










            rows[0], id = _rows$.id, name = _rows$.username, email = _rows$.email, firstname = _rows$.firstname, lastname = _rows$.lastname, role = _rows$.role, picture = _rows$.picture;
            jwt = (0, _jsonwebtoken.sign)(
            { id: id, username: name, email: email, firstname: firstname, lastname: lastname, role: role, picture: picture },
            process.env.SECRET_JWT,
            {
              expiresIn: "30d",
              algorithm: "HS384" });



            res.json({ jwt: jwt });case 12:case "end":return _context.stop();}}}, _callee);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}());


login.post("/verify", /*#__PURE__*/function () {var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {var authorization;return _regenerator["default"].wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
            authorization = req.headers["authorization"];if (
            authorization) {_context2.next = 3;break;}return _context2.abrupt("return",
            res.sendStatus(401));case 3:_context2.prev = 3;



            (0, _jsonwebtoken.verify)(authorization, process.env.SECRET_JWT);
            res.sendStatus(200);_context2.next = 11;break;case 8:_context2.prev = 8;_context2.t0 = _context2["catch"](3);return _context2.abrupt("return",

            res.sendStatus(401));case 11:case "end":return _context2.stop();}}}, _callee2, null, [[3, 8]]);}));return function (_x3, _x4) {return _ref2.apply(this, arguments);};}());



login.post("/update", /*#__PURE__*/function () {var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {var authorization, d, _yield$postgresPool$q2, rowCount, rows, jwt;return _regenerator["default"].wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
            authorization = req.headers["authorization"];if (
            authorization) {_context3.next = 3;break;}return _context3.abrupt("return",
            res.sendStatus(401));case 3:_context3.prev = 3;



            (0, _jsonwebtoken.verify)(authorization, process.env.SECRET_JWT);
            d = (0, _jsonwebtoken.decode)(authorization);_context3.next = 8;return (
              _db.postgresPool.query((0,
              _sqlTemplateStrings["default"])(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n          SELECT\n          *\n          FROM\n          users\n          WHERE id = ", "\n      "])),




              d.id)));case 8:_yield$postgresPool$q2 = _context3.sent;rowCount = _yield$postgresPool$q2.rowCount;rows = _yield$postgresPool$q2.rows;if (!(


            rowCount === 0)) {_context3.next = 13;break;}return _context3.abrupt("return",
            res.status(401).json({ error: "you are not authorized anymore" }));case 13:


            jwt = (0, _jsonwebtoken.sign)(_objectSpread({}, rows[0]), process.env.SECRET_JWT, {
              expiresIn: "30d",
              algorithm: "HS384" });


            res.json({ jwt: jwt });_context3.next = 20;break;case 17:_context3.prev = 17;_context3.t0 = _context3["catch"](3);return _context3.abrupt("return",

            res.sendStatus(401));case 20:case "end":return _context3.stop();}}}, _callee3, null, [[3, 17]]);}));return function (_x5, _x6) {return _ref3.apply(this, arguments);};}());