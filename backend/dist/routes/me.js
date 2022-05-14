"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.me = void 0;var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _express = require("express");
var _db = require("../db");
var _multer = _interopRequireDefault(require("../multer"));
var _sqlTemplateStrings = _interopRequireDefault(require("sql-template-strings"));var _templateObject, _templateObject2;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {(0, _defineProperty2["default"])(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}
var me = (0, _express.Router)();exports.me = me;
me.post(
"/me",
_multer["default"].single("profile"), /*#__PURE__*/
/**
                                                     *
                                                     * @param {import("../middleware/authorization").MyRequest} req
                                                     */function () {var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(
  function _callee(req, res) {var _req$file, _req$body, id, username, firstname, lastname, email, picture, params, _i, _params, p, _yield$postgresPool$q, rowCount, rows;return _regenerator["default"].wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.prev = 0;_req$body =

            req.body, id = _req$body.id, username = _req$body.username, firstname = _req$body.firstname, lastname = _req$body.lastname, email = _req$body.email, picture = _req$body.picture;
            params = [username, firstname, lastname, email];_i = 0, _params =
            params;case 4:if (!(_i < _params.length)) {_context.next = 11;break;}p = _params[_i];if (!(
            typeof p !== "string")) {_context.next = 8;break;}return _context.abrupt("return",
            res.status(400).json({ error: "bad params " + p }));case 8:_i++;_context.next = 4;break;case 11:_context.next = 13;return (



              _db.postgresPool.query((0,
              _sqlTemplateStrings["default"])(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n           UPDATE\n           users\n           SET\n           username = ", ", firstname = ", ", lastname = ", ", email = ", ", picture = ", "\n           WHERE\n           id = ", "\n           RETURNING picture\n           "])),



              username, firstname, lastname, email,
              ((_req$file = req.file) === null || _req$file === void 0 ? void 0 : _req$file.filename) || picture,


              req.user.id)));case 13:_yield$postgresPool$q = _context.sent;rowCount = _yield$postgresPool$q.rowCount;rows = _yield$postgresPool$q.rows;if (!(



            rowCount === 0)) {_context.next = 18;break;}return _context.abrupt("return",
            res.status(404).json({ error: "You do not exist" }));case 18:return _context.abrupt("return",


            res.json(_objectSpread({
              id: id,
              username: username,
              firstname: firstname,
              lastname: lastname,
              email: email,
              picture: picture },
            rows[0] || {})));case 21:_context.prev = 21;_context.t0 = _context["catch"](0);


            console.error(_context.t0);
            res.status(500).json({ error: "server issue" });case 25:case "end":return _context.stop();}}}, _callee, null, [[0, 21]]);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}());




me.post(
"/me/password",
_multer["default"].none(), /*#__PURE__*/
/**
                                          *
                                          * @param {import("../middleware/authorization").MyRequest} req
                                          */function () {var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(
  function _callee2(req, res) {var _req$body2, oldp, newp, params, _i2, _params2, p, _yield$postgresPool$q2, rowCount;return _regenerator["default"].wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.prev = 0;_req$body2 =

            req.body, oldp = _req$body2.oldp, newp = _req$body2.newp;
            params = [oldp, newp];_i2 = 0, _params2 =
            params;case 4:if (!(_i2 < _params2.length)) {_context2.next = 11;break;}p = _params2[_i2];if (!(
            typeof p !== "string")) {_context2.next = 8;break;}return _context2.abrupt("return",
            res.status(400).json({ error: "bad params " + p }));case 8:_i2++;_context2.next = 4;break;case 11:_context2.next = 13;return (



              _db.postgresPool.query((0,
              _sqlTemplateStrings["default"])(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n           UPDATE\n           users\n           SET\n           password = CRYPT(", ", gen_salt('bf'))\n           WHERE\n           id = ", " AND password = CRYPT(", ", password)\n           "])),



              newp,

              req.user.id, oldp)));case 13:_yield$postgresPool$q2 = _context2.sent;rowCount = _yield$postgresPool$q2.rowCount;if (!(


            rowCount === 0)) {_context2.next = 17;break;}return _context2.abrupt("return",
            res.status(404).json({ error: "You do not exist" }));case 17:return _context2.abrupt("return",


            res.sendStatus(200));case 20:_context2.prev = 20;_context2.t0 = _context2["catch"](0);

            console.error(_context2.t0);
            res.status(500).json({ error: "server issue" });case 24:case "end":return _context2.stop();}}}, _callee2, null, [[0, 20]]);}));return function (_x3, _x4) {return _ref2.apply(this, arguments);};}());