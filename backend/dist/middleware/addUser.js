"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.addUser = addUser;var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _sqlTemplateStrings = _interopRequireDefault(require("sql-template-strings"));
var _db = require("../db");
var _qrCodeGen = require("../qrCodeGen");
var _sendEmail = require("../sendEmail");var _templateObject;var _excluded = ["username", "firstname", "lastname", "email", "password"];function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {(0, _defineProperty2["default"])(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}

function addUser(kind, allowed) {
  /**
                                  *
                                  * @param {import("./authorization").MyRequest} req
                                  */
  return /*#__PURE__*/function () {var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {var _req$body, username, firstname, lastname, email, password, other, params, _i, _params, p, extra, _yield$postgresPool$q, id, __html;return _regenerator["default"].wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:if (
              allowed.some(function (e) {return e === req.user.role;})) {_context.next = 2;break;}return _context.abrupt("return",
              res.status(401).json({ error: "You are not authorized" }));case 2:_context.prev = 2;_req$body =




              req.body, username = _req$body.username, firstname = _req$body.firstname, lastname = _req$body.lastname, email = _req$body.email, password = _req$body.password, other = (0, _objectWithoutProperties2["default"])(_req$body, _excluded);
              params = [username, firstname, lastname, email, password];_i = 0, _params =
              params;case 6:if (!(_i < _params.length)) {_context.next = 14;break;}p = _params[_i];if (!(
              typeof p !== "string")) {_context.next = 11;break;}
              console.log(p);return _context.abrupt("return",
              res.status(400).json({ error: "bad params " + p }));case 11:_i++;_context.next = 6;break;case 14:



              extra = _objectSpread({}, other);_context.next = 17;return (




                _db.postgresPool.query((0,
                _sqlTemplateStrings["default"])(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n         INSERT INTO\n         users\n         (username, firstname, lastname, email, password, role, picture, extra)\n         VALUES\n         (", ", ", ", ", ", ", ", CRYPT(", ", gen_salt('bf')), ", ", ", ", ", ")\n         RETURNING id\n         "])),




                username, firstname, lastname, email, password, kind, req.file.filename, extra)));case 17:_yield$postgresPool$q = _context.sent;id = _yield$postgresPool$q.rows[0].id;



              __html = "\n<div>\n  Hello ".concat(

              firstname, " ").concat(lastname.toUpperCase(), ",\n</div>\n<div>\n  You are subscribed in QR-Ghost by ").concat(



              req.user.firstname, " ").concat(
              req.user.lastname.toUpperCase(), ". So welcome to our plateform\n</div>\n<div>\nYour username is: ").concat(


              username, "\n</div>\n<div>\nemail is : ").concat(


              email, "\n</div\n<div>\npassword is: <strong>").concat(


              password, "</strong>\n</div>\n<div>\nqr code is attached to this email\n</div>");_context.t0 =





              _sendEmail.sendEmail;_context.t1 =
              email;_context.t2 =

              __html;_context.next = 25;return (



                (0, _qrCodeGen.qrCodeGen)(JSON.stringify({ userID: id })));case 25:_context.t3 = _context.sent;_context.t4 = { filename: "You budget", path: _context.t3 };_context.t5 = [_context.t4];_context.t6 = { to: _context.t1, subject: "Inscription to QR Ghost", html: _context.t2, attachments: _context.t5 };(0, _context.t0)(_context.t6);return _context.abrupt("return",



              res.json({ id: id, username: username, firstname: firstname, lastname: lastname, email: email, extra: extra }));case 33:_context.prev = 33;_context.t7 = _context["catch"](2);

              console.error(_context.t7);
              res.status(500).json({ error: "server issue" });case 37:case "end":return _context.stop();}}}, _callee, null, [[2, 33]]);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}();


}