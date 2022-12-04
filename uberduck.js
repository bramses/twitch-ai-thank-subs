import dotenv from 'dotenv';
dotenv.config();
import {findVoice, uberduckRequest} from './helpers.js';
import fs from 'fs';
import * as http from "https";
import log from 'simple-node-logger';

const logger = log.createSimpleLogger('logs/uberduck.log');


export const listVoices = async () => {
    const voices = await fetch('https://api.uberduck.ai/voices?mode=tts-basic', {method: 'GET'})
    const voicesJson = await voices.json();

    return voicesJson;
}
// Atrioc => Aye-tree-och phonetically
const voices = {
        'Mario': 'mario-sports-mix',
        'Eminem': 'eminem-arpa2', // (pronunciation dict)
        'Peter Griffin': 'peter-griffin', // (current)
        'Sonic': 'sonic-jason-griffith', // (Jason Griffith, Games)
        'Rick Sanchez': 'rick-sanchez'
    }

const randomVoice = voices[Math.floor(Math.random() * voices.length)];

export const generateWav = async (voice, text) => {
    const voiceId = voices[voice];
    logger.info('generateWav :: ', voice, text);
    const res = await uberduckRequest('speak', 'POST', { voice: voiceId, speech: text });

    return { res, uuid: res.uuid };
}

export const getWavById = async (sub, id) => {
    try {
        logger.info(`getWavById :: ${sub} :: ${id}`);
        const res = await uberduckRequest(`speak-status/?uuid=${id}`, 'GET');

        // download file in res.path to and write to wavs folder as sub-id.wav
        const file = fs.createWriteStream(`./wavs/${sub}-${id}.wav`);
        const request = http.get(res.path, function(response) {
            response.pipe(file);
        });

        return { res, request };
    } catch (e) {
        console.log(e);
    }
}
// generate(voices['Rick Sanchez'], 'Wubba lubba dub dub! Thanks for the 7 month sub, bramses! Now Atrioc can indulge in Szechuan sauce every day...for 7 months! Oh, you gotta try it. Trust me, it\'s worth every bit of that sweet, sweet schmeckle.');
// getWavById('bramses', '6a4504cc-7738-4dab-b498-1317a637d872')

