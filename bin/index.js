#!/usr/bin/env node

const { program } = require('commander');
const auth = require('./auth/auth.js');
const {
  getCurrentSong,
  getPlaylists,
  addSongToPlaylist,
} = require('./spotify.js');

program
  .option('-o, --oauth', 'Authenticate with Spotify')
  .option('-t, --auth-token <token>', 'Pass the Auth Token')
  .option('-p, --playlists', 'Show all playlists')
  .option('-a, --add <id>', 'Add current song to playlist of choice');

program.parse(process.argv);

if (program.oauth) {
  auth();
}

if (program.playlists) {
  if (!program.authToken) return;
  const token = program.authToken;

  getPlaylists(token).then((playlistsJson) => {
    playlistsJson.items.forEach((item) => {
      console.log(item.name, item.id);
    });
  });
}

if (program.add) {
  if (!program.authToken) return;

  const playlist_id = program.add;
  const token = program.authToken;

  getCurrentSong(token).then((songId) => {
    if (songId.error) {
      console.log('OAuth Token expired. Refetching...');
      auth();
    } else {
      addSongToPlaylist(token, playlist_id, songId.item.uri);
    }
  });
}
