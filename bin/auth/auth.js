const open = require("open");
const express = require("express");
const chalk = require("chalk");
const clipboardy = require("clipboardy");

// @Todo Add a way to pass in clientId
const PORT = 4815;
const CLIENT_ID = "29644b6a828e4e8fa3068bad6bcf3093";
const SHOW_DIALOG = false;
const SCOPE = [
	"playlist-modify-public",
	"playlist-modify-private",
	"user-read-recently-played",
	"user-read-currently-playing",
	"playlist-read-private"
].join("%20");

const REDIRECT_URI = "http://localhost:" + PORT + "/callback";

const URL =
	"https://accounts.spotify.com/authorize" +
	"?client_id=" +
	CLIENT_ID +
	"&response_type=token" +
	"&scope=" +
	SCOPE +
	"&show_dialog=" +
	SHOW_DIALOG +
	"&redirect_uri=" +
	REDIRECT_URI;

const app = express();

app.get("/callback", (req, res) => {
	res.sendFile(__dirname + "/callback.html");
	if (req.query.error) {
		console.log(chalk.red("Something went wrong. Error: "), req.query.error);
	}
});

app.get("/token", (req, res) => {
	res.sendStatus(200);
	const token = req.query.access_token;
	if (token) {
		clipboardy.writeSync(token);
		console.log(chalk.green("Your token is: "), chalk.bold(token));
		console.log("(It has been copied to your clipboard)");
	}

	process.exit();
});

const auth = () => {
	app.listen(PORT, () => {
		console.log(
			chalk.blue("Opening the Spotify Login Dialog in your browser...")
		);
		open(URL);
	});
};

module.exports = auth;
