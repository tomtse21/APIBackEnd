import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from "../models/cats";
import { validateCat } from "../controllers/validation";
import { basicAuth } from "../controllers/auth";

const router = new Router({ prefix: '/api/v1/cats' });


const cats = [
  { name: 'Hello cat', fullText: 'some text to fill the body' }
];

const getAll = async (ctx: RouterContext, next: any) => {
  //ctx.body = cats;
  let cats = await model.getAll();
  if (cats.length) {
    ctx.body = cats;
  } else {
    ctx.body = {};
  }
  await next();
}


const createCat = async (ctx: RouterContext, next: any) => {
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
}

const updateCat = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;
  const body = ctx.request.body;
  let cat = await model.updateCat(id,body);
  if (cat.status==201) {
    ctx.status = 201
    ctx.body = { msg: "Updated cat info" }
  } else {
    ctx.status = 404;
    ctx.body = { msg: "Error" }
  }
  
  await next();
}

const deleteCat = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;
  let cat = await model.deleteCat(id);
  if (cat.status==201) {
    ctx.status = 201
    ctx.body = { msg: "Deleted" }
  } else {
    ctx.status = 404;
    ctx.body = { msg: "Error" }
  }
  await next();
}

const getById = async (ctx: RouterContext, next: any) => {
  let id = ctx.params.id;
  let cat = await model.getById(id);
  if (cat.length) {
    ctx.body = cat[0];
  } else {
    ctx.status = 404;
  }
  await next();
}


router.get('/', getAll);
router.post('/', basicAuth, bodyParser(), createCat);
router.put('/:id([0-9]{1,})', basicAuth, bodyParser(), updateCat);
router.delete('/:id([0-9]{1,})', basicAuth, deleteCat);


export { router };