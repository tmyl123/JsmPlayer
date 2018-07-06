# JsmPlayer
### What is this?
A Simple Jsmpeg player UI that play with Vuejs.


### Prerequisite
* ffmpeg: encoding stream for demo purpose.
* nodejs: server html for demo purpose.


### Usage:
* ```git clone https://github.com/tmyl123/JsmPlayer.git```
* ```npm install```
* ```npm start```


You can go ahead for your browser at ```localhost:3000``` and will see the player.

### Push stream

On Linux: ```ffmpeg -f x11grab -video_size 1920x1080 -i :0.0+1920,0 -codec:v mpeg1video -codec:a mp2 -f mpegts "http://127.0.0.1:8081/secret"```

On OSX: ```ffmpeg -f avfoundation -i 0:0 -codec:v mpeg1video -bf 0 -codec:a mp2 -r 30 -f mpegts "http://127.0.0.1:8081/secret"```

On Windows: 
