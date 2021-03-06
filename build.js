const { execSync } = require('child_process');
const {
  readFileSync,
  readdirSync,
  mkdirSync,
  writeFileSync
} = require('fs');

const lsTmp = readdirSync('./temp');
const lsAudio = readdirSync('./audio');

let playlist = Array(lsTmp.length);

for (let i = 0; i < lsTmp.length; i += 1) {

  let path = './temp/' + lsTmp[i];
  let data = JSON.parse(readFileSync(path));
  let { playlist_index, id, title } = data
  playlist[playlist_index - 1] = id; // playlists are 1 indexed

  if (!lsAudio.includes(id)) {
    mkdirSync('./audio/' + id);
    console.log('DOWNLOADING ' + title);
    execSync(
      'youtube-dl --extract-audio ' +
      id +
      ' -o "./audio/%(id)s/episode.%(ext)s"' +
      ' --audio-format m4a'
    );
    console.log('...FINISHED');
    console.log('copying metadata for ' + id);
    writeFileSync('audio/' + id + '/metadata.json', JSON.stringify(data));
  }
}
