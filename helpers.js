import dotenv from 'dotenv';
import {listVoices, voices} from "./uberduck.js";
import log from 'simple-node-logger';

dotenv.config();
const logger = log.createSimpleLogger('logs/helpers.log');

export const uberduckRequest = async (endpoint, method, data) => {
    try {
        logger.info('uberduckRequest :: endpoint: ', endpoint, " method: ", method, ' data: ', data);
        let response = await fetch(`https://api.uberduck.ai/${endpoint}`, {
            method,
            headers: {'Authorization': 'Basic ' + btoa(`${process.env.UBERDUCK_API_KEY}:${process.env.UBERDUCK_API_SECRET}`)},
            body: JSON.stringify(data)
        });
        let res = await response.json();

        return res;
    } catch (e) {
        console.log('error in uberduckRequest: ');
        logger.error(e);
    }
}

export const findVoice = async (voiceName) => {
    listVoices().then((res) => {
        const voice = res.find((voice) => voice.display_name === voiceName);
        console.log('findVoice :: ', voice);
    })
}

export const chooseRandomVoice = async () => {
    const voiceKeys = Object.keys(voices)
    return voiceKeys[Math.floor(Math.random() * voiceKeys.length)];
}

export const twitchTier = (tier) => {
    switch (tier) {
        case '1000':
            return 'Tier 1';
        case '2000':
            return 'Tier 2';
        case '3000':
            return 'Tier 3';
        default:
            return 'Tier 1';
    }
}

chooseRandomVoice()