import React from 'react';
import moment from 'moment';
import flag from '../img/flag.png';

var TipsFlaggedHidden = (props) => {
  if (props.info.tiptext.length > 1) {
    return (
      <div >
        <li>
          <p className='tipsSpecificItems'>
            This tip has been flagged for inappropriate content.
          </p>
        </li>
      </div>
    );
  }
};
  
 
export default TipsFlaggedHidden;


