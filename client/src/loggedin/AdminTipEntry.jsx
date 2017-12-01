import React from 'react';
import moment from 'moment';
import check from '../img/check.png';
import x from '../img/x.png';

var AdminTipEntry = (props) => {
  let status = props.tip.status;
  if (props.tip.tiptext.length > 1) {
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
            onClick={(e) => props.updateTipStatus(props.tip.ID, 'approved')}
          />
          <input
            type="image" src={x} className="btn-img"
            onClick={(e) => props.updateTipStatus(props.tip.ID, 'rejected')}
          />
        </td>
      </tr>
    );
  }
};

export default AdminTipEntry;


