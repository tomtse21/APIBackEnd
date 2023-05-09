"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_koa = __toESM(require("koa"));
var import_koa_logger = __toESM(require("koa-logger"));
var import_koa_json = __toESM(require("koa-json"));
var import_koa_passport = __toESM(require("koa-passport"));
var import_articles = require("./routes/articles");
var import_users = require("./routes/users");
var import_special = require("./routes/special");
var import_cors = __toESM(require("@koa/cors"));
var serve = require("koa-static-server");
const app = new import_koa.default();
app.use((0, import_cors.default)());
app.use((0, import_koa_logger.default)());
app.use((0, import_koa_json.default)());
app.use(import_koa_passport.default.initialize());
app.use(import_users.router.middleware());
app.use(import_articles.router.middleware());
app.use(import_special.router.middleware());
app.use(async (ctx, next) => {
  try {
    await next();
    console.log(ctx.status);
    if (ctx.status === 404) {
      ctx.body = { err: "Resource not found" };
    }
  } catch (err) {
    ctx.body = { err };
  }
});
app.listen(10888);
//# sourceMappingURL=index.js.map
