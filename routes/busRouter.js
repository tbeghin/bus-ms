const express = require('express');
const router = express.Router();
const connectionModule = require('../controller/connection');
const channelModule = require('../controller/channel');

router.get('/', (req, res) => {
    res.send('Hello World!')
});

router.post('/connect', (req, res) => {
    let isConnecting = req.body.connect;
    connectionModule.connection(isConnecting)
        .then(
            data => res.status(200).send(data),
            err => res.status(500).send(err)
        )
        .catch(
            reason => res.status(500).send(reason)
        );
});

router.post('/queue', (req, res) => {
    let queue = req.body.queue;
    channelModule.createQueue(queue)
        .then(
            data => res.status(200).send(data),
            err => res.status(500).send(err)
        )
        .catch(
            reason => res.status(500).send(reason)
        );
});

router.post('/send', (req, res) => {
    let queue = req.body.queue;
    let message = req.body.message;
    channelModule.sendMessage(queue, message)
        .then(
            data => res.status(200).send(data),
            err => res.status(500).send(err)
        )
        .catch(
            reason => res.status(500).send(reason)
        );
});

router.get('/receive', (req, res) => {
    let queue = req.query.queue;
    channelModule.receiveMessage(queue)
        .then(
            data => res.status(200).send(data),
            err => res.status(500).send(err)
        )
        .catch(
            reason => res.status(500).send(reason)
        );
});

module.exports = router;