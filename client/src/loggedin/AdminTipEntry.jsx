import React from 'react';
import moment from 'moment';
import check from '../img/check.png';
import x from '../img/x.png';

var AdminTipEntry = (props) => {
  let status = props.tip.status;
  let viewConcern;

  if (props.tip.tiptext.length > 1) {
    if (props.tip.showConcern) {
      return (
        <tr>
          <td colSpan="5">{props.tip.concern}</td>
          <td>{status}</td>
          <td>
            <input
              type="image" src={check} className="btn-img"
              onClick={(e) => props.updateTipStatus(props.tip.ID, 'approved', 'issue resolved by moderator')}
            />
            <input
              type="image" src={x} className="btn-img"
              onClick={(e) => props.updateTipStatus(props.tip.ID, 'rejected')}
            />
            {props.tip.concern ? 
              <button className="btn btn-primary btn-sm" onClick={(e) => props.toggleShowTipConcern(e, props.index)}>
                Show Less
              </button> : <span></span>
            }
          </td>
        </tr>
      );
    } else {
      return (
        <tr className={status}>
          <td>{moment(props.tip.datecreated).calendar()}</td>
          <td>{props.tip.name}</td>
          <td>{props.tip.tiptext}</td>
          <td>{props.tip.city}</td>
          <td>{props.tip.state}</td>
          <td>{status}</td>
          <td>
            <input
              type="image" src={check} className="btn-img"
              onClick={(e) => props.updateTipStatus(props.tip.ID, 'approved', 'issue resolved by moderator')}
            />
            <input
              type="image" src={x} className="btn-img"
              onClick={(e) => props.updateTipStatus(props.tip.ID, 'rejected')}
            />
            {props.tip.concern ? 
              <button className="btn btn-primary btn-sm" onClick={(e) => props.toggleShowTipConcern(e, props.index)}>
                Show More
              </button> : <span></span>
            }
          </td>
        </tr>
      );
    }
  }
};

export default AdminTipEntry;


