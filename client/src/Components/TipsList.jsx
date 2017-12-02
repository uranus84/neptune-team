import React from 'react';
import TipsSpecificItems from './TipsSpecificItems.jsx';

var capitalizeFirstLetterOnly = function (str) {
  var strArray = str.split(' ');
  for (var i = 0; i < strArray.length; i++) {
    strArray[i] = `${strArray[i].substring(1, 0).toUpperCase()}${strArray[i].substring(1).toLowerCase()}`;
  }
  strArray = strArray.join(' ');
  return strArray;
};
 
 
var TipsList = (props) => (
  <div>
    <p>Tips From: <span style={{fontWeight: 'bold'}}><br/>{capitalizeFirstLetterOnly(props.info[0].city)}, {capitalizeFirstLetterOnly(props.info[0].state)}</span></p>
    <ul className='list'>
      {
        props.info.map((item, i) => {
          return <TipsSpecificItems
            info={item}
            key={i}
            index={i}
            flagTip={props.flagTip}
            toggleFlaggedTip={props.toggleFlaggedTip}
          />;
        })
      }
    </ul> 
  </div>
);


export default TipsList; 