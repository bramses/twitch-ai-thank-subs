import express from 'express';
import {subQueue} from "./bull/queue.js";

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
})

// take in a sub name, sub tier, and isGifted and add to bull queue
app.get('/sub', (req, res) => {
    const {subName, subTier, isGifted} = req.query;
    console.log('sub :: ', subName, subTier, isGifted);
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