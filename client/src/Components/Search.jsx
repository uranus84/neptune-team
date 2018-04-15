import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
  }

  inputChanged(e) {
    if (e.key === 'Enter') {
      this.props.search(this.state.input);
    }
    console.log(e.key);
    this.setState({
      input: e.target.value
    });
  }

  render() {
    return (
      <div className='searchField'>
        <input onKeyPress={this.inputChanged.bind(this)} type="text" className="search-input" placeholder='Search for a City here'></input>
      </div>
    );
  }
}

export default Search;