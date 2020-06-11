const fetch = require('node-fetch');

async function getCurrentSong(token) {
  const url = 'https://api.spotify.com/v1/me/player/currently-playing';

  console.log('url', url);
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

module.exports.getCurrentSong = getCurrentSong;
