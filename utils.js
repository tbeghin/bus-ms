const constant = require('./constant');

const createUri = () => {
    return `amqp://${constant.user}:${constant.password}@${constant.uri}`;
};

module.exports = {
   createUri: createUri
};