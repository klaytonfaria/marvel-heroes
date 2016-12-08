/* eslint-disable no-console, no-use-before-define */

import Express from 'express';
import webpack from 'webpack';
import React from 'react';
import { renderToString } from 'react-dom/server';
import webpackDevMiddleware from 'webpack-dev-middleware';
import jsdom from 'jsdom';

// import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config';

const app = new Express();
const port = 3002;

// set up webpack hot module.
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

// app.use(webpackHotMiddleware(compiler));
app.use(handleRender);

function handleRender(req, res) {
  const html = renderToString(
    <h1>Dot from server</h1>
  );
  renderFullPage(html, res);
}


function getFile(fileLocation, cb) {
  jsdom.env(
    fileLocation,
    (err, window) => {
      if (cb && typeof cb === 'function') {
        cb(window);
      }
    }
  );
}

// TODO: get from file
function renderFullPage(html, res) {
  getFile(`${__dirname}/../client/index.html`, (window) => {
    window.document.getElementById('app').innerHTML = html;
    res.send(window.document.documentElement.outerHTML);
  }
  );
}

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`Zstore is running on http://localhost:${port}/`);
  }
});
