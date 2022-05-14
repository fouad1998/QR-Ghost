"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.users = users;var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _sqlTemplateStrings = _interopRequireDefault(require("sql-template-strings"));
var _db = require("../db");var _templateObject;


function users(kind, key, allowed) {
  /**
                                     *
                                     * @param {import("./authorization").MyRequest} req
                                     */
  return /*#__PURE__*/function () {var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {var _yield$postgresPool$q, rows;return _regenerator["default"].wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:if (
              allowed.some(function (e) {return e === req.user.role;})) {_context.next = 2;break;}return _context.abrupt("return",
              res.status(401).json({ error: "You are not authorized" }));case 2:_context.prev = 2;_context.next = 5;return (


                _db.postgresPool.query((0,
                _sqlTemplateStrings["default"])(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n           SELECT\n           *\n           FROM\n           users\n           WHERE\n           role = ", "\n           "])),





                kind)));case 5:_yield$postgresPool$q = _context.sent;rows = _yield$postgresPool$q.rows;



              res.json((0, _defineProperty2["default"])({}, key, rows));_context.next = 13;break;case 10:_context.prev = 10;_context.t0 = _context["catch"](2);

              res.status(500).json({ error: "server issue" });case 13:case "end":return _context.stop();}}}, _callee, null, [[2, 10]]);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}();


}