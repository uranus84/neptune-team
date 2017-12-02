import React from 'react';
import App from './App.jsx';
import axios from 'axios';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'social'
    };
    this.changeView = this.changeView.bind(this);
    this.renderView = this.renderView.bind(this);
  }

  changeView(view) {
    this.setState({
      view: view
    });
  }

  renderView() {
    return ( <App view={this.state.view} /> );
  }

  render() {
    return (
      <div className="main">
        <div>
          <button type="button" name="map" onClick={() => { 
            this.changeView('map');
          }}>Map</button>
        </div>
        {this.state.view === 'compare' ? (
          <div>
            {this.renderView()}
            {this.renderView()}
          </div>
        ) : (
          <div>
            {this.renderView()}
          </div>
        )
        }
      </div>
    );
  }

}

export default Index;