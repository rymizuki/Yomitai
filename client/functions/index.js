const functions = require('firebase-functions');
const express = require('express');
const { Nuxt } = require('nuxt');

const config = require('./nuxt.config.js')
const app = express();
const nuxt = new Nuxt(config);

app.use(function (req, res) {
  res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
  return new Promise((resolve, reject) => {
    nuxt.render(req, res, (promise) => {
      promise.then(resolve).catch(reject);
    });
  });
});

exports.ssrapp = functions.https.onRequest(app);
