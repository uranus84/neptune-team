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
      .catch(err => console.log('client received error', err));
  }

  deleteTip(tipId) {
    axios.delete('/admin', { data: { tipId: tipId } })
      .then((response) => {
        console.log('deleted tip no. ', tipId);
        this.getAllTips();
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h1 className="center">Moderate Tips</h1>
        <h3 className="center">All Submitted Tips</h3>
        <div className="admin-table">
          <table>
            <tbody>
              <tr>
                <th className="tbl-date">Date</th>
                <th className="tbl-author">Author</th>
                <th className="tbl-content">Content</th>
                <th className="tbl-city">City</th>
                <th className="tbl-state">State</th>
                <th className="tbl-btns">Moderate</th>
              </tr>
              {
                this.state.tips.map((tip, i) => {
                  return <AdminTipEntry tip={tip} key={i} deleteTip={this.deleteTip} />;
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AdminPanel;