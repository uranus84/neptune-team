import React from 'react';
import axios from 'axios';
import TipsList from './TipsList.jsx';

class TipsBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userIntentCurrent: 'readTips',
      tipsCity: '',
      tipsState: '',
      tipsName: '',
      tipsContent: '',
      currentlyDisplayedTips: [{city: this.props.info.tipsTestCity, name: 'None', state: this.props.info.tipsTestState, tiptext: 'None'}]
    };
    //var context = this;
  }


  componentWillMount () {
    this.getTips();
  }

  changeIntentFn (e) {
    this.setState({userIntentCurrent: e.target.id});
  }

  

  submitTips () {
    // var contexthere = this;
    // var stateList =  {     
    //   arizona: 'az',
    //   alabama: 'al',
    //   alaska: 'ak',
    //   arkansas: 'ar',
    //   california: 'ca',
    //   colorado: 'co',
    //   connecticut: 'ct',
    //   delaware: 'de',
    //   florida: 'fl',
    //   georgia: 'ga',
    //   hawaii: 'hi',
    //   idaho: 'id',
    //   illinois: 'il',
    //   indiana: 'in',
    //   iowa: 'ia',
    //   kansas: 'ks',
    //   kentucky: 'ky',
    //   louisiana: 'la',
    //   maine: 'me',
    //   maryland: 'md',
    //   massachusetts: 'ma',
    //   michigan: 'mi',
    //   minnesota: 'mn',
    //   mississippi: 'ms',
    //   missouri: 'mo',
    //   montana: 'mt',
    //   nebraska: 'ne',
    //   nevada: 'nv',
    //   'new hampshire': 'nh',
    //   'new jersey': 'nj',
    //   'new mexico': 'nm',
    //   'new york': 'ny',
    //   'north carolina': 'nc',
    //   'north dakota': 'nd',
    //   ohio: 'oh',
    //   oklahoma: 'ok',
    //   oregon: 'or',
    //   pennsylvania: 'pa',
    //   'rhode island': 'ri',
    //   'south carolina': 'sc',
    //   'south dakota': 'sd',
    //   tennessee: 'tn',
    //   texas: 'tx',
    //   utah: 'ut',
    //   vermont: 'vt',
    //   virginia: 'va',
    //   washington: 'wa',
    //   'west virginia': 'wv',
    //   wisconsin: 'wi',
    //   wyoming: 'wy',
    // };
    
    // var stateValidatorAndFormatter = function (string) {
    //   var stringLowerCase = string.toLowerCase();
    //   var isState = false;
    //   if (stateList.hasOwnProperty(stringLowerCase)) {isState = true}
    //   if (isState === false) {
    //     for (var k in stateList) {
    //       if (stateList[k] === stringLowerCase) {
    //         isState = true;
    //         stringLowerCase = k;
    //       }
    //     }  
    //   }
    //   if (isState === false) { return false; }
    //   if (isState === true) {this.setState({tipsState: stringLowerCase})}
    //   return stringLowerCase;   
    // };
    
    // if(!stateValidatorAndFormatter(this.state.tipsState)) {
    //   alert(this.state.tipsState + ' Is Not A State, Please Try Again');
    //   // stateStyleColor = {color: 'red', fontWeight: 'bold'};
    // } else {
      // stateStyleColor = {color: 'black', fontWeight: 'normal'};
      axios.post('/tips', {cityData: this.state.tipsCity, stateData: this.state.tipsState, nameData: this.state.tipsName, tipData: this.state.tipsContent })
        .then(function (response) {
          console.log('/tips POST WORKED RESPONSE = ', response);
        })
        .catch(function (error) {
          console.log('/tips POST ERROR',error);
        });
      this.setState({tipsCity: '', tipsState: '', tipsName: '', tipsContent: ''});
      this.getTips();
    // }
  }

  getTips () {
    var context = this;
    axios.get('/tips', {params: {city: this.props.info.tipsTestCity.toLowerCase(), state: this.props.info.tipsTestState.toLowerCase()}})
      .then(function (response) {
        console.log('/tips GET WORKED RESPONSE = ', response.data);
        context.setState({currentlyDisplayedTips: response.data});
      })
      .catch(function (error) {
        console.log('/tips GET ERROR', error);
      });
  }

  changeHandlerFn(e) {
    this.setState({[e.target.id]: e.target.value});
  }

  capitalizeFirstLetterOnly (str) {
    var strArray = str.split(' ');
    for (var i = 0; i < strArray.length; i++) {
      strArray[i] = strArray[i].substring(1, 0).toUpperCase()+strArray[i].substring(1).toLowerCase();
    }
    strArray = strArray.join(' ');
    return strArray;
  };

  render () {
    // var stateStyleColor = {color: 'black', fontWeight: 'normal'};
    if(this.state.userIntentCurrent === 'readTips') {
      return (
        <div>
          {/*<button onClick={this.getTips.bind(this)}>GET DATA TEST BUTTON</button>*/}
          <button id="addTips" onClick={this.changeIntentFn.bind(this)}>I Want To ADD A Tip</button>
          <TipsList info={this.state.currentlyDisplayedTips}/>
        </div>
      )
    }
    if (this.state.userIntentCurrent === 'addTips') {
      return (
      <div>
        <button id="readTips" onClick={this.changeIntentFn.bind(this)}>I Want To READ Tips</button>
        <p>Add A Tip For <span style={{fontWeight: 'bold'}}>{this.capitalizeFirstLetterOnly(this.props.info.tipsTestCity)}</span> Below</p>
        <p>Name</p>
        <input type="text" id="tipsName" value={this.state.tipsName} onChange={this.changeHandlerFn.bind(this)}></input>
        <p>City</p>
        <input type="text" id="tipsCity" value={this.state.tipsCity} onChange={this.changeHandlerFn.bind(this)}></input>
        <p>State</p>
        <input type="text" id="tipsState" value={this.state.tipsState} onChange={this.changeHandlerFn.bind(this)}></input>
        <p>Tip Goes Here</p>
        <textarea type="text" id="tipsContent" style={{width: '100%'}} value={this.state.tipsContent} onChange={this.changeHandlerFn.bind(this)}></textarea>
        <button id="submitTips" onClick={this.submitTips.bind(this)}>SUBMIT TIP</button>
      </div>
      )
    }
  }
}



export default TipsBlock;