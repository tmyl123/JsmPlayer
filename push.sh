#!/bin/bash
 #ffmpeg -f x11grab -s 1920x1080 -i :0.0+1920,0 -codec:v mpeg1video -codec:a mp2 -f mpegts "http://127.0.0.1:8081/pp"
 ffmpeg -f x11grab -video_size 1920x1080 -i :0.0+1920,0 -codec:v mpeg1video -codec:a mp2 -f mpegts "http://127.0.0.1:8081/pp"
