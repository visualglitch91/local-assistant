const os = require("os");
const config = require("./config.json");

module.exports = {
  apps: [
    {
      name: "snapclient",
      interpreter: "none",
      cwd: __dirname,
      script: "snapclient",
      args: `-h ${config.snapserver} --player pulse`,
    },
    {
      name: "wyoming-openwakeword",
      interpreter: "none",
      cwd: `${__dirname}/wyoming-openwakeword`,
      script: "script/run",
      args: `
        --uri 'tcp://0.0.0.0:10400'
        --preload-model '${config.wake_word}'
        --debug
      `,
    },
    {
      name: "wyoming-satellite",
      interpreter: "none",
      cwd: `${__dirname}/wyoming-satellite`,
      script: "script/run",
      args: `
        --name '${os.hostname()}'
        --uri 'tcp://0.0.0.0:10700'
        --mic-command 'pw-record --target ${
          config.mic_device
        } --rate 16000 --channels 1 - '
        --snd-command 'pw-play --rate 22050 --channels 1 -' 
        --wake-uri 'tcp://127.0.0.1:10400'
        --wake-word-name '${config.wake_word}'
        --awake-wav '../sounds/awake.wav'
        --timer-finished-wav '../sounds/timer_finished.wav' 
        --debug
        `,
    },
  ],
};
