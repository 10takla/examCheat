const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'monitors.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

server.use(router);

server.listen(8000, () => {
    console.log('server is running on 8000 port');
});
