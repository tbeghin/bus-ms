const rabbitmq = require('amqplib');
const utils = require('../utils');
const channelModule = require("./channel");
let rabbitConnection;

const connect = () => {
    return new Promise((resolve, reject) => {
        rabbitmq.connect(utils.createUri())
            .then(
                connection => channelModule.newChannel(connection),
                err => reject(err)
            )
            .then(
                data => resolve(data),
                err => reject(err)
            )
            .catch(
                reason => reject(reason)
            )
    });
};

const disconnect = () => {
    return new Promise((resolve, reject) => {
        rabbitConnection.close()
            .then(
                () => {
                    resolve('disconnection OK');
                },
                err => reject(err)
            )
            .catch(
                reason => reject(reason)
            );
    });
};

const connection = isConnecting => {
    if (isConnecting) {
        return connect();
    } else {
        return disconnect();
    }
};

const getConnection = () => {
    if (!!rabbitConnection) {
        console.log(`Get connection`);
        return rabbitConnection;
    } else {
        console.log(`rabbitConnection is null`);
        return null
    }
};

module.exports = {
    connection: connection,
    getConnection: getConnection
};
