import React from 'react';
import axios from 'axios';
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
      ],
      filteredTips: []
    };
    this.getAllTips = this.getAllTips.bind(this);
    this.updateTipStatus = this.updateTipStatus.bind(this);
    this.filterTips = this.filterTips.bind(this);
  }

  componentWillMount() {
    this.getAllTips();
  }

  getAllTips() {
    axios.get('/admin')
      .then((response) => {
        this.setState({
          tips: response.data,
          filteredTips: response.data
        });
      })
      .catch(err => console.log('client received error', err));
  }

  updateTipStatus(tipId, status) {
    axios.put('/admin', { tipId: tipId, status: status })
      .then((response) => {
        console.log('updated tip no. ', tipId);
        this.getAllTips();
      })
      .catch(err => console.log(err));
  }

  filterTips(status) {
    if (status === 'all') {
      this.setState({ filteredTips: this.state.tips });
    } else {
      let filteredTips = this.state.tips.filter((tip) => {
        return tip.status === status;
      });
      this.setState({ filteredTips: filteredTips });
    }
  }

  render() {
    return (
      <div>
        <h1 className="center">Moderate Tips</h1>
        <h3 className="center">All Submitted Tips</h3>
        <p className="center filter-tips">View:
          <select onChange={(e) => this.filterTips(e.target.value)}>
            <option value="all">All</option>
            <option value="flagged">Flagged</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </p>
        <div className="admin-table">
          <table>
            <tbody>
              <tr>
                <th className="tbl-date">Date</th>
                <th className="tbl-author">Author</th>
                <th className="tbl-content">Content</th>
                <th className="tbl-city">City</th>
                <th className="tbl-state">State</th>
                <th className="tbl-status">Status</th>
                <th className="tbl-btns">Moderate</th>
              </tr>
              {
                this.state.filteredTips.map((tip, i) => {
                  return <AdminTipEntry tip={tip} key={i} updateTipStatus={this.updateTipStatus} />;
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