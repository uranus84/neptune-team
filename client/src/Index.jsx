import React from 'react';
import App from './App.jsx';
import axios from 'axios';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home',
      isModerator: false
    };
    this.changeView = this.changeView.bind(this);
    this.renderView = this.renderView.bind(this);
    this.logout = this.logout.bind(this);
  }

  changeView(view) {
    this.setState({
      view: view
    });
  }

  renderView() {
    return ( <App isModerator={this.state.isModerator} view={this.state.view} /> );
  }

  logout() {
    axios.get('/logout');
    this.setState({ isModerator: false });
    this.changeView('loggedOut');
  }

  componentWillMount() {
    axios.get('/moderator')
      .then((response) => {
        this.setState({ isModerator: response.data});
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="main">
        <nav className="navbar">
          <div className="col">
            <button type="button" className="navbar-button" onClick={() => { this.changeView('home'); }}>Home</button>
            <button type="button" className="navbar-button" onClick={() => { this.changeView('map'); }}>Map</button>
            <button type="button" className="navbar-button" onClick={() => { this.changeView('social'); }}>Social</button>
            <button type="button" className="navbar-button" onClick={() => { this.changeView('compare'); }}>Compare</button>
            <div className="btn-group-vertical pull-right">
              <a href="/auth/facebook" className="navbar-button smallbutton">Facebook</a>
              <button type="button" className="navbar-button smallbutton" onClick={ this.logout }>Logout</button>
            </div>
            <button type="button" className="navbar-button" onClick={() => { this.changeView('moderator'); }}>Moderator</button>
          </div>
          <div className="col-sm-2" id="titlebar">
            <h1 id="titlefont">infoMapp</h1>
            <h2 id="subtitlefont">Learn More With Just A Click</h2>
          </div>
        </nav>
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
        <div className="icons">
          <a href="https://github.com/uranus84/neptune-team">
            <span class="fa fa-github"></span>
          </a>
        </div>
      </div>
    );
  }

}

export default Index;