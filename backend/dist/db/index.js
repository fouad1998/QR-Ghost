"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.postgresPool = void 0;var _pg = require("pg");

var postgresPool = new _pg.Pool({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || ""),
  min: 0,
  max: 0xffff,
  password: process.env.DATABASE_PASSWORD,
  user: process.env.DATABASE_USERNAME,
  database: process.env.DATABASE_DATABASE });exports.postgresPool = postgresPool;