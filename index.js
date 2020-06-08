const { program } = require('commander');

program
  .option('-o, --oauth', 'Authenticate with Spotify')
  .option('-p, --playlists', 'Show all playlists')
  .option('-a, --add <type>', 'Add current song to playlist of choice');

program.parse(process.argv);

console.log('pizza details:');
if (program.oauth) console.log(program.opts());
if (program.playlists) console.log('- small pizza size');
if (program.add) console.log(`- ${program.add}`);
