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
var articles_exports = {};
__export(articles_exports, {
  add: () => add,
  getAll: () => getAll,
  getById: () => getById
});
module.exports = __toCommonJS(articles_exports);
var db = __toESM(require("../helpers/database"));
const getById = async (id) => {
  let query = "SELECT * FROM articles WHERE ID = ?";
  let values = [id];
  let data = await db.run_query(query, values);
  return data;
};
const getAll = async () => {
  let query = "SELECT * FROM articles";
  let data = await db.run_query(query, null);
  return data;
};
const add = async (article) => {
  let keys = Object.keys(article);
  let values = Object.values(article);
  let key = keys.join(",");
  let param = "";
  for (let i = 0; i < values.length; i++) {
    param += "? ,";
  }
  param = param.slice(0, -1);
  let query = `INSERT INTO articles (${key}) VALUES (${param})`;
  try {
    await db.run_insert(query, values);
    return { status: 201 };
  } catch (err) {
    return err;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  add,
  getAll,
  getById
});
//# sourceMappingURL=articles.js.map
