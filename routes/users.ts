import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from "../models/users";
import { validateUser } from "../controllers/validation";
import { basicAuth } from "../controllers/auth";

const router = new Router({ prefix: '/api/v1/users' });

const regUser = async(ctx: RouterContext, next: any) => {
    const body = ctx.request.body;
    let result = await model.regUser(body)
    if (result.status == 201) {
      ctx.status = 201;
      ctx.body = body;
    } else {
      ctx.status = 500;
      ctx.body = { err: "insert data failed" };
    }
    await next();
}


const login = async(ctx: RouterContext, next: any) => {
  const body = ctx.request.body;
  
  if (true) {
    ctx.status = 201;
    ctx.body = body;
  } else {
    ctx.status = 500;
    ctx.body = { err: "insert data failed" };
  }
  await next();
}

router.post('/', bodyParser(), regUser);
router.post('/login', bodyParser(), validateUser, login); // when using auth login please use basicAuth and validateXXX


export {router};