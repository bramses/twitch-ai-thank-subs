import { StaticAuthProvider } from '@twurple/auth';
import { ChatClient } from '@twurple/chat';
import {subQueue} from "./bull/queue.js";

import dotenv from 'dotenv';
dotenv.config();

async function main() {
    // code goes here

    const clientId = process.env.CLIENT_ID;
    const accessToken = "";
    const authProvider = new StaticAuthProvider(clientId, accessToken);

    const chatClient = new ChatClient({ authProvider, channels: ['esfandtv', 'tinakitten', 'moistcr1tikal' ] });
    await chatClient.connect();

    console.log('connected');

    chatClient.onSub((channel, user) => {
        console.log(`${user} just subscribed to ${channel}!`);
        subQueue.add({
            subName: user,
            subTier: '1000',
            isGifted: false
        })
        // chatClient.say(channel, `Thanks to @${user} for subscribing to the channel!`);
    });

    chatClient.onResub((channel, user, subInfo) => {
        console.log(`${user} just resubscribed for ${subInfo.months} months to ${channel}!`);

        subQueue.add({
            subName: user,
            subTier: '1000',
            isGifted: false
        })

        // chatClient.say(channel, `Thanks to @${user} for subscribing to the channel for a total of ${subInfo.months} months!`);
    });

    chatClient.onSubGift((channel, user, subInfo) => {
        console.log(`${user} just gifted a subscription to ${subInfo.gifter} to ${channel}!`);

        subQueue.add({
            subName: user,
            subTier: '1000',
            isGifted: true
        })
        // chatClient.say(channel, `Thanks to ${subInfo.gifter} for gifting a subscription to ${user}!`);
    });

    // chatClient.onMessage((channel, user, message) => {
    //     console.log(`${user} just said ${message}!`);
    // })
}




main();