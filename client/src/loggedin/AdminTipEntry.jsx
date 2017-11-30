import React from 'react';
import moment from 'moment';
//var moment = require('moment');

var AdminTipEntry = (props) => {
  if (props.tip.tiptext.length > 1) {
    return (
      <tr>
        <td>{moment(props.tip.datecreated).calendar()}</td>
        <td>{props.tip.name}</td>
        <td>{props.tip.tiptext}</td>
      </tr>
    );
  }
};

export default AdminTipEntry;


