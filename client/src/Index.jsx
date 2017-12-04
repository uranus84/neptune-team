import React from 'react';
import App from './App.jsx';
import axios from 'axios';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home'
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
        <nav className="navbar navbar-light">
          <div className="col-sm-2" id="titlebar">
            <h1 id="titlefont">infoMapp</h1>
            <h2 id="subtitlefont">Learn More With Just A Click</h2>
          </div>
          <div className="col">
            <button type="button" className="nav-item btn btn-primary btn-outline-success my-2 my-sm-0 nav-btn" onClick={() => { this.changeView('home'); }}>Home</button>
            <button type="button" className="nav-item btn btn-primary btn-outline-success my-2 my-sm-0 nav-btn" onClick={() => { this.changeView('map'); }}>Map</button>
            <button type="button" className="nav-item btn btn-primary btn-outline-success my-2 my-sm-0 nav-btn" onClick={() => { this.changeView('social'); }}>Social</button>
            <button type="button" className="nav-item btn btn-primary btn-outline-success my-2 my-sm-0 nav-btn" onClick={() => { this.changeView('compare'); }}>Compare</button>
            <div className="btn-group-vertical pull-right">
              <a href="/auth/facebook" className="nav-item btn btn-primary btn-outline-success my-2 my-sm-0 nav-btn admin-btn"><span className="fa fa-facebook"></span>Facebook</a>
              <button type="button" className="nav-item btn btn-primary btn-outline-success my-2 my-sm-0 nav-btn admin-btn" onClick={ () => this.logout() }>Logout</button>
            </div>
            <button type="button" className="nav-item btn btn-primary btn-outline-success my-2 my-sm-0 nav-btn admin-btn pull-right" onClick={() => { this.changeView('admin'); }}>Admin</button>
          </div>
        </nav>
        <div className="row">

        </div>
        <div className="row content">
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