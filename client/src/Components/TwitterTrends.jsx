import React from 'react';
import Recharts from 'recharts';
import{Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis} from 'recharts';
import BarChartFrom from './ChartFrom.jsx';
import BarChartAbout from './ChartAbout.jsx';


var TwitterTrends = (props) => {
  var capitalizeFirstLetterOnly = function(str) {
    var strArray = str.split(' ');
    for (var i = 0; i < strArray.length; i++) {
      strArray[i] = strArray[i].substring(1, 0).toUpperCase()+strArray[i].substring(1).toLowerCase();
    }
    strArray = strArray.join(' ');
    return strArray;
  };
 
  var positivityColorFrom = {fontWeight: "bold", color: "black"};
  var positivityComment = '';
  if ((props.recentTweetsFrom.positivityScore * 100) >=90) {
    positivityColorFrom = {fontWeight: "bold", color: "green"};
  }
  if ((props.recentTweetsFrom.positivityScore * 100) < 90 && (props.recentTweetsFrom.positivityScore * 100) >= 65) {
    positivityColorFrom = {fontWeight: "bold", color: "black"};
  }
  if ((props.recentTweetsFrom.positivityScore * 100) < 65) {
    positivityColorFrom = {fontWeight: "bold", color: "red"};
    positivityComment = "These are very unhappy people"
  }


  var positivityColorAbout = {fontWeight: "bold", color: "black"};
  if ((props.recentTweetsAbout.positivityScore * 100) >=90) {
    positivityColorAbout = {fontWeight: "bold", color: "green"};
  }
  if ((props.recentTweetsAbout.positivityScore * 100) < 90 && (props.recentTweetsAbout.positivityScore * 100) >= 65) {
    positivityColorAbout = {fontWeight: "bold", color: "black"};
  }
  if ((props.recentTweetsAbout.positivityScore * 100) < 65) {
    positivityColorAbout = {fontWeight: "bold", color: "red"};
  }


 

  if(props.recentTweetsFrom === "" || props.recentTweetsAbout === "" || props.oldTweetsFrom === "" || props.oldTweetsAbout === "") {
    return (<div className="loader"></div>)
  } else {
    return (
      <div className="row" id="tw_trends">
        <div>
          <h4>Twitter Mood Data From</h4>
          <h5>{capitalizeFirstLetterOnly(props.city)}, {capitalizeFirstLetterOnly(props.state)}</h5>
            <p style={positivityColorFrom}>Current Positivity: {(props.recentTweetsFrom.positivityScore * 100).toFixed(1)}%
            Past Positivity: {(props.oldTweetsFrom.positivityScore * 100).toFixed(1)}% 
              <br /> {positivityComment} 
            
              <BarChartFrom recentTweetsAbout={props.recentTweetsAbout} recentTweetsFrom={props.recentTweetsFrom}
                    oldTweetsFrom={props.oldTweetsFrom} oldTweetsAbout={props.oldTweetsAbout} city={props.city} state={props.state}/>
            </p>
       
        </div>
          <br />
          <br />
        <div style={{padding: "10px"}}>
          <h4>Twitter Mood Data About</h4>
          <h5>{capitalizeFirstLetterOnly(props.city)}, {capitalizeFirstLetterOnly(props.state)}</h5>
            <p style={positivityColorAbout}>Current Positivity: {(props.recentTweetsAbout.positivityScore * 100).toFixed(1)}%
            <p style={positivityColorAbout}>Past Positivity: {(props.oldTweetsAbout.positivityScore * 100).toFixed(1)}% 
            </p> 
            </p>
              <BarChartAbout recentTweetsAbout={props.recentTweetsAbout} recentTweetsFrom={props.recentTweetsFrom}
                    oldTweetsFrom={props.oldTweetsFrom} oldTweetsAbout={props.oldTweetsAbout} city={props.city} state={props.state}/>
        </div>
      </div> 
    )
  }
}


export default TwitterTrends;
