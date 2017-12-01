import React from 'react';
import TweetBox from './TweetBox.jsx';


var TopTweetsInfo = (props) => {
  if (props.topTweetsAbout === '' || props.topTweetsFrom === '') {
    return (<div className="loader"></div>);
  } else {
    return (
      <div>
        <div className="left-box">
          <p className="toptweetsblock_content">Top 3 Tweets from {props.city.toUpperCase()}</p>
          {props.topTweetsFrom.map( (val) => { return ( <TweetBox tweet={val}/> ); } )}
        </div>
        <div className="right-box">
          <p className="toptweetsblock_content">Top 3 Tweets about {props.city.toUpperCase()}</p>
          {props.topTweetsAbout.map( (val) => { return ( <TweetBox tweet={val}/> ); } )}
        </div>
      </div>
    );
  }
};
 
export default TopTweetsInfo;