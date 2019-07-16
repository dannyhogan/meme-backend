require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Meme = require('../lib/models/Meme');

describe('test routes', () => {

  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  it('can create a meme using /POST', () => {
    return request(app)
      .post('/api/v1/memes')
      .send({ top: 'This is', bottom: 'a meme.', image: 'https://i.imgur.com/YXoqo5i.jpg' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          top: 'This is',
          bottom: 'a meme.',
          image: 'https://i.imgur.com/YXoqo5i.jpg',
          __v: 0
        });
      });
  });

  it('can get all memes using /GET', async() => {
    const meme = await Meme.create({ top: 'Elon', bottom: 'Musk', image: 'https://i.imgur.com/YXoqo5i.jpg' });

    return request(app)
      .get('/api/v1/memes')
      .then(res => {
        const memeJSON = JSON.parse(JSON.stringify(meme));
        expect(res.body[0]).toEqual(memeJSON);
      });
  });

  it('can get a meme by its ID using /get', async() => {
    const meme = await Meme.create({ top: 'Elon', bottom: 'Musk', image: 'https://i.imgur.com/YXoqo5i.jpg' });

    return request(app)
      .get(`/api/v1/memes/${meme._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          top: 'Elon',
          bottom: 'Musk',
          image: 'https://i.imgur.com/YXoqo5i.jpg',
          __v: 0
        });
      });
  });

  it('can update the bottom and top text of a meme using /patch', async() => {
    const meme = await Meme.create({ top: 'Elon', bottom: 'Musk', image: 'https://i.imgur.com/YXoqo5i.jpg' });

    return request(app)
      .patch(`/api/v1/memes/${meme._id}`)
      .send({ top: 'Musk', bottom: 'Elon' })
      .then(res => {
        expect(res.body.top).toEqual('Musk');
        expect(res.body.bottom).toEqual('Elon');
      });
  });

  it('can delete a meme by ID using /delete', async() => {
    const meme = await Meme.create({ top: 'Elon', bottom: 'Musk', image: 'https://i.imgur.com/YXoqo5i.jpg' });

    return request(app)
      .delete(`/api/v1/memes/${meme._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          top: 'Elon',
          bottom: 'Musk',
          image: 'https://i.imgur.com/YXoqo5i.jpg',
          __v: 0
        });
      });

  });
});
