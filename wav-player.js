import { default as player } from 'node-wav-player';

export function playWav(sub, id) {
    player.play({
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