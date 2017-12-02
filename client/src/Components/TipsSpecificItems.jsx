import React from 'react';
import moment from 'moment';
import flag from '../img/flag.png';

var TipsSpecificItems = (props) => {
  if (props.info.tiptext.length > 1) {
    if (props.info.status === 'flagged' && props.info.hide) {
      return (
        <div >
          <li>
            <p className='tipsSpecificItems'>
              This tip has been flagged for inappropriate content.
              <button
                className="btn btn-primary float-bottom-right btn-sm"
                onClick={(e) => props.toggleFlaggedTip(props.index)}
              >
                Show
              </button>
            </p>
          </li>
        </div>
      );
    }
    if (props.info.status === 'flagged' && !props.info.hide) {
      return (
        <div >
          <li>
            <p className='tipsSpecificItems'>
              {props.info.tiptext}
              <br/> -{props.info.name}
              <br/>{moment(props.info.datecreated).calendar()}
              <button
                className="btn btn-primary float-bottom-right btn-sm"
                onClick={(e) => props.toggleFlaggedTip(props.index)}
              >
                Hide
              </button> 
            </p>
          </li>
        </div>
      );
    }
    return (
      <div >
        <li>
          <p className='tipsSpecificItems'>
            {props.info.tiptext}
            <br/> -{props.info.name}
            <br/>{moment(props.info.datecreated).calendar()}
            <input
              type="image"
              id="flag-tip"
              className="btn-img flag float-bottom-right"
              src={flag}
              onClick={(e) => props.flagTip(e, props.index)}
            />
          </p>
        </li>
      </div>
    );
  }
};
  
 
export default TipsSpecificItems;


