import React from 'react';
import App from './App.jsx';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'compare'
    };
    this.changeView = this.changeView.bind(this);
    this.renderView = this.renderView.bind(this);
  }

  changeView(view) {
    this.setState({
      view: view
    });
    this.renderView();
  }

  renderView() {
    return ( <App view={this.state.view} /> );
  }

  render() {
    return (
      <div className="main">
        <div>
          <h1>TEST HEADER</h1>
        </div>
        {this.renderView()}
        {this.renderView()}
      </div>
    );
  }

}

export default Index;