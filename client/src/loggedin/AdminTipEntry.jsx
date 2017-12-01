import React from 'react';
import moment from 'moment';

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
          <button className="btn btn-primary" onClick={(e) => props.deleteTip(props.tip.ID)}>
            Delete
          </button>
        </td>
      </tr>
    );
  }
};

export default AdminTipEntry;


