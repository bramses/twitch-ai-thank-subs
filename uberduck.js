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
export const voices = {
        'Mario': 'mario-sports-mix',
        'Eminem': 'eminem-arpa2', // (pronunciation dict)
        'Peter Griffin': 'peter-griffin', // (current)
        'Sonic': 'sonic-jason-griffith', // (Jason Griffith, Games)
        'Rick Sanchez': 'rick-sanchez'
    }

export const generateWav = async (voice, text) => {
    const voiceId = voices[voice];
    text.replaceAll('Atrioc', 'Aye-tree-och');
    logger.info('generateWav :: ', voice, text);
    const res = await uberduckRequest('speak', 'POST', { voice: voiceId, speech: text, pace: 1 });

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


