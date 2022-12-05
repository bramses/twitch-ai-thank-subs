import Bull from "bull";
import {chooseRandomVoice} from "../helpers.js";
import {generateText} from "../openai.js";
import {generateWav, getWavById} from "../uberduck.js";
import {playWav} from "../wav-player.js";
import log from "simple-node-logger";


const logger = log.createSimpleLogger('logs/queue.log');
const WAV_TIMEOUT = 10000;
const SUB_TEST_NAME = 'bramses';
const TEST_VOICE = 'Rick Sanchez';
const SHOW_DEBUG_TIMER = false

function delay(t, v) {
    return new Promise(resolve => setTimeout(resolve, t, v));
}

const createSubAlert = async (subName = '', subTier = '', isGifted = false) => {
    const voice = await chooseRandomVoice();

    const text = await generateText(voice, subName, subTier, isGifted);
    const {uuid} = await generateWav(voice, text);
    // wait 10 seconds for the wav to be generated
    if (SHOW_DEBUG_TIMER) {
        console.log('Waiting for wav to be generated...');
        let i = 10;
        const inter = setInterval(() => {
            console.log(i);
            i--;
            if (i === 0) {
                clearInterval(inter);
            }
        }, 1000);
    }

    return delay(WAV_TIMEOUT, uuid).then(async (uuid) => {
        logger.info('main :: getWavById :: ', subName, uuid);
        await getWavById(subName, uuid);
        if (SHOW_DEBUG_TIMER) { // wait 10 seconds for the wav to be downloaded
            console.log('Waiting for wav to save to play...');
            let i = 10;
            const inter = setInterval(() => {
                console.log(i);
                i--;
                if (i === 0) {
                    clearInterval(inter);
                }
            }, 1000);
        }
        return delay(WAV_TIMEOUT, uuid).then((uuid) => {
            logger.info('main :: playWav :: ', subName, uuid);
            playWav(subName, uuid);
            console.log(text)
        });
    });
}

export const subQueue = new Bull('sub-queue', {
    limiter: {
        max: 1000,
        duration: 30000
    }
});

// const job = await subQueue.add({
//     subName: 'bramses',
//     subTier: '1000',
//     isGifted: false
// });

subQueue.process( async (job) => {
    const {subName, subTier, isGifted} = job.data;
    console.log('Processing job', job.id);
    const res = await createSubAlert(subName, subTier, isGifted);
    console.log('res', res);
    return res;
});

subQueue.on('completed', (job, result) => {
    console.log(`Job completed with result ${result}`);
})