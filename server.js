import express from 'express';
import {subQueue} from "./bull/queue.js";
import log from "simple-node-logger";
import * as path from "path";
import {fileURLToPath} from 'url';

const logger = log.createSimpleLogger('logs/queue.log');

const app = express();




app.get('/', (req, res) => {
    res.send('Backend')
})

// take in a sub name, sub tier, and isGifted and add to bull queue
app.get('/sub', (req, res) => {
    const {subName, subTier, isGifted} = req.query;

    logger.info('adding sub to queue :: ', subName, subTier, isGifted);
    subQueue.add({
        subName,
        subTier,
        isGifted
    })
    res.send('sub');
})

app.listen(5000, () => {
    console.log('Example app listening on port 5000!');
})