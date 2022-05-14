"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.book = void 0;var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _express = require("express");
var _sqlTemplateStrings = _interopRequireDefault(require("sql-template-strings"));
var _db = require("../db");
var _multer = _interopRequireDefault(require("../multer"));var _templateObject, _templateObject2, _templateObject3, _templateObject4;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {(0, _defineProperty2["default"])(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}

var book = (0, _express.Router)();exports.book = book;

book.get("/books", /*#__PURE__*/function () {var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {var _yield$postgresPool$q, rows;return _regenerator["default"].wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:if (!(
            req.user.role !== "library")) {_context.next = 2;break;}return _context.abrupt("return",
            res.status(401).json({ error: "you are not authorized" }));case 2:_context.prev = 2;_context.next = 5;return (



              _db.postgresPool.query((0,
              _sqlTemplateStrings["default"])(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n          SELECT\n          *\n          FROM\n          books\n          "])))));case 5:_yield$postgresPool$q = _context.sent;rows = _yield$postgresPool$q.rows;







            res.json({ books: rows });_context.next = 14;break;case 10:_context.prev = 10;_context.t0 = _context["catch"](2);

            console.error(_context.t0);
            res.status(500).json({ error: "server issue" });case 14:case "end":return _context.stop();}}}, _callee, null, [[2, 10]]);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}());



book.post(
"/books/add",
_multer["default"].single("cover"), /*#__PURE__*/
/**
                                                   *
                                                   * @param {import("../middleware/authorization").MyRequest} req
                                                   */function () {var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(
  function _callee2(req, res) {var _req$body, title, description, params, _i, _params, p, _yield$postgresPool$q2, _book;return _regenerator["default"].wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:if (!(
            req.user.role !== "library")) {_context2.next = 2;break;}return _context2.abrupt("return",
            res.status(401).json({ error: "you are not authorized" }));case 2:_req$body =


            req.body, title = _req$body.title, description = _req$body.description;
            params = [title, description];_i = 0, _params =
            params;case 5:if (!(_i < _params.length)) {_context2.next = 12;break;}p = _params[_i];if (!(
            typeof p !== "string")) {_context2.next = 9;break;}return _context2.abrupt("return",
            res.status(400).json({ error: "bad params " + p }));case 9:_i++;_context2.next = 5;break;case 12:if (



            req.file) {_context2.next = 14;break;}return _context2.abrupt("return",
            res.status(400).json({ error: "bad params " }));case 14:_context2.prev = 14;_context2.next = 17;return (





              _db.postgresPool.query((0,
              _sqlTemplateStrings["default"])(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n            INSERT INTO\n            books\n            (title, description, cover)\n            VALUES\n            (", ", ", ", ", ")\n            RETURNING id, title, description, cover\n            "])),




              title, description, req.file.filename)));case 17:_yield$postgresPool$q2 = _context2.sent;_book = _yield$postgresPool$q2.rows[0];



            res.json(_objectSpread({}, _book));_context2.next = 26;break;case 22:_context2.prev = 22;_context2.t0 = _context2["catch"](14);

            console.error(_context2.t0);
            res.status(500).json({ error: "server issue" });case 26:case "end":return _context2.stop();}}}, _callee2, null, [[14, 22]]);}));return function (_x3, _x4) {return _ref2.apply(this, arguments);};}());




book.post("/books/remove", _multer["default"].none(), /*#__PURE__*/function () {var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {var id, _yield$postgresPool$q3, rowCount;return _regenerator["default"].wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:if (!(
            req.user.role !== "library")) {_context3.next = 2;break;}return _context3.abrupt("return",
            res.status(401).json({ error: "you are not authorized" }));case 2:_context3.prev = 2;



            id = req.body.id;_context3.next = 6;return (
              _db.postgresPool.query((0,
              _sqlTemplateStrings["default"])(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2["default"])(["\n    DELETE\n    FROM\n    books\n    WHERE\n    id = ", "\n    "])),




              id)));case 6:_yield$postgresPool$q3 = _context3.sent;rowCount = _yield$postgresPool$q3.rowCount;if (!(


            rowCount === 0)) {_context3.next = 10;break;}return _context3.abrupt("return",
            res.status(404).json({ error: "does not exist" }));case 10:


            res.json({ id: id });_context3.next = 17;break;case 13:_context3.prev = 13;_context3.t0 = _context3["catch"](2);

            console.error(_context3.t0);
            res.status(500).json({ error: "server issue" });case 17:case "end":return _context3.stop();}}}, _callee3, null, [[2, 13]]);}));return function (_x5, _x6) {return _ref3.apply(this, arguments);};}());



book.get("/book", /*#__PURE__*/function () {var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {var id, _yield$postgresPool$q4, rows, rowCount, other;return _regenerator["default"].wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
            id = req.query.id;_context4.prev = 1;_context4.next = 4;return (

              _db.postgresPool.query((0,
              _sqlTemplateStrings["default"])(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2["default"])(["\n          SELECT\n          *\n          FROM\n          books\n          WHERE\n          id=  ", "\n          "])),





              id)));case 4:_yield$postgresPool$q4 = _context4.sent;rows = _yield$postgresPool$q4.rows;rowCount = _yield$postgresPool$q4.rowCount;if (!(



            rowCount === 0)) {_context4.next = 9;break;}return _context4.abrupt("return",
            res.status(404).json({ error: "does not exist" }));case 9:


            other = (0, _extends2["default"])({}, rows[0]);
            res.json(_objectSpread({}, other));_context4.next = 17;break;case 13:_context4.prev = 13;_context4.t0 = _context4["catch"](1);

            console.error(_context4.t0);
            res.status(500).json({ error: "server issue" });case 17:case "end":return _context4.stop();}}}, _callee4, null, [[1, 13]]);}));return function (_x7, _x8) {return _ref4.apply(this, arguments);};}());