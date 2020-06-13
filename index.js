const { program } = require("commander");
const auth = require("./auth/auth.js");
const { getCurrentSong, getPlaylists } = require("./spotify.js");

program
	.option("-o, --oauth", "Authenticate with Spotify")
	.option("-t, --auth-token <token>", "Pass the Auth Token")
	.option("-p, --playlists", "Show all playlists")
	.option("-a, --add", "Add current song to playlist of choice");

program.parse(process.argv);

if (program.oauth) {
	auth();
}

if (program.playlists) {
	if (!program.authToken) return;
	const token = program.authToken;
	getPlaylists(token).then(playlists => {
		console.log(playlists);
	});
}

if (program.add) {
	if (!program.authToken) return;
	const token = program.authToken;

	getCurrentSong(token).then(songURI => {
		console.log(songURI);
	});
}
