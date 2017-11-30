import React from 'react';
import axios from 'axios';
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
    this.tips = this.state.tips;
    this.getAllTips = this.getAllTips.bind(this);
    this.deleteTip = this.deleteTip.bind(this);
  }

  componentWillMount() {
    this.getAllTips();
  }

  getAllTips() {
    axios.get('/admin')
      .then((response) => {
        this.setState({ tips: response.data});
      })
      .catch(err => console.log(err));
  }

  deleteTip(tipId) {
    axios.delete('/admin', { params: { tipId: tipId }})
      .then((response) => {
        console.log('deleted tip no. ', tipId);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h1>Moderate Tips</h1>
        <h3>All Submitted Tips</h3>
        <table>
          <tbody>
            <tr>
              <th>Date</th>
              <th>Author</th>
              <th>Content</th>
              <th>City</th>
              <th>State</th>
              <th>Moderate</th>
            </tr>
            {
              this.tips.map((tip, i) => {
                return <AdminTipEntry tip={tip} key={i} deleteTip={this.deleteTip} />;
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default AdminPanel;