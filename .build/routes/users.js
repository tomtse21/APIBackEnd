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
  router: () => router
});
module.exports = __toCommonJS(users_exports);
var import_koa_router = __toESM(require("koa-router"));
var import_koa_bodyparser = __toESM(require("koa-bodyparser"));
var model = __toESM(require("../models/users"));
const router = new import_koa_router.default({ prefix: "/api/v1/users" });
const regUser = async (ctx, next) => {
  const body = ctx.request.body;
  let result = await model.regUser(body);
  if (result.status == 201) {
    ctx.status = 201;
    ctx.body = body;
  } else {
    ctx.status = 500;
    ctx.body = { err: "insert data failed" };
  }
  await next();
};
const login = async (ctx, next) => {
  console.log(ctx.request.body);
  var obj = ctx.request.body;
  let result = await model.login(obj["username"], obj["password"]);
  if (result.length == 1) {
    ctx.status = 200;
    ctx.body = result;
  } else if (result.length == 0) {
    ctx.status = 500;
    ctx.body = { err: "Fail to login, please chcek your username or pssword" };
  }
  await next();
};
router.post("/", (0, import_koa_bodyparser.default)(), regUser);
router.post("/login", (0, import_koa_bodyparser.default)(), login);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  router
});
//# sourceMappingURL=users.js.map
