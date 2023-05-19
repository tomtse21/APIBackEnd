import Koa from "koa";
import json from "koa-json";
import passport from 'koa-passport';
import { router } from './messages';
import request from 'supertest';
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] }); // big_red_donkey


const app: Koa = new Koa();
app.use(json());
app.use(passport.initialize());
app.use(router.middleware());
app.listen(3000);

const prefix = '/api/v1/messages'

// retrieve message session start
describe('Get / - a simple api endpoint for retrieve messages list successfully', () => {
  test('Retrieve all message information', async () => {
    const result = await
      request(app.callback()).get(`${prefix}/`);
    expect(result.status).toEqual(201);
  })

})

describe('Get / - a simple api endpoint for retrieve messages list failed', () => { //*
  test('Retrieve all message information', async () => {
    const result = await
      request(app.callback()).get(`${prefix}/`);
    expect(result.status).toEqual(204);
  })

})
// retrieve message session end

//create message session start
describe('POST / - create message info successfully', () => {
  const body = {
    cats_id: 127,
    email: "test227021367email@gmail.com",
    message: "i want this",
    name: randomName
  }
  const expectReturnBody = { msg: "Insert data successfully!" }

  test('Retrieve all message information', async () => {

    const result = await
      request(app.callback()).post(`${prefix}/`)
        .auth('bob', '1234')
        .send(JSON.parse(JSON.stringify(body)));
    expect(result.body).toEqual(expectReturnBody);
    expect(result.status).toEqual(201);
  })

})

describe('POST / - create message info failed', () => {
  const body = {
    cats_id: 127,
    email: "test227021367email@gmail.com",
    message: null,
    name: randomName
  }
  const expectReturnBody = { msg: "insert data failed!" }

  test('Retrieve all message information', async () => {

    const result = await
      request(app.callback()).post(`${prefix}/`)
        .auth('bob', '1234')
        .send(JSON.parse(JSON.stringify(body)));
    // expect(result.body).toEqual({expectReturnBody});
    expect(result.status).toEqual(204);
  })

})

//create message session end

// delete message session start
describe('DELETE / - delete message info successfully', () => {
  const id = 18;
  const expectReturnBody = { msg: "Deleted" }

  test('Delete message info', async () => {

    const result = await
      request(app.callback()).delete(`${prefix}/${id}`)
        .auth('bob', '1234')
    expect(result.body).toEqual(expectReturnBody);
    expect(result.status).toEqual(201);
  })
})

describe('DELETE / - delete message info failed', () => { //#
  const id = null;
  const expectReturnBody = { msg: "Error" }

  test('Delete message info', async () => {

    const result = await
      request(app.callback()).delete(`${prefix}/${id}`)
        .auth('bob', '1234')
    expect(result.body).toEqual(expectReturnBody);
    expect(result.status).toEqual(204);
  })
})
//delete message session end
//reply message session start
describe('POST / - reply message info successfully', () => {
  const body = {
    cats_id: 127,
    email: "test227021367email@gmail.com",
    message: "i want this",
    reply_content: " This is reply message ",
    name: 'Tom'
  }
  const expectReturnBody = { msg: "Error" }

  test('reply message info', async () => {

    const result = await
      request(app.callback()).post(`${prefix}/send-mail`)
        .auth('bob', '1234')
        .send(JSON.parse(JSON.stringify(body)));
    expect(result.status).toEqual(201);
  })

})

describe('POST / - reply message info failed', () => {
  const body = {
    cats_id: 127,
    email: null,
    message: "i want this",
    reply_content: " This is reply message ",
    name: 'Tom'
  }
  const expectReturnBody = { msg: "Error" }

  test('reply message info', async () => {

    const result = await
      request(app.callback()).post(`${prefix}/send-mail`)
        .auth('bob', '1234')
        .send(JSON.parse(JSON.stringify(body)));
    expect(result.status).toEqual(204);
  })

})
//reply message session end