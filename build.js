const { readFileSync, readdirSync, mkdirSync } = require('fs');
const { spawn } = require('child_process');

const lsTmp = readdirSync('./temp');
const lsAudio = readdirSync('./audio');

let playlist = Array(lsTmp.length);

for (let i = 0; i < lsTmp.length; i += 1) {

  let path = './temp/' + lsTmp[i];
  let { playlist_index, id } = JSON.parse(readFileSync(path));
  playlist[playlist_index - 1] = id;

  if (!lsAudio.includes(id)) { mkdirSync('./audio/' + id); }
}
