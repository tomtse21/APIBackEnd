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
var cats_exports = {};
__export(cats_exports, {
  router: () => router
});
module.exports = __toCommonJS(cats_exports);
var import_koa_router = __toESM(require("koa-router"));
var import_koa_bodyparser = __toESM(require("koa-bodyparser"));
var model = __toESM(require("../models/cats"));
var import_auth = require("../controllers/auth");
const router = new import_koa_router.default({ prefix: "/api/v1/cats" });
const cats = [
  { name: "Hello article", fullText: "some text to fill the body" }
];
const getAll = async (ctx, next) => {
  let cats2 = await model.getAll();
  if (cats2.length) {
    ctx.body = cats2;
  } else {
    ctx.body = {};
  }
  await next();
};
const createCat = async (ctx, next) => {
  const body = ctx.request.body;
  let result = await model.add(body);
  if (result.status == 201) {
    ctx.status = 201;
    ctx.body = body;
  } else {
    ctx.status = 500;
    ctx.body = { err: "insert data failed" };
  }
  await next();
};
const updateCat = async (ctx, next) => {
  let id = +ctx.params.id;
  let c = ctx.request.body;
  let name = c.name;
  if (id < cats.length + 1 && id > 0) {
    cats[id - 1].name = name;
    ctx.status = 200;
    ctx.body = cats;
  } else {
    ctx.status = 404;
  }
  await next();
};
const deleteCat = async (ctx, next) => {
  let id = +ctx.params.id;
  let article = await model.deleteCat(id);
  if (article.status == 201) {
    ctx.status = 201;
    ctx.body = { msg: "Deleted" };
  } else {
    ctx.status = 404;
    ctx.body = { msg: "Error" };
  }
  await next();
};
const getById = async (ctx, next) => {
  let id = ctx.params.id;
  let article = await model.getById(id);
  if (article.length) {
    ctx.body = article[0];
  } else {
    ctx.status = 404;
  }
  await next();
};
router.get("/", getAll);
router.post("/", import_auth.basicAuth, (0, import_koa_bodyparser.default)(), createCat);
router.put("/:id([0-9]{1,})", import_auth.basicAuth, (0, import_koa_bodyparser.default)(), updateCat);
router.delete("/:id([0-9]{1,})", import_auth.basicAuth, deleteCat);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  router
});
//# sourceMappingURL=cats.js.map
