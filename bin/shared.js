let port = 3000;

/**
 * Normalize a port into a number, string, or false.
 * @param val
 * @returns {*}
 */
const normalizePort = val => {
    port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

/**
 * Event listener for HTTP server "error" event.
 * @param error
 */
const onError = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

/**
 * Event listener for HTTP server "listening" event.
 * @param server Server in progress.
 */
const onListening = server => {
    let address = server.address();
    let bind = typeof address === 'string'
        ? 'pipe ' + address
        : 'port ' + address.port;
    console.log(`Listening on ${bind}`);
};

module.exports = {
    normalizePort: normalizePort,
    onError: onError,
    onListening: onListening
};