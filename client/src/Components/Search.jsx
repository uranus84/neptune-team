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
      <div className="input-group col-md-12">
        <input onChange={this.inputChanged.bind(this)} type="text" className="form-control" placeholder='Search for a City here'></input>
        <span className="input-group-btn">
          <button onClick={() => this.props.search(this.state.input)} className="btn btn-primary" type="button" >Search This Location</button>
        </span>
      </div>
    )
  }
}

export default Search;