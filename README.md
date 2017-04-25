# JsmPlayer
### What is this?
A Simple Jsmpeg player UI that play with Vuejs. If you're a mac user ready with node & ffmpeg installed, you're good to go.

### Why made this?
IOS devices lack of native live streaming supported, but there is somehow a way to stream live through websocket, and render with canvas on HTML with the Jsmpeg. that's good, but to make it better, we still need a player UI for it, right? 

### Usage:
simply clone the repository and issue ```npm install```, then ```npm start```.
You can go ahead for your browser at ```localhost:3000``` with the stream and the player.

> I put webcam live stream in package.json with npm start command, just for convenience to display that it works. You can change any stream you want in that ```ffmpeg``` line. But just to remind you, Jsmpeg currently only support mpeg1/mp2, so take good care with this.
