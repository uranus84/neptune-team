import React from 'react';
import Recharts from 'recharts';
//import{Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis} from 'recharts';
import{BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';



 
 

var BarChartFrom = (props) => {


const data = [
      {name: 'Openness', current: props.recentTweetsFrom.personalityScores.openness, past: props.oldTweetsFrom.personalityScores.openness},
      {name: 'Extrovert', current: props.recentTweetsFrom.personalityScores.extraversion, past: props.oldTweetsFrom.personalityScores.extraversion},
      {name: 'Agreeable', current: props.recentTweetsFrom.personalityScores.agreeableness, past: props.oldTweetsFrom.personalityScores.agreeableness},
      {name: 'Contientious', current: props.recentTweetsFrom.personalityScores.conscientiousness, past: props.oldTweetsFrom.personalityScores.conscientiousness},
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


export default BarChartFrom;





