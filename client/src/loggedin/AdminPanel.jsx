import React from 'react';
// import AdminTipList from './AdminTipList.jsx';
import AdminTipEntry from './AdminTipEntry.jsx';

class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tips: [
        {
          ID: 1,
          city: 'san francisco',
          datecreated: '2017-11-30T03:41:47.000Z',
          name: 'James Dean',
          state: 'california',
          tiptext: 'Be sure to see the Golden Gate park'
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <h1>Moderate Tips</h1>
        <h3>All Submitted Tips</h3>
        <table>
          <tr>
            <th>Date</th>
            <th>Author</th>
            <th>Content</th>
            <th>City</th>
            <th>State</th>
            <th>Moderate</th>
          </tr>
          <tbody>
            {
              this.state.tips.map((tip, i) => <AdminTipEntry tip={tip} key={i}/>)
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default AdminPanel;