"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.removeUser = removeUser;var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _sqlTemplateStrings = _interopRequireDefault(require("sql-template-strings"));
var _db = require("../db");var _templateObject;

function removeUser(kind, allowed) {
  /**
                                     *
                                     * @param {import("./authorization").MyRequest} req
                                     */
  return /*#__PURE__*/function () {var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {var id, _yield$postgresPool$q, rowCount;return _regenerator["default"].wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:if (
              allowed.some(function (e) {return e === req.user.role;})) {_context.next = 2;break;}return _context.abrupt("return",
              res.status(401).json({ error: "You are not authorized" }));case 2:_context.prev = 2;



              id = req.body.id;if (!(
              typeof id !== "string")) {_context.next = 6;break;}return _context.abrupt("return",
              res.status(400).json({ error: "bad params " + p }));case 6:_context.next = 8;return (


                _db.postgresPool.query((0,
                _sqlTemplateStrings["default"])(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n            DELETE\n            FROM\n         users\n         WHERE role = ", " AND id = ", "\n         "])),



                kind, id)));case 8:_yield$postgresPool$q = _context.sent;rowCount = _yield$postgresPool$q.rowCount;if (!(


              rowCount !== 1)) {_context.next = 12;break;}return _context.abrupt("return",
              res.status(404).json({ error: "user does not exist" }));case 12:return _context.abrupt("return",


              res.json({ id: id }));case 15:_context.prev = 15;_context.t0 = _context["catch"](2);

              console.error(_context.t0);
              res.status(500).json({ error: "server issue" });case 19:case "end":return _context.stop();}}}, _callee, null, [[2, 15]]);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}();


}