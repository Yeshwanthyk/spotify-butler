const fetch = require("node-fetch");

async function getCurrentSong(token) {
async function makeFetch(url, token) {
	const response = await fetch(url, {
		method: "GET",
		headers: setHeaders(token)
	});

	const data = await response.json();

	return data;
}

function setHeaders(token) {
	const headers = {
		Accept: "application/json",
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`
	};

	return headers;
}

module.exports.getCurrentSong = getCurrentSong;
