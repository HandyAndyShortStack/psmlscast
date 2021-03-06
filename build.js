const { readFileSync, writeFileSync } = require('fs');
const { formatDate } = require('./format_date.js');
const { compile } = require('handlebars');

const template = compile(readFileSync('./templates/main.handlebars').toString());

writeFileSync('./feed.rss', template({ pubDate: formatDate() }));
