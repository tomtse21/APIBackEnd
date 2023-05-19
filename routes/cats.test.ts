import Koa from "koa";
import json from "koa-json";
import passport from 'koa-passport';
import { router } from '../routes/cats';
import request from 'supertest';
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] }); // big_red_donkey

const app: Koa = new Koa();
app.use(json());
app.use(passport.initialize());
app.use(router.middleware());
app.listen(3000);

const prefix = '/api/v1/cats'

describe('Get / - a simple api endpoint for retrieve cats list', () => {
  test('Retrieve all cat information', async () => {
    const result = await
      request(app.callback()).get(`${prefix}/`);
    expect(result.status).toEqual(201);
  })

})

describe('POST / - create cat info', () => {
  const body = {
    age: "1",
    color: "Red",
    description: "NTH",
    foundlocation: "HKI",
    name: randomName
  }
  const expectReturnBody = { msg: "Insert data successfully!" }

  test('Create cal info succuessfully', async () => {

    const result = await
      request(app.callback()).post(`${prefix}/`)
        .auth('bob', '1234')
        .send(JSON.parse(JSON.stringify(body)));
    expect(result.body).toEqual(expectReturnBody);
    expect(result.status).toEqual(201);
  })

})

describe('PUT / - Update cat info successfully', () => {
  const id = 1;
  const body = {
    age: "2",
    color: "Red",
    description: "NTH",
    foundlocation: "HKI",
    name: "Kitty"
  }
  const expectReturnBody = { msg: "Updated cat info" }

  test('Update cat info', async () => {

    const result = await
      request(app.callback()).put(`${prefix}/${id}`)
        .auth('bob', '1234')
        .send(JSON.parse(JSON.stringify(body)));
    expect(result.body).toEqual(expectReturnBody);
    expect(result.status).toEqual(201);
  })
})

describe('DELETE / - Delete cat info successfully', () => {
  const id = 1;
  const expectReturnBody = { msg: "Deleted" }

  test('delete cat info', async () => {

    const result = await
      request(app.callback()).delete(`${prefix}/${id}`)
        .auth('bob', '1234')
    expect(result.body).toEqual(expectReturnBody);
    expect(result.status).toEqual(201);
  })
})