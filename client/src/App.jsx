import React from 'react';
import Map from './Components/Map.jsx';
import PhotoInfo from './Components/PhotoInfo.jsx';
import TipsBlock from './Components/TipsBlock.jsx';
import TopTweetsInfo from './Components/TopTweetsInfo.jsx';
import WalkabilityInfo from './Components/WalkabilityInfo.jsx';
import TwitterTrends from './Components/TwitterTrends.jsx';
import PostContentComponent from './Components/PostContentComponent.jsx';
import axios from 'axios';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      photoUrl : '',
      walkscore : 0,
      lat: 37.7749,
      lng: -122.4194,
      city: 'san francisco',
      state:'California',
      mapLoading: true,
      tips: []
    };
  }

  getPhoto(lat, lon) {
    //Placeholders until we have lat/lon working
    lat = lat || 37.773972;
    lon = lon || -122.431297;
    axios.get('/googlepics', {params: {lat: lat, lon: lon}})
      .then ((result) => {
        this.setState({'photoUrl': result.data})
      })
      .catch ((error) => {
        console.log(error)
      })
  }

  getWalkability(lat, lon) {
    lat = lat || 37.773972;
    lon = lon || -122.431297;
    axios.get('/walkscore', {params: {lat: lat, lon: lon}})
    .then ((result) => {
      this.setState({walkscore: Math.floor(parseInt(result.data,10))})
    })
    .catch ((error) => {
      console.log(error)
    })
  }

  //This function gets passed down to Map, to extract the City and State from Geocode result
  getCityState(results) {
    //assuming locality and admin. are unique
    var arr = [];
    results[0]['address_components'].forEach(function(addComp) {
      if (addComp.types.includes("locality")) {
        arr[0] = addComp['long_name'];
      }
      if (addComp.types.includes("administrative_area_level_1")) {
        arr[1]= addComp['long_name'];
      }
    });
    return arr; 
  }

  //gets the list of content from the database with city
  getLocalTips() {
    //get request to the server with current city
      //this.setState({tips: result})
  }

  postLocalTipsHandler(email, input, city) {
    //gets called when a user posts a tip.
     //change the email later to this.state.email
    axios.post('/postTips', {email: "deliverable@example.com", content: input, city: city})
    .then((data)=>{
      console.log('stored to database')
    })
    .catch((error)=> {
      console.log(error);
    })
    //can add to the tips list and setState.
  }

  componentWillMount() {
    this.getPhoto(this.state.lat, this.state.lng);
    this.getWalkability(this.state.lat, this.state.lng);
    this.setState({
      mapLoading: false
    });
    //getLocalTips

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
  positionChange(lat, lng, city, state) {
    console.log('The coordinates: ', lat, lng);
    console.log('the city and state: ', city, state);

    this.setState({
      lat: lat,
      lng: lng,
      city: city,
      state: state
    });
    this.getPhoto(lat, lng);
    this.getWalkability(lat, lng);
    //this.getLocalTips(city)
  }

  


  //need this if we want to initialize the state the the user's location
  mapComponent() {
    if (this.state.mapLoading) {
      return <div style={{width: '100%', height: '400px'}}>Loading...</div>;
    } else {
      return <Map callback={this.positionChange.bind(this)} lat={this.state.lat} lng={this.state.lng} city={this.state.city} state={this.state.state} getCityState={this.getCityState}/>;
    }
  }

  //if the local tips is empty, please wait 
  //else the component
  tipsBlockComponent() {
    if (this.state.tips.length === 0) {
      return <div>There are no posted content. </div>
    } else {
      return <TipsBlock tips={this.state.tips}/>
    }
  }

  render() {
    console.log('app rerendeing');
    return (    
        <div className="container-fluid">
          <div className="row">
            <div className="col-12-sm" id="titlebar">
              <h1 id="titlefont">InfoMapp</h1>
              <h2 id="subtitlefont">Learn More With Just A Click</h2>
            </div>
          </div>

          <div className="row">

            <div className="col-sm-9">  
              <div id="mapblock" className="vertical-center">  
                {this.mapComponent()}      
              </div>
              <div id="twittertrends">
                <TwitterTrends/>
              </div>
              <div>
                <PostContentComponent city={this.state.city} post={this.postLocalTipsHandler.bind(this)}/>
              </div>
            </div>


            <div className="col">
              <div id="infoblock">
                
                <div id="walkabilityblock">
                  <WalkabilityInfo walkscore = {this.state.walkscore}/>
                </div>

                <div id="toptweetsblock">
                  <TopTweetsInfo/>
                </div>

                <div id ="tipsblock">
                  <TipsBlock city={this.state.city}/>
                </div>
                
                <div id="photoblock">
                  <PhotoInfo photoUrl = {this.state.photoUrl} lat={this.state.lat} lng={this.state.lng}/>
                </div>

              </div>
            </div>

          </div>
        </div>
    );
  }
}

export default App;


