const { readFileSync, writeFileSync, statSync } = require('fs');
const { formatDate, twoDigits } = require('./format_date.js');
const { compile } = require('handlebars');

const template = compile(readFileSync('./templates/main.handlebars').toString());
const { availableEpisodes } = JSON.parse(readFileSync('./episodes/list.json'));
const episodes = [];

for (let i = 0; i < availableEpisodes.length; i += 1) {

  let id =  availableEpisodes[i];
  let metadataPath = './episodes/' + id + '/metadata.json';
  let audioPath = './episodes/' + id + '/audio.m4a';
  let episode = JSON.parse(readFileSync(metadataPath));
  let { upload_date, duration, description } = episode;

  episode.pubDate = formatDate(new Date(
    upload_date.substr(0, 4) + '-' +
    upload_date.substr(4, 2) + '-' +
    upload_date.substr(6, 2)
  ));

  episode.itunesDuration = twoDigits(Math.floor(duration / 3600)) + ':' +
    twoDigits(Math.floor((duration % 3600) / 60)) + ':' +
    twoDigits((duration % 3600) % 60);

  episode.itunesSubtitle = description.substr(0, 49);

  episode.lengthInBytes = statSync(audioPath).size;

  episodes.push(episode);
}

writeFileSync('./feed.rss', template({
  pubDate: formatDate(new Date()),
  episodes
}));
