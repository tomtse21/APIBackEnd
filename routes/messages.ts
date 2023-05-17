import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from "../models/messages";
import { validateCat } from "../controllers/validation";
import { basicAuth } from "../controllers/auth";

const router = new Router({ prefix: '/api/v1/messages' });

const getAll = async (ctx: RouterContext, next: any) => {
  //ctx.body = messages;
  let messages = await model.getAll();
  if (messages.length) {
    ctx.body = messages;
  } else {
    ctx.body = {};
  }
  await next();
}


const createMessage = async (ctx: RouterContext, next: any) => {
  const body = ctx.request.body;
  let result = await model.add(body);
  if (result.status == 201) {
    ctx.status = 201;
    ctx.body = {msg:'Insert data successfully!'};
  } else {
    ctx.status = 404;
    ctx.body = { msg: "insert data failed" };
  }
  await next();
}



const deleteMessage = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;
  let message = await model.deleteMessage(id);
  if (message.status==201) {
    ctx.status = 201
    ctx.body = { msg: "Deleted" }
  } else {
    ctx.status = 404;
    ctx.body = { msg: "Error" }
  }
  await next();
}


const updateMessage = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;
  console.log(id);
  const body = ctx.request.body;
  let message = await model.updateMessage(id,body);
  if (message.status==201) {
    ctx.status = 201
    ctx.body = { msg: "Updated message info" }
  } else {
    ctx.status = 404;
    ctx.body = { msg: "Error" }
  }
  
  await next();
}

router.get('/', getAll);
router.post('/', bodyParser(), createMessage);
router.put('/:id([0-9]{1,})', basicAuth, bodyParser(), updateMessage);
router.delete('/:id([0-9]{1,})', basicAuth, deleteMessage);


export { router };