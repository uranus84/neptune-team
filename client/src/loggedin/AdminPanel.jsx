import React from 'react';
import AdminTipList from './AdminTipList.jsx';

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
        <AdminTipList tips={this.state.tips} />
      </div>
    );
  }
}

export default AdminPanel;