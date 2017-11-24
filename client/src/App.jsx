import React from 'react';
import ReactDOM from 'react-dom';
import Map from './Components/Map.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    //default lat/lng is SF
    this.state = {
      lat: 37.7749,
      lng: -122.4194,
      city: 'san francisco',
      state:'California',
      mapLoading: true
    };
  }

    //assuming locality and admin. are unique
  getCityState(results) {
    var arr = [];
    results[0]['address_components'].forEach(function(addComp) {
//       long_name:"Pennsylvania"
    //   short_name:"PA"
//       types: ["administrative_area_level_1", "political"]
      if (addComp.types.includes("locality")) {
        arr[0] = addComp['long_name'];
      }
      if (addComp.types.includes("administrative_area_level_1")) {
        arr[1]= addComp['long_name'];
      }
    });
    return arr; 
  }

  componentWillMount() {
    //get the user's location? and set lat and lng to be that ?
    //if they decline, set sf to be the main.

    //maybe we can preload the big city data? /like the positivity only

    //HTML5 geolocation.
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {

            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            //need to get the city/state associated with the lat/lon
            var geocoder = new google.maps.Geocoder;
            geocoder.geocode({'location': pos }, function(results, status) {
              if (status === 'OK') {
                console.log('MY ADDRESS : ', results);


                var result = this.getCityState(results);
                var state = result[1];
                var city = result[0];
                this.setState({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                  city: city,
                  state: state,
                  mapLoading: false
                });
              } else {
                console.log('why');
              }
            }.bind(this));


          }.bind(this), function(err) {
            console.log('user did not allow access to their lcoation');
            this.setState({
              mapLoading: false
            });
          }.bind(this)
          );
      } else {
        //browser doesn't have HTML5 geolocation
        this.setState({
            mapLoading: false
        });
      }
  }

  positionCallBack(lat, lng, city, state) {
    //gets called with the user's clicked location coordinates.
    console.log('The coordinates: ', lat, lng);
    console.log('the city and state: ', city, state);
    this.setState({
      lat: lat,
      lng: lng,
      city: city,
      state: state
    });
  }

  mapComponent() {
    if (this.state.mapLoading) {
      return <div style={{width: '80%', height: '400px'}}>Loading...</div>;
    } else {
      return  <Map callback={this.positionCallBack.bind(this)} lat={this.state.lat} lng={this.state.lng} city={this.state.city} state={this.state.state} getCityState={this.getCityState}/>;
    }
  }

  render() {
    return (
      <div>
        {this.mapComponent()}
        <p>{this.state.lat} {this.state.lng}</p>
        <p>{this.state.state} {this.state.city}</p>
        <p>Twitter Component</p>
        <p>Walkable Component</p>
      </div>
    ) 
  }
}
// export default App;

ReactDOM.render(<App />, document.getElementById('mount'));

