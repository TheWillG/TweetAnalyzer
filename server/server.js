const Twit = require('twit')
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
require('dotenv').config()

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
  strictSSL: true
})

let stream = null;

io.on("connection", socket => {
  if(stream) stream.stop();
  socket.on("getTweets", (filter = 'twitter') => {
    stream = T.stream('statuses/filter', { track: `#${filter}` });
    stream.on('tweet', function (tweet) {
      const { user, lang, text, timestamp_ms } = tweet;
      if(lang && text && user.screen_name && user.profile_image_url) {
        const newTweet = {
          lang,
          text,
          screenName: user.screen_name,
          imageUrl: user.profile_image_url,
          timestamp: timestamp_ms,
          filter
        }
        socket.emit("newTweet", newTweet);
      }
    })
  });
});

http.listen(4444);
console.log('Server started on port 4444');