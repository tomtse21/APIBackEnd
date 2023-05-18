import Koa from "koa";
import json from "koa-json";
import passport from 'koa-passport';
import { router } from '../routes/users';
import request from 'supertest';
const app: Koa = new Koa();
import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';

const config: Config = {
  dictionaries: [names]
}

const characterName: string = uniqueNamesGenerator(config);

app.use(json());
app.use(passport.initialize());
app.use(router.middleware());
app.listen(3000);

const prefix = '/api/v1/users'

function genRandonString(length: any) {
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_&';
  var charLength = chars.length;
  var result = '';
  for (var i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
}


const randomStrName = genRandonString(10);
const randomStrPwd = genRandonString(5);
const randomEmail = `${genRandonString(7)}@gmail.com`

describe('Post / - a simple api endpoint for create account successfully', () => {

  const body = {
    email: randomEmail,
    password: randomStrPwd,
    username: randomStrName + ''
  }
  test('Register account', async () => {
    const result = await
      request(app.callback()).post(`${prefix}/`)
        .send(JSON.parse(JSON.stringify(body)));
    expect(result.statusCode).toEqual(201);
  })

})

describe('Post / - a simple api endpoint for create account failed', () => {

  const body = {
    email: randomEmail,
    password: randomStrPwd + `test`,
    username: randomStrName
  }
  test('Register account', async () => {
    const result = await
      request(app.callback()).post(`${prefix}/`)
        .send(JSON.parse(JSON.stringify(body)));
    expect(result.statusCode).toEqual(500);
  })

})

describe('Post / - login endpoint successfully', () => {

  const body = {
    password: randomStrPwd,
    username: randomStrName
  }
  test('Register account', async () => {
    const result = await
      request(app.callback()).post(`${prefix}/login`)
        .send(JSON.parse(JSON.stringify(body)));
    expect(result.statusCode).toEqual(200);
  })

})

describe('Post / - login endpoint failed', () => {

  const body = {
    password: randomStrPwd + `test`,
    username: randomStrName
  }
  test('Register account', async () => {
    const result = await
      request(app.callback()).post(`${prefix}/login`)
        .send(JSON.parse(JSON.stringify(body)));
    expect(result.statusCode).toEqual(500);
  })

})