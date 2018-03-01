const http = require('http');
const app = require('../app');
const shared = require('./shared');
const port = shared.normalizePort(process.env.PORT || '3010');

app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', shared.onError);
server.on('listening', () => shared.onListening(server));