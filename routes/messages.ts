import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from "../models/messages";
import { validateCat } from "../controllers/validation";
import { basicAuth } from "../controllers/auth";
import nodemailer from "nodemailer";

const router = new Router({ prefix: '/api/v1/messages' });


  
const sendMail = async (ctx: RouterContext, next: any) => {

  const body = JSON.parse(JSON.stringify(ctx.request.body))
  const testingOption = {
    from: "test227021367email@gmail.com",
    to: `${body.email}`,
    subject: "Message from your website",
    text: `Hi ${body.name},\n\nThank you for contacting us. Your message: ${body.message} .\n ${body.reply_content} \n\n\n\n Best Regards,\n Tom Tse \n The Pet Shelter`,
  };

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: "test227021367email@gmail.com",
      pass: "phxoygyiytbuqwfz",
    },
  });
  
  let messages =  await transporter.sendMail(testingOption);

  if (messages.length) {
    ctx.body = messages;
  } else {
    ctx.body = {};
  }
  await next();
}

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
router.post('/send-mail',basicAuth, bodyParser(),sendMail);

export { router };