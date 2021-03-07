# psmlscast
This is a quick and dirty little app that pulls PSMLS audio files and associated metadata down from youtube, and organizes them into a podcast rss feed.

## Requirements
As far as I can remember this needs `ffmpeg`, `youtube-dl`, `node`, and `npm`. Maybe we'll find more during deployment.
It stores audio files and metadata json files right on the filesystem of the host machine. No CDN is configured, as this is a no budget solution.

## Installation/Deployment
This repo should just be pushed onto the host machine. The `episodes/` directory needs to be served publicly. There is a set of speculative URLs in the codebase which we will likely have to update. I was thinking that podcast.peoplesschool.org would be a nice place to put it.

### Configuring a Cron Job
We should poll youtube and rebuild the feed file once per day. As episodes pile up this process could take minutes. The cron job should look something like this:
```
33 3 * * * sh {{project root path}}/fetch_data.sh && node {{project root path}}/download.js && node {{project root path}}/build.js
```

## How It Works
psmlscast is designed to automate away the need to manually upload and publish PSMLS podcast episodes. It uses the `youtube-dl` program, which is a scraper rather than an API client.

### Fetching Data
The first step is to get a list of all available episodes. To do this we pull down JSON metadata for all videos published to the PSMLS youtube channel one by one. `fetch_data.sh` is the script that manages this step.

### Downloading Audio Files
`download.js` looks at each episode metadata file in the `temp` directory, and downloads the audio for that episode if a corresponding audio file does not already exist. It also rewrites the metadata file for every episode. Note that if episode descriptions, titles, etc. get changed on youtube, psmlscast will synchronize the change automatically. psmlscast will not download audio for an episode more than once though.

### Building the RSS feed
The last step is having `build.js` create a podcast RSS feed at `episodes/feed.rss`. It uses handlebars for templating, which is just included in this repository.

## Shortcomings
* The code here just generally isn't great. I'm not a professional and I don't have a lot of time to throw at this.
* Everything runs synchronously, so it's quite slow. There is some advantage in this to avoid youtube catching on to automated scraping. They don't want people doing this kind of thing, but tolerate it as long as there aren't a bajillion requests coming from the same ip all at once.
* There is no traffic logging, so we don't have metrics on who is listening.
* Lots of things that should be config variables are just hardcoded in all over the place.
* The whole project is dependent on `youtube-dl` not breaking if there are changes to youtube. Depending on others' APIs is always risky in the long term.
