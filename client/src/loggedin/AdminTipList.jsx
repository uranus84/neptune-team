import React from 'react';
import AdminTipEntry from './AdminTipEntry.jsx';

var AdminTipList = (props) => (
  <div>
    <tr>
      <th>Date</th>
      <th>Author</th>
      <th>Content</th>
    </tr>
    <tbody>
      {
        props.tips.map((tip, i) => <AdminTipEntry tip={tip} key={i}/>)
      }
    </tbody>
  </div>
);

export default AdminTipList; 