"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.user = void 0;var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _express = require("express");
var _sqlTemplateStrings = _interopRequireDefault(require("sql-template-strings"));
var _db = require("../db");var _excluded = ["password"];var _templateObject;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {(0, _defineProperty2["default"])(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}

var user = (0, _express.Router)();exports.user = user;

user.get("/user", /*#__PURE__*/function () {var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {var id, _yield$postgresPool$q, rows, rowCount, _rows$, password, other;return _regenerator["default"].wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            id = req.query.id;_context.prev = 1;_context.next = 4;return (

              _db.postgresPool.query((0,
              _sqlTemplateStrings["default"])(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n        SELECT\n        *\n        FROM\n        users\n        WHERE\n        id=  ", "\n        "])),





              id)));case 4:_yield$postgresPool$q = _context.sent;rows = _yield$postgresPool$q.rows;rowCount = _yield$postgresPool$q.rowCount;if (!(



            rowCount === 0)) {_context.next = 9;break;}return _context.abrupt("return",
            res.status(404).json({ error: "does not exist" }));case 9:_rows$ =


            rows[0], password = _rows$.password, other = (0, _objectWithoutProperties2["default"])(_rows$, _excluded);
            res.json(_objectSpread({}, other));_context.next = 17;break;case 13:_context.prev = 13;_context.t0 = _context["catch"](1);

            console.error(_context.t0);
            res.status(500).json({ error: "server issue" });case 17:case "end":return _context.stop();}}}, _callee, null, [[1, 13]]);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}());