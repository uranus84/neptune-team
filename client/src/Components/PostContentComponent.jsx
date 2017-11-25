import React from 'react';
import validator from 'validator';
import axios from 'axios';

class PostContentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      input: ''
    }
  }

  onInputChange(e) {
    this.setState({
      input: e.target.value
    });
  }

  onEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  shareClicked() {
    if (this.email === '' || this.input === '') {
      alert('Please complete the form completely');
    } else {
      console.log('shareClicked');
      //call a hadnler in app.jsx
      //then in app.jsx, post it from there and then set the state to the new list


      //make sure email is valid and exists
      //use the two npm modules.
      //if they are valid and exist, make a post request to the server
      //with email, content, city 

      //look at the options more later


      // if (validator.isEmail(this.state.email)) {
      //   axios.post('/postTips', {data: {'email': 'why', 'content': 'ugh', 'city': 'sacramento'}})
      //   .then ((result) => {
          
      //   })
      //   .catch ((error) => {
      //     console.log(error)
      //   })
      // }
      this.props.post(this.state.email, this.state.input, this.state.city);
    }
  }

  render() {
    return (
      <div>
        <p>Have something to share about this city?</p>
        <input placeholder='enter your email address here' onChange={this.onEmailChange.bind(this)}></input>
        <input placeholder='what would you like to share?' onChange={this.onInputChange.bind(this)}></input>
        <button onClick={this.shareClicked.bind(this)}>Share</button>
      </div>
    )
  }
}

export default PostContentComponent;

