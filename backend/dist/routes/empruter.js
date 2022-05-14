"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.emprunter = void 0;var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _express = require("express");
var _sqlTemplateStrings = _interopRequireDefault(require("sql-template-strings"));
var _db = require("../db");
var _multer = _interopRequireDefault(require("../multer"));
var _qrCodeGen = require("../qrCodeGen");
var _sendEmail = require("../sendEmail");var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {(0, _defineProperty2["default"])(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}

var emprunter = (0, _express.Router)();exports.emprunter = emprunter;
emprunter.get('/emprunters', /*#__PURE__*/function () {var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {var _yield$postgresPool$q, rows;return _regenerator["default"].wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:if (!(
            req.user.role !== 'library')) {_context.next = 2;break;}return _context.abrupt("return",
            res.status(401).json({ error: 'you are not authorized' }));case 2:_context.prev = 2;_context.next = 5;return (



              _db.postgresPool.query((0,
              _sqlTemplateStrings["default"])(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n          SELECT\n          users.*,\n          books.title as title,\n          students_books.*\n          FROM\n          students_books\n          INNER JOIN users ON users.id = students_books.student_id\n          INNER JOIN books ON books.id = students_books.book_id \n          "])))));case 5:_yield$postgresPool$q = _context.sent;rows = _yield$postgresPool$q.rows;return _context.abrupt("return",










            res.json({
              emprunters: rows.map(function (e) {return _objectSpread(_objectSpread({},
                e), {}, {
                  createdAt: new Date(e.created_at).toLocaleString('en', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit' }) });}) }));case 10:_context.prev = 10;_context.t0 = _context["catch"](2);




            console.error(_context.t0);
            res.status(500).json({ error: 'server issue' });case 14:case "end":return _context.stop();}}}, _callee, null, [[2, 10]]);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}());



emprunter.get('/emprunter', /*#__PURE__*/function () {var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {var id, _yield$postgresPool$q2, rows, e;return _regenerator["default"].wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
            id = req.query.id;_context2.prev = 1;_context2.next = 4;return (


              _db.postgresPool.query((0,
              _sqlTemplateStrings["default"])(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n          SELECT\n          users.*,\n          books.*,\n          students_books.*\n          FROM\n          students_books\n          INNER JOIN users ON users.id = students_books.student_id\n          INNER JOIN books ON books.id = students_books.book_id \n          where students_books.id = ", "\n          "])),








              id)));case 4:_yield$postgresPool$q2 = _context2.sent;rows = _yield$postgresPool$q2.rows;if (!(


            rows.length === 0)) {_context2.next = 8;break;}return _context2.abrupt("return",
            res.status(404).json({ error: 'does not exist' }));case 8:


            e = rows[0];return _context2.abrupt("return",
            res.json({
              emprunter: _objectSpread(_objectSpread({},
              e), {}, {
                createdAt: new Date(e.created_at).toLocaleString('en', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit' }) }) }));case 12:_context2.prev = 12;_context2.t0 = _context2["catch"](1);




            console.error(_context2.t0);
            res.status(500).json({ error: 'server issue' });case 16:case "end":return _context2.stop();}}}, _callee2, null, [[1, 12]]);}));return function (_x3, _x4) {return _ref2.apply(this, arguments);};}());



emprunter.post(
'/emprunter/add',
_multer["default"].none(), /*#__PURE__*/
/**
                                          *
                                          * @param {import('../middleware/authorization').MyRequest} req
                                          */function () {var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(

  function _callee3(req, res) {var _req$body, student, book, params, _i, _params, p, _yield$postgresPool$q3, bookObj, _yield$postgresPool$q4, studentObj, _yield$postgresPool$q5, id, __html;return _regenerator["default"].wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:if (!(
            req.user.role !== 'library')) {_context3.next = 2;break;}return _context3.abrupt("return",
            res.status(401).json({ error: 'you are not authorized' }));case 2:_req$body =


            req.body, student = _req$body.student, book = _req$body.book;
            params = [student, book];_i = 0, _params =
            params;case 5:if (!(_i < _params.length)) {_context3.next = 12;break;}p = _params[_i];if (!(
            typeof p !== 'string')) {_context3.next = 9;break;}return _context3.abrupt("return",
            res.status(400).json({ error: 'bad params ' + p }));case 9:_i++;_context3.next = 5;break;case 12:_context3.prev = 12;_context3.next = 15;return (






              _db.postgresPool.query((0,
              _sqlTemplateStrings["default"])(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2["default"])(["\n      SELECT\n      *\n      FROM\n      books\n      where id = ", "\n      "])),




              book)));case 15:_yield$postgresPool$q3 = _context3.sent;bookObj = _yield$postgresPool$q3.rows[0];if (


            bookObj) {_context3.next = 19;break;}return _context3.abrupt("return",
            res.status(404).json({ error: 'book does not exist' }));case 19:_context3.next = 21;return (




              _db.postgresPool.query((0,
              _sqlTemplateStrings["default"])(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2["default"])(["\n        SELECT\n        *\n        FROM\n        users\n        where id = ", " AND role = 'student'\n        "])),




              student)));case 21:_yield$postgresPool$q4 = _context3.sent;studentObj = _yield$postgresPool$q4.rows[0];if (


            studentObj) {_context3.next = 25;break;}return _context3.abrupt("return",
            res.status(404).json({ error: 'student does not exist' }));case 25:_context3.next = 27;return (






              _db.postgresPool.query((0,
              _sqlTemplateStrings["default"])(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2["default"])(["\n          INSERT INTO\n          students_books\n          (student_id, book_id, created_at)\n          VALUES\n          (", ", ", ", ", ")\n          RETURNING id\n          "])),




              student, book, new Date().toString())));case 27:_yield$postgresPool$q5 = _context3.sent;id = _yield$postgresPool$q5.rows[0].id;



            __html = "\n      <div>\n        Hello ".concat(

            studentObj.firstname, " ").concat(studentObj.lastname.toUpperCase(), ",\n      </div>\n      <div>\n        You have borrowed a book ").concat(


            bookObj.title, " successfuly by the ").concat(
            req.user.firstname, " ").concat(
            req.user.lastname.toUpperCase(), ".\n      </div>\n      <div>\n      Your borrow QR badge is attached bellow\n      </div>\n");_context3.t0 =






            _sendEmail.sendEmail;_context3.t1 =
            studentObj.email;_context3.t2 =

            __html;_context3.next = 35;return (



              (0, _qrCodeGen.qrCodeGen)(JSON.stringify({ emprunterID: id })));case 35:_context3.t3 = _context3.sent;_context3.t4 = { filename: 'Your borrow budget', path: _context3.t3 };_context3.t5 = [_context3.t4];_context3.t6 = { to: _context3.t1, subject: 'Book Borrow Process', html: _context3.t2, attachments: _context3.t5 };(0, _context3.t0)(_context3.t6);



            res.json({ id: id, student: student, book: book });_context3.next = 47;break;case 43:_context3.prev = 43;_context3.t7 = _context3["catch"](12);

            console.error(_context3.t7);
            res.status(500).json({ error: 'server issue' });case 47:case "end":return _context3.stop();}}}, _callee3, null, [[12, 43]]);}));return function (_x5, _x6) {return _ref3.apply(this, arguments);};}());




