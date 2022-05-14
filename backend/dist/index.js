"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");require("dotenv/config");
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _authorization = require("./middleware/authorization");
var _libraries = require("./routes/libraries");
var _login = require("./routes/login");
var _restaurants = require("./routes/restaurants");
var _students = require("./routes/students");
var _path = _interopRequireDefault(require("path"));
var _me = require("./routes/me");
var _user = require("./routes/user");
var _morgan = _interopRequireDefault(require("morgan"));
var _book = require("./routes/book");
var _empruter = require("./routes/empruter");
var _meal = require("./routes/meal");
var app = (0, _express["default"])();
var port = 3000;

app.use((0, _cors["default"])());
app.use(_express["default"]["static"](_path["default"].resolve(__dirname, "../public")));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({ extended: true }));
app.use((0, _morgan["default"])(":date[iso] :remote-addr :method :url :status :res[content-length] - :response-time ms"));
app.use(_login.login);
// Keep the order
app.use(_authorization.authorization);
app.use(_students.students);
app.use(_restaurants.restaurants);
app.use(_libraries.libraries);
app.use(_me.me);
app.use(_user.user);
app.use(_book.book);
app.use(_empruter.emprunter);
app.use(_meal.meal);
app.listen(port, function () {
  console.log("Example app listening on port ".concat(port));
});