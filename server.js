const fs = require('fs');
const path = require('path');
const async = require('async');
const favicon = require('serve-favicon');
const proxy = require('http-proxy-middleware'); // 来处理跨域
const csp = require('helmet-csp');
const express = require('express');

const app = express();

const isProd = process.env.NODE_ENV === 'production';
const resolve = file => path.resolve(__dirname, file); // 相对路径转绝对路径,若以/开头，则抛弃前面所有路径

let template = null;
let devServerComplier;
if (!isProd) {
  devServerComplier = require('./build/setup-dev-server')(app);
}

const serve = (urlPath, cache) => {
  return express.static(resolve(urlPath), {
    maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0,
  });
};

const registerApiRoute = () => {
  app.use(
    '/api/*',
    proxy({
      target: 'http://localhost:8001',
      changeOrigin: true,
    }),
  );
};

const registerSecuretyMiddleware = () => {
  app.use(
    csp({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        imgSrc: ['https'],
        connectSrc: ["'self'"],
      },
      setAllHeaders: true,
    }),
  );
};
const registerDefaultMiddleware = () => {
  app.use(favicon('./public/favicon.ico'));
  app.use('/dist', serve('./dist/', true));
  app.use('/public', serve('./public/', true));
  app.get('*', (req, res, next) => {
    if (req.path === '/' || !/(login|home|movie|cinema|board)/.test(req.path)) {
      return res.redirect('/home');
    }
    next();
  });
};

async.waterfall(
  [
    function register(cb) {
      registerApiRoute();
      registerDefaultMiddleware();
      // registerSecuretyMiddleware();
      app.get('*', (req, res) => {
        res.end(template);
      });

      if (devServerComplier) {
        devServerComplier.then(data => {
          template = data;
          cb();
        });
      } else {
        template = fs.readFileSync(resolve('./dist/index.html'), 'utf-8');
        cb();
      }
    },
  ],
  function setup() {
    const port = process.env.PORT || 9000;
    app.listen(port, () => {
      console.log(`${isProd ? 'server' : 'dev server'} is listening on:${port}`);
    });
  },
);
