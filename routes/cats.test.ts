import Koa from "koa";
import json from "koa-json";
import passport from 'koa-passport';
import { router } from '../routes/users';
import request from 'supertest';
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] }); // big_red_donkey


const app: Koa = new Koa();
app.use(json());
app.use(passport.initialize());
app.use(router.middleware());
app.listen(3000);

const prefix = '/api/v1/cats'

function genRandonString(length: any) {
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_&';
  var charLength = chars.length;
  var result = '';
  for (var i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
}

describe.only('Get / - a simple api endpoint for retrieve cats list', () => {
  test('Retrieve all cat information', async () => {
    const result = await
      request(app.callback()).get(`${prefix}/`);
    expect(result.statusCode).toEqual(201);
  })

})