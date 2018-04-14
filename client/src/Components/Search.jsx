import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
  }

  inputChanged(e) {
    console.log(e.target.value);
    this.setState({
      input: e.target.value
    });
  }

  render() {
    return (
      <div id='searchField' className="input-group col-md-12">
        <input onChange={this.inputChanged.bind(this)} type="text" className="search-input" placeholder='Search for a City here'></input>
        <span className="search-button">
          <button onClick={() => this.props.search(this.state.input)} className="search-button" type="button" >Search</button>
        </span>
      </div>
    );
  }
}

export default Search;