const { program } = require('commander');
const SpotifyWebApi = require('spotify-web-api-node');

const auth = require('./auth.js');

program
  .option('-o, --oauth', 'Authenticate with Spotify')
  .option('-p, --playlists', 'Show all playlists')
  .option('-a, --add <type>', 'Add current song to playlist of choice');

program.parse(process.argv);

if (program.oauth) {
  auth();
}
if (program.playlists) console.log('- small pizza size');
if (program.add) console.log(`- ${program.add}`);
