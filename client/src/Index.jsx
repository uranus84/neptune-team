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
        <nav className="navbar">
          <div className="col-sm-2" id="titlebar">
            <h1 id="titlefont">infoMapp</h1>
            <h2 id="subtitlefont">Learn More With Just A Click</h2>
          </div>
          <div className="col">
            <button type="button" onClick={() => { this.changeView('home'); }}>Home</button>
            <button type="button" onClick={() => { this.changeView('map'); }}>Map</button>
            <button type="button" onClick={() => { this.changeView('social'); }}>Social</button>
            <button type="button" onClick={() => { this.changeView('compare'); }}>Compare</button>
          </div>
        </nav>
        <div className="row">
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
      </div>
    );
  }

}

export default Index;