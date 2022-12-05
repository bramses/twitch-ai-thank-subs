import dotenv from 'dotenv';
import {listVoices, voices} from "./uberduck.js";
dotenv.config();

export const uberduckRequest = async (endpoint, method, data) => {
    console.log('uberduckRequest :: ', endpoint, method, data);
    let response = await fetch(`https://api.uberduck.ai/${endpoint}`, {
        method,
        headers: {'Authorization': 'Basic ' + btoa(`${process.env.UBERDUCK_API_KEY}:${process.env.UBERDUCK_API_SECRET}`)},
        body: JSON.stringify(data)
    });
    let res = await response.json();

    return res;
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