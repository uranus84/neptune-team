import React from 'react';
import moment from 'moment';
//var moment = require('moment');

  var TipsSpecificItems = (props) => {
    if (props.info.tiptext.length >1) {
      return (
        <div>
          <li>
            <p>{props.info.tiptext} <br/> -{props.info.name} <br/>{moment(props.info.datecreated).calendar()}</p>
          </li>
        </div>
      )
    }
  }
 
 
export default TipsSpecificItems;


