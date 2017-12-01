import React from 'react';
import Map from './Components/Map.jsx';
import PhotoInfo from './Components/PhotoInfo.jsx';
import TipsBlock from './Components/TipsBlock.jsx';
import TopTweetsInfo from './Components/TopTweetsInfo.jsx';
import WalkabilityInfo from './Components/WalkabilityInfo.jsx';
import TwitterTrends from './Components/TwitterTrends.jsx';
import AdminPanel from './loggedin/AdminPanel.jsx';
import axios from 'axios';
 

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      topTweetsAbout: ''
    };
  }

  logout() {
    axios.get('/logout')
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

    // this.state.recentTweetsFrom = '';
    // this.state.recentTweetsAbout = '';
    // this.state.oldTweetsFrom = '';
    // this.state.oldTweetsAbout = '';

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

    /*** LONG NASTY CODE TO GET USER'S LOCATION AS INIT VALUES,
    if you want to enable this, must comment out the top codes
      and uncomment everything bellow ***/

    //get the user's location, and set lat and lng to be that
    //if they decline, set sf to be the main.

    //HTML5 geolocation.
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(function(position) {
    //     console.log('User allowed access to their location');

    //     var pos = {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude
    //     };

    //     //get the photo and walkability of the address of user
    //     this.getPhoto(pos.lat, pos.lng);
    //     this.getWalkability(pos.lat, pos.lng);

    //     //need to get the city/state associated with the lat/lon
    //     var geocoder = new google.maps.Geocoder;
    //     geocoder.geocode({'location': pos }, function(results, status) {
    //       if (status === 'OK') {
    //         console.log('MY ADDRESS : ', results);
    //         var result = this.getCityState(results);
    //         var state = result[1];
    //         var city = result[0];

    //         //check if it has a city/state? if not valid, default to sf?
    //         this.setState({
    //           lat: position.coords.latitude,
    //           lng: position.coords.longitude,
    //           city: city,
    //           state: state,
    //           mapLoading: false
    //         });
    //       } else {
    //         console.log('could not acquire user address from lat/long');
    //       }
    //     }.bind(this));
    //   }.bind(this), function(err) {
    //     console.log('User did not allow access to their location');
    //     this.setState({
    //       mapLoading: false
    //     });
    //     this.getPhoto(this.state.lat, this.state.lng);
    //     this.getWalkability(this.state.lat, this.state.lng);

    //   }.bind(this));
    // }
    // else {
    //   //browser doesn't have HTML5 geolocation
    //   this.setState({
    //       mapLoading: false
    //   });
    //   this.getPhoto(this.state.lat, this.state.lng);
    //   this.getWalkability(this.state.lat, this.state.lng);
    // }
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
        <div id="home-page">
          <h1>Welcome!</h1>
          <h3>
            You can either log in through Facebook, or just jump right in and click on the map page to search for a city.
          </h3>
          <img className="eggplant" src="https://cdn1.medicalnewstoday.com/content/images/articles/279/279359/eggplants.jpg" height="300" width="400"></img>
          <h3>This page looked a tad empty, so here are some eggplants. Enjoy!</h3>
        </div>
      );
    }
    if (this.props.view === 'map') {
      return (
        <div>

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
    if (this.props.view === 'admin') {
      return (
        <div className="row">
          <AdminPanel />
        </div>
      );
    }
  }
}

export default App;
// <a href="/auth/facebook" className="btn btn-primary"><span className="fa fa-facebook"></span>Facebook</a>
// <button className="btn btn-primary" onClick={ () => this.logout() }>Logout</button>
