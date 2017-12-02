import React from 'react';
import axios from 'axios';
import TipsList from './TipsList.jsx';
import TipsPopUp from './TipsPopUp.jsx';


class TipsBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userIntentCurrent: 'readTips',
      areTipsExpanded: false,
      flaggedTipConcern: '',
      flaggedTipId: null,
      tipsCity: '',
      tipsState: '',
      tipsName: '',
      tipsContent: '',
      currentlyDisplayedTips: [
        {
          city: this.props.info.city,
          name: 'None',
          state: this.props.info.state,
          tiptext: 'None'
        }
      ]
    };
    this.flagTip = this.flagTip.bind(this);
    this.toggleFlaggedTip = this.toggleFlaggedTip.bind(this);
  }

  componentWillReceiveProps () {
    this.getTips();
    this.setState({
      tipsCity: this.capitalizeFirstLetterOnly(this.props.info.city),
      tipsState: this.capitalizeFirstLetterOnly(this.props.info.state)
    });
  }

  componentWillMount () {
    console.log('mounting tips block');
    this.getTips();
    //this.setState({tipsCity: this.capitalizeFirstLetterOnly(this.props.info.city), tipsState: this.props.info.state});
  }

  changeIntentFn (e, tipId) {
    this.setState({ userIntentCurrent: e.target.id, flaggedTipId: tipId });
  }

  submitTips () {
    var contexthere = this;
    var stateList = {     
      arizona: 'az',
      alabama: 'al',
      alaska: 'ak',
      arkansas: 'ar',
      california: 'ca',
      colorado: 'co',
      connecticut: 'ct',
      delaware: 'de',
      florida: 'fl',
      georgia: 'ga',
      hawaii: 'hi',
      idaho: 'id',
      illinois: 'il',
      indiana: 'in',
      iowa: 'ia',
      kansas: 'ks',
      kentucky: 'ky',
      louisiana: 'la',
      maine: 'me',
      maryland: 'md',
      massachusetts: 'ma',
      michigan: 'mi',
      minnesota: 'mn',
      mississippi: 'ms',
      missouri: 'mo',
      montana: 'mt',
      nebraska: 'ne',
      nevada: 'nv',
      'new hampshire': 'nh',
      'new jersey': 'nj',
      'new mexico': 'nm',
      'new york': 'ny',
      'north carolina': 'nc',
      'north dakota': 'nd',
      ohio: 'oh',
      oklahoma: 'ok',
      oregon: 'or',
      pennsylvania: 'pa',
      'rhode island': 'ri',
      'south carolina': 'sc',
      'south dakota': 'sd',
      tennessee: 'tn',
      texas: 'tx',
      utah: 'ut',
      vermont: 'vt',
      virginia: 'va',
      washington: 'wa',
      'west virginia': 'wv',
      wisconsin: 'wi',
      wyoming: 'wy',
    };
    
    var stateValidatorAndFormatter = function (string) {
      var stringLowerCase = string.toLowerCase();
      var isState = false;
      if (stateList.hasOwnProperty(stringLowerCase)) { isState = true; }
      if (isState === false) {
        for (var k in stateList) {
          if (stateList[k] === stringLowerCase) {
            isState = true;
            stringLowerCase = k;
          }
        }  
      }
      if (isState === false) { return false; }
      if (isState === true) { contexthere.setState({ tipsState: stringLowerCase }); }
      return stringLowerCase;   
    };
    
    if (!stateValidatorAndFormatter(this.state.tipsState)) {
      alert(this.state.tipsState + ' Is Not A State, Please Try Again');
    } else {
      axios.post('/tips', {
        cityData: this.state.tipsCity,
        stateData: stateValidatorAndFormatter(this.state.tipsState),
        nameData: this.state.tipsName,
        tipData: this.state.tipsContent
      })
        .then(function (response) {
          // console.log('/tips POST WORKED RESPONSE = ', response);
          contexthere.setState({tipsCity: '', tipsState: '', tipsName: '', tipsContent: ''});
          contexthere.getTips();
          // console.log('FINAL RAN!!!');
        })
        .catch(function (error) {
          console.log('/tips POST ERROR', error);
        });
    }
  }

  getTips () {
    var context = this;
    axios.get('/tips', { params: {
      city: this.props.info.city.toLowerCase(),
      state: this.props.info.state.toLowerCase()
    }})
      .then(function (response) {
        // console.log('/tips GET WORKED RESPONSE = ', response.data);
        // console.log('CHECK THIS OUT!!!! = ', response.data.length);
        if (response.data.length < 1) {
          var notes = {
            city: context.props.info.city,
            datecreated: '',
            name: 'No data',
            state: context.props.info.state,
            tiptext: 'No Tips Provided Yet'
          };
          response.data = [notes];
        } else {
          // add a "hide" tag in order to allow user to show/hide flagged content
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].status === 'flagged') {
              response.data[i].hide = true;
            } else {
              response.data[i].hide = false;
            }
          }
        }
        context.setState({currentlyDisplayedTips: response.data});
      })
      .catch(function (error) {
        console.log('/tips GET ERROR', error);
      });
  }

  changeHandlerFn(e, tipId) {
    this.setState({ [e.target.id]: e.target.value});
  }

  capitalizeFirstLetterOnly (str) {
    var strArray = str.split(' ');
    for (var i = 0; i < strArray.length; i++) {
      strArray[i] = `${strArray[i].substring(1, 0).toUpperCase()}${strArray[i].substring(1).toLowerCase()}`;
    }
    strArray = strArray.join(' ');
    return strArray;
  }

  expandTipsDisplayFn () {
    this.setState({ areTipsExpanded: !this.state.areTipsExpanded });
  }

  flagTip() {
    axios.put('/tips', { tipId: this.state.flaggedTipId, concern: this.state.flaggedTipConcern })
      .then((response) => {
        console.log('flagged tip no. ', this.state.flaggedTipId);
        this.getTips();
      })
      .catch(err => console.log(err));
  }

  toggleFlaggedTip(index) {
    var tips = this.state.currentlyDisplayedTips;
    tips[index].hide = !tips[index].hide;
    this.setState({ currentlyDisplayedTips: tips });
  }

  render () {
    // var stateStyleColor = {color: 'black', fontWeight: 'normal'};
    if (this.state.userIntentCurrent === 'readTips') {
      return (
        <div>
          <div>
            {/*<button onClick={this.getTips.bind(this)}>GET DATA TEST BUTTON</button>*/}
            {/*<button onClick={this.adminAccessFn.bind(this)}>TEST ON ADMIN ACCESS</button>*/}
            <h3>Tips From {this.capitalizeFirstLetterOnly(this.state.currentlyDisplayedTips[0].city)}</h3>
            <button
              id="areTipsExpanded"
              className="btn btn-primary"
              style={{ margin: '2px' }}
              onClick={this.expandTipsDisplayFn.bind(this)}
            >
              Expand Tips For Easier Reading
            </button>
            <button 
              id="addTips"
              className="btn btn-primary"
              onClick={this.changeIntentFn.bind(this)}
            >
              I Want To ADD A Tip
            </button>
            <TipsList
              flagTip={this.changeIntentFn.bind(this)}
              toggleFlaggedTip={this.toggleFlaggedTip}
              info={this.state.currentlyDisplayedTips}/>
          </div>
          {
            this.state.areTipsExpanded ? <TipsPopUp
              info={this.state.currentlyDisplayedTips} 
              flagTip={this.changeIntentFn.bind(this)}
              toggleFlaggedTip={this.toggleFlaggedTip}
              clickCloseFn={this.expandTipsDisplayFn.bind(this)}
            /> : <div></div>
          }
     
        </div>
      );
    }
    if (this.state.userIntentCurrent === 'addTips') {
      return (
        <div className="popup">
          <div className="popup_inner">
            <button
              id="readTips"
              className="btn btn-primary"
              onClick={this.changeIntentFn.bind(this)}
            >
              I Want To READ Tips
            </button>
            <button
              id="readTips"
              className="btn btn-primary toprightclass"
              onClick={this.changeIntentFn.bind(this)}
            >
              X
            </button>
            
            <form onSubmit={this.submitTips.bind(this)}>
              <h4>Add A Tip For 
                <span style={{fontWeight: "bold"}}>
                  {this.capitalizeFirstLetterOnly(this.props.info.city)}
                </span>
              Below</h4>
              <div>
                <div>
                  <div className="popup_label">Name :</div>
                  {/*INPUT USER'S NAME*/}
                  <input
                    type="text"
                    required
                    id="tipsName"
                    value={this.state.tipsName}
                    onChange={this.changeHandlerFn.bind(this)}
                  />
                </div>
              </div>

              <div>
                <div className="popup_label">City:</div>
                {/*INPUT CITY*/}
                <input
                  type="text"
                  required
                  id="tipsCity"
                  value={this.state.tipsCity}
                  onChange={this.changeHandlerFn.bind(this)}
                />
              </div>

              <div>
                <div className="popup_label">State:</div>
                {/*INPUT STATE*/}
                <input
                  type="text"
                  required
                  id="tipsState"
                  value={this.state.tipsState}
                  onChange={this.changeHandlerFn.bind(this)}
                />
              </div>

              <div id="tipsContentWrapper">
                <div className="popup_label_tips_exception">Tip Goes Here:</div>
                {/*INPUT TIP CONTENT*/}
                <textarea
                  type="text"
                  required
                  rows="5"
                  id="tipsContent"
                  style={{ width: "50%", display: "block" }}
                  value={this.state.tipsContent}
                  onChange={this.changeHandlerFn.bind(this)}
                >
                </textarea>
              </div>

              <button
                id="submitTips"
                type="submit"
                className="btn btn-primary, redbtn"
              >
                SUBMIT TIP
              </button>
            </form>
          
          </div>
        </div>
      );
    }
    if (this.state.userIntentCurrent === 'flag-tip') {
      return (
        <div className="popup">
          <div className="popup_inner">
            <button
              id="readTips"
              className="btn btn-primary toprightclass"
              onClick={this.changeIntentFn.bind(this)}
            >
              X
            </button>
            
            <form onSubmit={this.flagTip.bind(this)}>
              <h4>Flag Tip for Inappropriate Content</h4>

              <div id="tipsContentWrapper">
                <div className="popup_label_tips_exception">Why are you flagging this tip?</div>
                <textarea
                  type="text"
                  required
                  rows="5"
                  id="flaggedTipConcern"
                  style={{ width: '50%', display: 'block' }}
                  value={this.state.flaggedTipConcern}
                  onChange={this.changeHandlerFn.bind(this)}
                >
                </textarea>
              </div>

              <button
                id="flagTip"
                type="submit"
                className="btn btn-primary, redbtn"
              >
                FLAG TIP
              </button>
            </form>
          
          </div>
        </div>
      );
    }
  }
}






export default TipsBlock;






