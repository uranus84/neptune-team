import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
  }

  inputChanged(e) {
    console.log(e.target.value);
    this.setState({
      input: e.target.value
    });
  }

  render() {
    return (
      <div>
        <input onChange={this.inputChanged.bind(this)} placeholder='Search for a City here'></input>
        <button onClick={() => this.props.search(this.state.input)}>Search</button>
      </div>
    )
  }
}

export default Search;