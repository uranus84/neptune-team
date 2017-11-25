import React from 'react';

var TweetBox = (props) => (
  <div className="tweetbox">
    <h4>@{props.tweet.user.screen_name}</h4>
    <p>{props.tweet.text}</p>
  </div>
  )

export default TweetBox;