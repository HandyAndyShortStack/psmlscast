const { readFileSync, readdirSync } = require('fs');
const { spawn } = require('child_process');

const ls = readdirSync('./temp');

let playlist = Array(ls.length);

for (let i = 0; i < ls.length; i += 1) {
  let path = './temp/' + ls[i];
  let { playlist_index, id } = JSON.parse(readFileSync(path));
  playlist[playlist_index - 1] = path;
}

console.log(playlist);
