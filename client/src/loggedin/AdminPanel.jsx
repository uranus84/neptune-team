import React from 'react';
import axios from 'axios';
import AdminTipEntry from './AdminTipEntry.jsx';

class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flaggedTipsCount: 0,
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
    this.toggleShowTipConcern = this.toggleShowTipConcern.bind(this);
  }

  componentWillMount() {
    this.getAllTips();
  }

  getAllTips() {
    axios.get('/admin')
      .then((response) => {
        var count = 0;
        response.data.forEach((tip) => {
          if (tip.status === 'flagged') { count++; }
          response.data.showConcern = false;
        });
        this.setState({
          tips: response.data,
          filteredTips: response.data,
          flaggedTipsCount: count
        });
      })
      .catch(err => console.log('client received error', err));
  }

  updateTipStatus(tipId, status, concern) {
    axios.put('/admin', { tipId: tipId, status: status, concern: concern })
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

  toggleShowTipConcern(e, index) {
    e.preventDefault();
    var tips = this.state.filteredTips;
    tips[index].showConcern = !tips[index].showConcern;
    this.setState({ filteredTips: tips });
  }

  render() {
    return (
      <div>
        <h1 className="center">Moderate Tips</h1>
        <p className="center filter-tips">You have {this.state.flaggedTipsCount} flagged tips. View:
          <select onChange={(e) => this.filterTips(e.target.value)}>
            <option value="all">All</option>
            <option value="flagged">Flagged</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          tips
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
                  return <AdminTipEntry
                    tip={tip}
                    key={i}
                    index={i}
                    updateTipStatus={this.updateTipStatus}
                    toggleShowTipConcern={this.toggleShowTipConcern}
                  />;
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