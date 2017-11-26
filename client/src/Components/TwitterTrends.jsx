import React from 'react';

var TwitterTrends = (props) => {
  if(props.recentTweetsFrom === "" || props.recentTweetsAbout === "" || props.oldTweetsFrom === "" || props.oldTweetsAbout === "") {
    return (<div className="loader"></div>)
  } else {
    return (
      <div className="trends_data col-sm-6">
        <p className="twittertrends_content">Twitter Trends Go Here!</p>
          <div>{JSON.stringify(props.recentTweetsFrom)}</div>
          <div>{JSON.stringify(props.recentTweetsAbout)}</div>
          <div>{JSON.stringify(props.oldTweetsFrom)}</div>
          <div>{JSON.stringify(props.oldTweetsAbout)}</div>
      </div>
    )
  }
}


export default TwitterTrends;