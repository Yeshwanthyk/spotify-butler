# spotify-butler

This is a compact CLI for adding the current playing song on Spotify to a playlist of your choice.

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)

## Installation

```bash
npm install -g spotify-butler
```

## Usage

Grab the latest Auth Token:

```bash
spotify-butler -o
```

Grab a list of playlists and their corresponding IDs

```bash
spotify-butler -p -t <auth-token>
```

Add current playing song to a playlist of your choice

```bash
spotify-butler -a <playlist-id> -t <auth-token>
```

I personally set up an alias to make the process seamless

```bash
spotify-add='spotify-butler -a <playlist-id> -t'
```

We can then just add songs by,

```bash
spotify-add <auth-token>
```

**If the auth-token has expired, `spotify-butler` would grab a new one for you automatically.**

## Features

The package includes the following:

- Get a new Spotify Auth Token
- Get a list of all your playlists and playlist IDs
- Add the current playing song to a playlist of your choice
