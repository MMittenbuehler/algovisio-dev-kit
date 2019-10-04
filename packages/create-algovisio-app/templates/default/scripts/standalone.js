const express = require('express');
const next = require('next');

const app = next({
  dev: true,
});
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.all(/\/[0-9]*/, (req, res) => handle(req, res));

    server.all('*', (req, res) => {
      res.redirect('/0');
    });

    server.listen(3001, (err) => {
      if (err) throw err;
      console.log('> standalone running on http://localhost:3001');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
