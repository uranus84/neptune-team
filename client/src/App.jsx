import React from 'react';
import Map from './Components/Map.jsx';
import PhotoInfo from './Components/PhotoInfo.jsx';
import TipsBlock from './Components/TipsBlock.jsx';
import TopTweetsInfo from './Components/TopTweetsInfo.jsx';
import WalkabilityInfo from './Components/WalkabilityInfo.jsx';
import TwitterTrends from './Components/TwitterTrends.jsx';
import AdminPanel from './loggedin/AdminPanel.jsx';
import axios from 'axios';
import sfBackground from './img/sfBackground.jpg';
 

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModerator: false,
      tipsTestCity: 'san francisco',
      tipsTestState: 'California',
      photoUrl: [],
      walkscore: '',
      lat: 37.7749,
      lng: -122.4194,
      city: 'san francisco',
      cityShortName: 'sf',
      state: 'California',
      mapLoading: true,
      topTweetsFrom: '',
      topTweetsAbout: '',
      recentTweetsFrom: '',
      recentTweetsAbout: '',
      oldTweetsFrom: '',
      oldTweetsAbout: '',
      topTweetsFrom: '',
      topTweetsAbout: '',
      friends: []
    };
  }

  getFriends() {
    FB.api('/me/friends?fields=location,about,birthday,name,picture', (res) => {
      console.log(res);
    });
  }

  admin() {
    axios.get('/lalaAdmin')
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getTopTweetsFrom(lat, lon) {
    this.setState({topTweetsFrom: ''});
    axios.get('/topTweetsFrom', {params: {lat: lat, lon: lon}})
      .then((results) =>{
        this.setState({topTweetsFrom: results.data});
      })
      .catch((err) => {});
  }

  getTopTweetsAbout(city, cityShortName) {
    this.setState({topTweetsAbout: ''});
    axios.get('/topTweetsAbout', {params: {city: city, cityShortName: cityShortName}})
      .then((results) =>{
        this.setState({topTweetsAbout: results.data});
      })
      .catch((err) => {});
  }

  getTweetTrends(lat, lon, city, cityShortName) {
    this.setState({
      recentTweetsFrom: '',
      recentTweetsAbout: '',
      oldTweetsFrom: '',
      oldTweetsAbout: ''
    });

    axios.get('/recentTweetsFrom', {params: {lat: lat, lon: lon}})
      .then((results) => {
        this.setState({recentTweetsFrom: results.data});
      })
      .catch((err) => { console.log(err); });

    axios.get('/oldTweetsFrom', {params: {lat: lat, lon: lon}})
      .then((results) => {
        this.setState({oldTweetsFrom: results.data});
      })
      .catch((err) => { console.log(err); });

    axios.get('/recentTweetsAbout', {params: {city: city, cityShortName: cityShortName}})
      .then((results) => {
        this.setState({recentTweetsAbout: results.data});
      })
      .catch((err) => { console.log(err); });

    axios.get('/oldTweetsAbout', {params: {city: city, cityShortName: cityShortName}})
      .then((results) => {
        this.setState({oldTweetsAbout: results.data});
      })
      .catch((err) => { console.log(err); });
  }

  getPhoto(lat, lon) {
    axios.get('/googlepics', {params: {lat: lat, lon: lon}})
      .then ((result) => {
        //TODO: CHANGE THIS BACK LATER! PHOTO IS HARDCODED
        this.setState({'photoUrl': result.data});
      })
      .catch ((error) => {
        console.log(error);
      });
  }

  getWalkability(lat, lon) {
    this.setState({walkscore: ''});
    axios.get('/walkscore', {params: {lat: lat, lon: lon}})
      .then ((result) => {
        console.log('walkscore result: ', result);
        this.setState({walkscore: Math.floor(parseInt(result.data, 10))});
      })
      .catch ((error) => {
        console.log(error);
      });
  }

  //This function gets passed down to Map, to extract the City and State from Geocode result
  getCityState(results) {
    //assuming locality and admin. are unique
    var arr = [];
    results[0]['address_components'].forEach(function(addComp) {
      if (addComp.types.includes('locality')) {
        arr[0] = addComp['long_name'];
      }
      if (addComp.types.includes('administrative_area_level_1')) {
        arr[1] = addComp['long_name'];
      }
      if (addComp.types.includes('locality')) {
        arr[2] = addComp['short_name'];
      }
    });
    return arr;
  }

  componentWillMount() {
    this.getPhoto(this.state.lat, this.state.lng);
    this.getWalkability(this.state.lat, this.state.lng);
    this.getTweetTrends(this.state.lat, this.state.lng, this.state.city, this.state.cityShortName);
    this.getTopTweetsFrom(this.state.lat, this.state.lng);
    this.getTopTweetsAbout(this.state.city, this.state.cityShortName);
    this.setState({
      mapLoading: false
    });
  }

  //The Map component calls this function with the updated values
  //gets called with the user's clicked/searched location coordinates and city/state
  positionChange(lat, lng, city, state, cityShortName) {
    console.log('The coordinates: ', lat, lng);
    console.log('the city and state: ', city, state);

    this.setState({
      lat: lat,
      lng: lng,
      city: city,
      state: state,
      cityShortName: cityShortName
    });

    
    this.getPhoto(lat, lng);
    this.getWalkability(lat, lng);
    this.getTweetTrends(this.state.lat, this.state.lng, this.state.city, this.state.cityShortName);
    this.getTopTweetsFrom(this.state.lat, this.state.lng);
    this.getTopTweetsAbout(this.state.city, this.state.cityShortName);
  }

  //need this if we want to initialize the state the the user's location
  mapComponent() {
    if (this.state.mapLoading) {
      return <div style={{width: '100%', height: '400px'}}>Loading...</div>;
    } else {
      return <Map callback={this.positionChange.bind(this)} lat={this.state.lat} lng={this.state.lng} city={this.state.city} state={this.state.state} getCityState={this.getCityState}/>;
    }
  }

  render() {
    console.log('app rerendering');
    if (this.props.view === 'home') {
      return (
        <div id="home-page" className="homepage">
          <div className="homepage-contents">
            <h1>Welcome!</h1>
            <h3>
              You can either log in through Facebook, or just jump right in and click on the map page to search for a city.
            </h3>
          </div>
        </div>
      );
    }
    if (this.props.view === 'map') {
      return (
        <div className="row">

          <div className="col-sm-8">
            <div id="mapblock" className="vertical-center">
              {this.mapComponent()}
            </div>
          </div>

          <div className="col-sm-4">
            <div id="walkabilityblock">
              <WalkabilityInfo walkscore = {this.state.walkscore}/>
            </div>
            <div id="photoblock">
              <PhotoInfo photoUrl={this.state.photoUrl} lat={this.state.lat} lng={this.state.lng}/>
            </div>
          </div>
        </div>
      );
    }
    if (this.props.view === 'social') {
      return (
        <div className="row">

          <div className="col-sm-8">
            <div id="twittertrends">
              <TwitterTrends recentTweetsAbout={this.state.recentTweetsAbout} recentTweetsFrom={this.state.recentTweetsFrom}
                oldTweetsFrom={this.state.oldTweetsFrom} oldTweetsAbout={this.state.oldTweetsAbout} city={this.state.city} state={this.state.state}/>
            </div>
          </div>

          <div className="col-sm-4">
            <div id ="tipsblock">
              <TipsBlock info={this.state}/>
            </div>
            <div id="toptweetsblock">
              <TopTweetsInfo topTweetsFrom={this.state.topTweetsFrom} topTweetsAbout={this.state.topTweetsAbout} city={this.state.city}/>
            </div>
          </div>

        </div>
      );
    }
    if (this.props.view === 'compare') {
      return (
        <div className="col-sm-6">

          <div className="col">
            <div id="mapblock" className="vertical-center">
              {this.mapComponent()}
            </div>
          </div>

          <div className="col">
            <div id="twittertrends">
              <TwitterTrends recentTweetsAbout={this.state.recentTweetsAbout} recentTweetsFrom={this.state.recentTweetsFrom}
                oldTweetsFrom={this.state.oldTweetsFrom} oldTweetsAbout={this.state.oldTweetsAbout} city={this.state.city} state={this.state.state}/>
            </div>
          </div>

          <div className="row">
          
            <div className="col-sm-6">
              <div id="walkabilityblock">
                <WalkabilityInfo walkscore = {this.state.walkscore}/>
              </div>
            </div>

            <div className="col-sm-6">
              <div id ="tipsblock">
                <TipsBlock info={this.state}/>
              </div>
            </div>

          </div>

          <div id="photoblock">
            <PhotoInfo photoUrl={this.state.photoUrl} lat={this.state.lat} lng={this.state.lng}/>
          </div>

        </div>
      );
    }
    if (this.props.view === 'moderator') {
      console.log('admin status ', this.props.isModerator);
      if (this.props.isModerator) {
        return (
          <div className="row">
            <AdminPanel />
          </div>
        );
      } else {
        return (
          <div className="row">
            <p className="center">Unauthorized.
              <br />Please log in as an administrative user by clicking the Facebook button above.
            </p>
          </div>
        );
      }
    }
    if (this.props.view === 'loggedOut') {
      return (
        <div className="row">
          <p className="center">You are now logged out.</p>
        </div>
      );
    }
  }
}

export default App;
