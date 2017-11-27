import React from 'react';
import Recharts from 'recharts';
//import{Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis} from 'recharts';
import{BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';






var BarChartAbout = (props) => {


const data = [
      {name: 'Openness', current: props.recentTweetsAbout.personalityScores.openness, past: props.oldTweetsAbout.personalityScores.openness},
      {name: 'Extrovert', current: props.recentTweetsAbout.personalityScores.extraversion, past: props.oldTweetsAbout.personalityScores.extraversion},
      {name: 'Agreeable', current: props.recentTweetsAbout.personalityScores.agreeableness, past: props.oldTweetsAbout.personalityScores.agreeableness},
      {name: 'Contientious', current: props.recentTweetsAbout.personalityScores.conscientiousness, past: props.oldTweetsAbout.personalityScores.conscientiousness},
];

    return (
      <BarChart width={450} height={200} data={data}
            margin={{top: 10, right: 15, left: 10, bottom: 3}}>
       <XAxis dataKey="name"/>
       <YAxis yAxisId="left" orientation="left" stroke="#8884d8"/>
       <YAxis yAxisId="right" orientation="right" stroke="#82ca9d"/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Bar yAxisId="left" dataKey="current" fill="#8884d8" />
       <Bar yAxisId="right" dataKey="past" fill="#82ca9d" />
      </BarChart>
    );


}


export default BarChartAbout;





