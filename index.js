const { program } = require('commander');
const fetch = require('node-fetch');

const auth = require('./auth.js');

program
  .option('-o, --oauth', 'Authenticate with Spotify')
  .option('-t, --auth-token <token>', 'Pass the Auth Token')
  .option('-p, --playlists', 'Show all playlists')
  .option('-a, --add <type>', 'Add current song to playlist of choice');

program.parse(process.argv);

if (program.oauth) {
  auth();
}

if (program.playlists) {
  if (!program.authToken) return;
}

if (program.add) {
  if (!program.authToken) return;

  const token = program.authToken;
  getCurrentSong(token).then((songURI) => {
    console.log('songURI', songURI);
  });
}

async function getCurrentSong(token) {
  const url = 'https://api.spotify.com/v1/me/player/currently-playing';

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, {
    method: 'GET',
    headers: headers,
  });

  const data = await response.json();
  return data.item.uri;
}
