"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var users_exports = {};
__export(users_exports, {
  findByUsername: () => findByUsername,
  login: () => login,
  regUser: () => regUser
});
module.exports = __toCommonJS(users_exports);
var db = __toESM(require("../helpers/database"));
const findByUsername = async (username) => {
  const query = "SELECT * from users where username = ?";
  const user = await db.run_query(query, [username]);
  return user;
};
const regUser = async (user) => {
  let keys = Object.keys(user);
  let values = Object.values(user);
  let key = keys.join(",");
  let param = "";
  for (let i = 0; i < values.length; i++) {
    param += "? ,";
  }
  param = param.slice(0, -1);
  let query = `INSERT INTO users (${key}) VALUES (${param})`;
  try {
    await db.run_insert(query, values);
    return { status: 201 };
  } catch (err) {
    return err;
  }
};
const login = async (username, password) => {
  const query = "SELECT * from users where username = ? and password = ?";
  const user = await db.run_query(query, [username, password]);
  return user;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  findByUsername,
  login,
  regUser
});
//# sourceMappingURL=users.js.map
