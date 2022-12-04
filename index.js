import {generateText} from "./openai.js";
import {playWav} from "./wav-player.js";
import { getWavById, generateWav } from "./uberduck.js";
import log from 'simple-node-logger';

const logger = log.createSimpleLogger('logs/index.log');

const WAV_TIMEOUT = 10000;
const SUB_TEST_NAME = 'bramses';
const VOICE = 'Rick Sanchez';

const main = async () => {
    const text = await generateText(VOICE, SUB_TEST_NAME, '2000', true);
    const { uuid } = await generateWav(VOICE, text);
    // wait 10 seconds for the wav to be generated
    console.log('Waiting for wav to be generated...');
    let i = 10;
    const inter = setInterval(() => {
        console.log(i);
        i--;
        if (i === 0) {
            clearInterval(inter);
        }
    }, 1000);
    // setTimeout(() => clearInterval(inter), 10000);
    setTimeout(async () => {
        logger.info('main :: getWavById :: ', SUB_TEST_NAME, uuid);
        await getWavById(SUB_TEST_NAME, uuid);
        // wait 10 seconds for the wav to be downloaded
        console.log('Waiting for wav to save to play...');
        let i = 10;
        const inter = setInterval(() => {
            console.log(i);
            i--;
            if (i === 0) {
                clearInterval(inter);
            }
        }, 1000);
        setTimeout(() => {
            logger.info('main :: playWav :: ', SUB_TEST_NAME, uuid);
            playWav(SUB_TEST_NAME, uuid);
            console.log(text)
        }, WAV_TIMEOUT);
    }, WAV_TIMEOUT);
}

main();