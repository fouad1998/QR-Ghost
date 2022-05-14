"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = void 0;var _multer = _interopRequireDefault(require("multer"));

var MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png" };


var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, callback) {
    callback(null, "public");
  },
  filename: function filename(req, file, callback) {
    var name = file.originalname.split(".").join("_").split(" ").join("_");
    var extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  } });var _default =



(0, _multer["default"])({ storage: storage });exports["default"] = _default;