emprunter.post('/emprunter/remove', _multer["default"].none(), /*#__PURE__*/function () {var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {var id, _yield$postgresPool$q6, studentBook, _yield$postgresPool$q7, rowCount, __html;return _regenerator["default"].wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:if (!(
            req.user.role !== 'library')) {_context4.next = 2;break;}return _context4.abrupt("return",
            res.status(401).json({ error: 'you are not authorized' }));case 2:_context4.prev = 2;



            id = req.body.id;_context4.next = 6;return (


              _db.postgresPool.query((0,
              _sqlTemplateStrings["default"])(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2["default"])(["\n      SELECT\n      *\n      FROM\n      students_books\n      INNER JOIN users ON users.id = students_books.student_id\n      INNER JOIN books ON books.id = students_books.book_id\n      WHERE students_books.id = ", "\n      "])),






              id)));case 6:_yield$postgresPool$q6 = _context4.sent;studentBook = _yield$postgresPool$q6.rows[0];_context4.next = 10;return (


              _db.postgresPool.query((0,
              _sqlTemplateStrings["default"])(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2["default"])(["\n        DELETE\n        FROM\n        students_books\n        WHERE\n        id = ", "\n        "])),




              id)));case 10:_yield$postgresPool$q7 = _context4.sent;rowCount = _yield$postgresPool$q7.rowCount;if (!(


            rowCount === 0)) {_context4.next = 14;break;}return _context4.abrupt("return",
            res.status(404).json({ error: 'does not exist' }));case 14:


            __html = "\n    <div>\n      Hello ".concat(

            studentBook.firstname, " ").concat(studentBook.lastname.toUpperCase(), ",\n    </div>\n    <div>\n      Your loan is returned ").concat(


            studentBook.title, " successfuly by the ").concat(
            req.user.firstname, " ").concat(
            req.user.lastname.toUpperCase(), ".\n    </div>\n");



            (0, _sendEmail.sendEmail)({
              to: studentBook.email,
              subject: 'Book Borrow Process Done',
              html: __html });

            res.json({ id: id });_context4.next = 23;break;case 19:_context4.prev = 19;_context4.t0 = _context4["catch"](2);

            console.error(_context4.t0);
            res.status(500).json({ error: 'server issue' });case 23:case "end":return _context4.stop();}}}, _callee4, null, [[2, 19]]);}));return function (_x7, _x8) {return _ref4.apply(this, arguments);};}());