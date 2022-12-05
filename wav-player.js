import { default as player } from 'node-wav-player';

export async function playWav(sub, id) {
    await player.play({
        path: `./wavs/${sub}-${id}.wav`,
        sync: true
    }).then(() => {
        console.log(`The wav file ./wavs/${sub}-${id}.wav was played through.`);
    }).catch((error) => {
        console.error(error);
    });
}

export function stop() {
    player.stop();
}