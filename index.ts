import Koa from "koa";
import Router, { RouterContext } from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import passport from 'koa-passport';

import { router as users } from "./routes/users";
import { router as cats } from "./routes/cats";
import { router as messages } from "./routes/messages";
import { router as special } from './routes/special';
import serve from 'koa-static-folder';
import cors from '@koa/cors';

const { koaBody } = require('koa-body');
const bodyParser = require('koa-bodyparser')


const app: Koa = new Koa();
// For Document:
app.use(serve('./docs'));
app.use(cors());
app.use(logger());
app.use(json());

app.use(koaBody({
  multipart: true,
  formLimit: "10mb",
  jsonLimit: "10mb"
}));
app.use(bodyParser({
  formLimit: "10mb",
  jsonLimit: "10mb"
}));
app.use(passport.initialize());
app.use(users.middleware());
app.use(cats.middleware());
app.use(messages.middleware());
app.use(special.middleware());



app.use(async (ctx: RouterContext, next: any) => {
  try {
    await next();
    if (ctx.status === 404) {
      ctx.body = { err: "Resource not found" };
    }
  } catch (err: any) {
    ctx.body = { err: err };
  }

});

app.listen(10888);