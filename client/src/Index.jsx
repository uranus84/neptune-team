import React from 'react';
import App from './App.jsx';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home'
    };
    this.changeView = this.changeView.bind(this);
  }

  changeView(view) {
    this.setState({
      view: view
    });
  }

  renderView() {
    const view = this.state.view;
    if (view === 'home') {
      return <App />;
    }
  }

  render() {
    return (
      <div className="main">
        <div>
          <h1>TEST HEADER</h1>
        </div>
        {this.renderView()}
      </div>
    );
  }

}

export default Index;