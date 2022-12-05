import { Configuration, OpenAIApi } from "openai";
import { twitchTier } from './helpers.js';
import dotenv from 'dotenv';
dotenv.config();

const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_API_KEY,
});


const openai = new OpenAIApi(configuration);
const STREAMER_NAME = 'Atrioc';

const seed_prompts = [
    {
        "voice": "Peter Griffin",
        "prompts": [
            (subName, tier, isGifted = "") => `Write a short thank you message in the style of Peter Griffin from Family Guy  (use show references) thanking \\"${subName}\\" for their ${tier} tier ${isGifted} sub to ${STREAMER_NAME}'s Twitch stream. Use "..." for natural sounding pauses. Finish with |ENDTHANKYOU|\\n\\nPeter:`
        ]
    },
    {
        "voice": "Mario",
        "prompts": [
            (subName, tier, isGifted = "") => `Write a short thank you message in the style of Mario from Super Smash Bros.  (use game references) thanking \\"${subName}\\" for their ${tier} tier ${isGifted} sub to ${STREAMER_NAME}'s Twitch stream. Use "..." for natural sounding pauses. Finish with |ENDTHANKYOU|\\n\\nMario:`
        ]
    },
    {
        "voice": "Eminem",
        "prompts": [
            (subName, tier, isGifted = "") => `Write a short thank you message in the style of Eminem from 8 Mile  (use movie and song references from Eminems work) thanking \\"${subName}\\" for their ${tier} tier ${isGifted} sub to ${STREAMER_NAME}'s Twitch stream. Use "..." for natural sounding pauses. Finish with |ENDTHANKYOU|\\n\\nEminem:`
        ]
    },
    {
        "voice": "Sonic",
        "prompts": [
            (subName, tier, isGifted = "") => `Write a short thank you message in the style of Sonic from Sonic the Hedgehog  (use game references) thanking \\"${subName}\\" for their ${tier} tier ${isGifted} sub to ${STREAMER_NAME}'s Twitch stream. Use "..." for natural sounding pauses. Finish with |ENDTHANKYOU|\\n\\nSonic:`
        ]
    },
    {
        "voice": "Rick Sanchez",
        "prompts": [
            (subName, tier, isGifted = "") => `Write a short thank you message in the style of Rick Sanchez from Rick and Morty  (use show references) thanking \\"${subName}\\" for their ${tier} tier ${isGifted} sub to ${STREAMER_NAME}'s Twitch stream. Use "..." for natural sounding pauses. Finish with |ENDTHANKYOU|\\n\\nRick:`
        ]
    }
]

export const generateText = async (voice, subName, subTier, isGifted) => {
    if (typeof isGifted === 'string') {
        isGifted = JSON.parse(isGifted);
    }
    const prompt = seed_prompts.find(p => p.voice === voice).prompts[0](subName, twitchTier(subTier), isGifted ? 'gifted' : '');
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        temperature: 1,
        max_tokens: 128,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ["|ENDTHANKYOU|"],
    });

    return response.data.choices[0].text;
}

