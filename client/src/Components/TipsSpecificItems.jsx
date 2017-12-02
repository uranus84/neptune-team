import React from 'react';
import moment from 'moment';
import flag from '../img/flag.png';

var TipsSpecificItems = (props) => {
  if (props.info.tiptext.length > 1) {
    return (
      <div >
        <li>
          <p className='tipsSpecificItems'>{props.info.tiptext} <br/> -{props.info.name} <br/>{moment(props.info.datecreated).calendar()}</p>
          <div onClick={(e) => props.flagTip(props.info.ID)}>
            <input type="image" className="btn-img" src={flag}/>
            <span className="flag-tip">Flag tip for removal</span>
          </div>
        </li>
      </div>
    );
  }
};
  
 
export default TipsSpecificItems;


