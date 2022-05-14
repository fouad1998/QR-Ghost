"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.genSettings = genSettings;exports.meal = void 0;var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _authorization = require("../middleware/authorization");
var _db = require("../db");
var _express = require("express");
var _sqlTemplateStrings = _interopRequireDefault(require("sql-template-strings"));
var _moment = _interopRequireDefault(require("moment"));var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {(0, _defineProperty2["default"])(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}

var meal = (0, _express.Router)();exports.meal = meal;

meal.get(
'/meal', /*#__PURE__*/
/**
                        *
                        * @param {MyRequest} req
                        */function () {var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(
  function _callee(req, res) {var now, _yield$postgresPool$q, rows, _yield$postgresPool$q2, s, settings, selectedMeal, selectedLabel, _i, _arr, k, wantedMoment, startsMoment, endMoment, _yield$postgresPool$q3, _rows;return _regenerator["default"].wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.prev = 0;




            now = (0, _moment["default"])();_context.next = 4;return (
              _db.postgresPool.query((0,
              _sqlTemplateStrings["default"])(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n        SELECT\n        *\n        FROM\n        meals\n        WHERE\n        created_at > ", " AND end_at < ", " \n      "])),





              now.unix(), now.unix())));case 4:_yield$postgresPool$q = _context.sent;rows = _yield$postgresPool$q.rows;if (!(


            rows.length !== 0)) {_context.next = 8;break;}return _context.abrupt("return",
            res.json({ meal: rows[0] }));case 8:_context.next = 10;return (


              _db.postgresPool.query((0,
              _sqlTemplateStrings["default"])(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n      SELECT\n      label, value\n      FROM\n      settings\n      "])))));case 10:_yield$postgresPool$q2 = _context.sent;s = _yield$postgresPool$q2.rows;







            settings = genSettings(s);
            selectedMeal = undefined;
            selectedLabel = undefined;_i = 0, _arr =
            ['breakfast', 'lunch', 'dinar'];case 16:if (!(_i < _arr.length)) {_context.next = 26;break;}k = _arr[_i];
            wantedMoment = (0, _moment["default"])().
            startOf('day').
            add(settings[k].stops.split(':')[0], 'hours').
            add(settings[k].stops.split(':')[1], 'minutes');if (!

            now.isBefore(wantedMoment)) {_context.next = 23;break;}
            selectedMeal = settings[k];
            selectedLabel = k;return _context.abrupt("break", 26);case 23:_i++;_context.next = 16;break;case 26:if (!(




            selectedMeal === void 0)) {_context.next = 28;break;}return _context.abrupt("return",
            res.status(404).json({ error: 'no meal left for today' }));case 28:


            startsMoment = (0, _moment["default"])().
            startOf('day').
            add(selectedMeal.starts.split(':')[0], 'hours').
            add(selectedMeal.starts.split(':')[1], 'minutes');if (!
            now.isSameOrAfter(startsMoment)) {_context.next = 36;break;}
            endMoment = (0, _moment["default"])().
            startOf('day').
            add(selectedMeal.stops.split(':')[0], 'hours').
            add(selectedMeal.stops.split(':')[1], 'minutes');_context.next = 33;return (
              _db.postgresPool.query((0,
              _sqlTemplateStrings["default"])(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2["default"])(["\n        INSERT\n        INTO\n        meals\n        (label, created_at, end_at)\n        VALUES\n        (", ", ", ", ", ")\n        RETURNING id, label, created_at, end_at\n        "])),





              selectedLabel, (0, _moment["default"])().unix(), endMoment.unix())));case 33:_yield$postgresPool$q3 = _context.sent;_rows = _yield$postgresPool$q3.rows;return _context.abrupt("return",



            res.json({ meal: _objectSpread(_objectSpread({}, _rows[0]), selectedMeal) }));case 36:return _context.abrupt("return",


            res.json({ selectedMeal: selectedMeal, selectedLabel: selectedLabel }));case 39:_context.prev = 39;_context.t0 = _context["catch"](0);

            console.error(_context.t0);
            res.status(500).json({ error: 'server issue' });case 43:case "end":return _context.stop();}}}, _callee, null, [[0, 39]]);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}());




meal.post(
'/check', /*#__PURE__*/
/**
                         *
                         * @param {MyRequest} req
                         */function () {var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(
  function _callee2(req, res) {var _req$body, userID, mealID, _yield$postgresPool$q4, rows, _yield$postgresPool$q5, a;return _regenerator["default"].wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.prev = 0;_req$body =

            req.body, userID = _req$body.userID, mealID = _req$body.mealID;_context2.next = 4;return (
              _db.postgresPool.query((0, _sqlTemplateStrings["default"])(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2["default"])(["\n      SELECT\n      *\n      FROM\n      students_meals\n      WHERE user_id = ", " AND meal_id = ", "\n    "])),




              userID, mealID)));case 4:_yield$postgresPool$q4 = _context2.sent;rows = _yield$postgresPool$q4.rows;if (!(

            rows.length !== 0)) {_context2.next = 8;break;}return _context2.abrupt("return",
            res.status(401).json({ error: 'member already' }));case 8:_context2.next = 10;return (




              _db.postgresPool.query((0, _sqlTemplateStrings["default"])(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2["default"])(["\n      INSERT INTO\n      students_meals\n      (user_id, meal_id)\n      VALUES\n      (", ", ", ")\n      RETURNING *\n      "])),




              userID, mealID)));case 10:_yield$postgresPool$q5 = _context2.sent;a = _yield$postgresPool$q5.rows[0];


            res.json(_objectSpread({}, a));_context2.next = 19;break;case 15:_context2.prev = 15;_context2.t0 = _context2["catch"](0);

            console.error(_context2.t0);
            res.status(500).json({ error: 'servre issue' });case 19:case "end":return _context2.stop();}}}, _callee2, null, [[0, 15]]);}));return function (_x3, _x4) {return _ref2.apply(this, arguments);};}());




function genSettings(settings) {
  return settings.reduce(function (p, e) {return _objectSpread(_objectSpread({}, p), {}, (0, _defineProperty2["default"])({}, e.label, e.value));}, {});
}