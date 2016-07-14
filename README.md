# Flowplayer audio plugin

This plugin displays preview thumbnail images on the timeline.

## Usage

See: https://flowplayer.org/docs/plugins.html#audio

- [loading the assets](https://flowplayer.org/docs/plugins.html#audio-assets)
- [configuration](https://flowplayer.org/docs/plugins.html#audio-configuration)


### Initialize player

There are 2 ways to use the plugin:

#### Simple audio

Play audio in player with screen, optionally with a cover image instead of video. Ideal for mixed
video/audio playlists.

```js
flowplayer('#player', {
  ratio: 5/12,
  clip: {
    title: "Music",
    audio: true,
    coverImage: "//example.com/music-cover.jpg",
    sources: [{
      type: "application/x-mpegurl",
      src: "//example.com/music.m3u8"
    }, {
      type: "audio/mp4",
      src: "//example.com/music.m4a"
    }, {
      type: "audio/mpeg",
      src: "//example.com/music.mp3"
    }, {
      type: "audio/ogg",
      src: "//example.com/music.ogg"
    }]
  }
});
```

#### Audio only

A dedicated audio player, controls only.

```js
flowplayer('#player', {
  clip: {
    audioOnly: true,
    sources: [{
      type: "application/x-mpegurl",
      src: "//example.com/music.m3u8"
    }]
  }
});
```

## Demo

http://demos.flowplayer.org/api/audio.html

## CommonJS

The plugin can be used in a [browserify](http://browserify.org) and/or
[webpack](https://webpack.github.io/) environment with a
[commonjs](http://requirejs.org/docs/commonjs.html) loader:

```js
var flowplayer = require('flowplayer'),
    plugin = require('flowplayer-audio');

plugin(flowplayer); // plugin injects itself into Flowplayer
```

## Building the plugin

Build requirement:

- [nodejs](https://nodejs.org) with [npm](https://www.npmjs.com)

```sh
cd flowplayer-audio
make deps
make
```

## Known issues

- The Flash engine supports HLS only.
