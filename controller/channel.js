let channel = [];

const newChannel = (connection) => {
    return new Promise((resolve, reject) => {
        connection.createChannel()
            .then(
                ch => {
                    channel.push(ch);
                    resolve('OK');
                },
                err => reject(err)
            )
            .catch(
                reason => reject(reason)
            );
    });
};

const createQueue = (queue) => {
  return new Promise((resolve) => {
      let ch = channel[0];
      ch.assertQueue(queue, {durable: false});
      resolve('OK');
  })
};

const sendMessage = (queue, message) => {
    let ch = channel[0];
    return new Promise((resolve) => {
        ch.sendToQueue(queue, new Buffer(message));
        resolve('send ok');
    });
};

const receiveMessage = (queue) => {
    let ch = channel[0];
    ch.prefetch(1);
    return new Promise((resolve) => {
        ch.consume(queue, msg => {
            ch.ack(msg);
            resolve(msg)
        }, {noAck: false})
    });
};

module.exports = {
    newChannel: newChannel,
    createQueue: createQueue,
    sendMessage: sendMessage,
    receiveMessage: receiveMessage
};