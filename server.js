import express from 'express';
import {subQueue} from "./bull/queue.js";
import log from "simple-node-logger";
import * as path from "path";

const logger = log.createSimpleLogger('logs/queue.log');

const app = express();

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "..", "build")));


// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "index.html"));
// })

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

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
})