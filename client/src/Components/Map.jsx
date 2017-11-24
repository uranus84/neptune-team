import React from 'react';
import Search from './Search.jsx';
import styles from './mapStyle.js';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: []
    }
    this.map;
    this.geocoder = new google.maps.Geocoder();
    this.searchedCities = {};
  }

  componentDidMount() {
    this.initializeMap();
  }

  setMarker(lat, lng, city, state) {
    var marker = new google.maps.Marker({
      map: this.map,
      position: {lat: lat, lng: lng},
      icon: {
        size: new google.maps.Size(40, 40),
        scaledSize: new google.maps.Size(30, 30),
        url: 'marker.png',
        clickable: true
      } 
    });

    marker.setValues({city: city, state: state});
    // console.log('getting tag: ', marker.get('city'));

    this.state.markers.push(marker);
    var infowindow3 = new google.maps.InfoWindow();
    infowindow3.setContent('<div>'+ city +'</div>');
    infowindow3.open(this.map, marker);

    marker.addListener('click', function(e) {
      console.log('marker was clicked!', e.latLng.lat(), e.latLng.lng());
      this.props.callback(e.latLng.lat(), e.latLng.lng(), marker.get('city'), marker.get('state'));
      infowindow3.open(this.map, marker);
    }.bind(this));
  }

  /* MAP INITIALIZATION*/
  initializeMap() {
    console.log('init map here ', this.props.lat);
    var myLatlng = {lat: ()=>this.props.lat, lng: ()=>this.props.lng};

    this.searchedCities[this.props.city.toLowerCase()+this.props.state.toLowerCase()] = [myLatlng, this.props.state];

    console.log('serached citites: ', this.searchedCities);
    //creating an instance of map
    this.map = new google.maps.Map(this.refs.map, {
      zoom: 6,
      center: {lat: this.props.lat, lng: this.props.lng},
      disableDoubleClickZoom: true,
    });

    //created a fusiontable with the shape of the US.
     var layer = new google.maps.FusionTablesLayer({
      suppressInfoWindows: true,
      map: this.map,
      heatmap: { enabled: false },
      query: {
        select: "col0",
        from: "1YaEiwRikHEf37z8GWISY5EpSMkX_XdSKlYVx97Mj",
        where: ""
      },
      options: {
        styleId: 2,
        templateId: 2
      }
    });
    this.setMarker(this.props.lat, this.props.lng, this.props.city, this.props.state);

    //when a user clicks on the map layer, only have access to the long/lat
    google.maps.event.addListener(layer, 'click', function(event) {
      console.log('here, searched cities: ',this.searchedCities);
      //get the city and state associated with the lat/lon
      this.geocoder.geocode({'location': event.latLng}, function(results, status) {
        // console.log('click results: ', results);
        var citystate = this.props.getCityState(results);
        //[city, state]
        if (!citystate[0]) {
          //not a valid city? 
          alert('please enter a valid city')
        }
        var city = citystate[0].toLowerCase();
        var state = citystate[1].toLowerCase();

         //check if the city was already searched.
        if (this.searchedCities[city+state]) {
          console.log('city was already clicked and searched');
          this.searched(city, city+state);
        } else {
          console.log('US layer is getting clicked!', event);
          console.log(event.latLng.lat(), event.latLng.lng());

          //save to searchedCities
          this.searchedCities[city+state] = [event.latLng, state];
          this.map.setCenter(event.latLng);
          this.map.setZoom(6);
          this.setMarker(event.latLng.lat(), event.latLng.lng(), city, state);
          this.props.callback(event.latLng.lat(), event.latLng.lng(), city, state);
        }
      }.bind(this)
      );  
    }.bind(this));

    //when the zoom is small, 
     google.maps.event.addListener(this.map, 'zoom_changed', function(event){
      var markerCluster = new MarkerClusterer(this.map, this.state.markers,
      {imagePath: './markers/markers'});
    }.bind(this));

    var styles = window.styles;
    //this.map.setOptions({ draggableCursor : "url(http://s3.amazonaws.com/besport.com_images/status-pin.png), auto" })
    this.map.setOptions({styles: styles, mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true, zoomControl: true,});
  }

  //Helper function that gets the Lng and Lat of a given address.
  /*Geocoder.geocode() method initiates a request to the geocoding service, passing it a 
  GeocoderRequest object literal containing the input terms and a callback method to execute 
  upon receipt of the response.*/
  geocodeAddress(resultsMap, address) {
    this.geocoder.geocode({'address': address, componentRestrictions: {country: 'US'}}, function(results, status) {
      if (status === 'OK') {
        console.log('RESULTS : ', results[0]['address_components']);
        //only when we know the input is a city, we add to the 
        //searchedCities list
        var r = this.props.getCityState(results);
        if (!r[0]) {
          //not a valid city? 
          alert('please enter a valid city')
        } else {
          var city = r[0].toLowerCase();
          var state = r[1].toLowerCase();

          var position = this.searchedCities[city+state];
          console.log('adding: ',city+state);
          console.log('pos: ', position);
          if (position) {
            this.searched(city, city+state);
          } else {
            console.log(city);
            this.searchedCities[city+state] = [results[0].geometry.location, state];

            // console.log('whyy', this.searchedCities);
            // console.log(this.searchedCities[city]);

            resultsMap.setCenter(results[0].geometry.location);
            resultsMap.setZoom(6);
            this.setMarker(results[0].geometry.location.lat(), results[0].geometry.location.lng(), city, state);
            this.props.callback(results[0].geometry.location.lat(), results[0].geometry.location.lng(), city, state);
          }
          
        }


      } else {
        alert('There is no such city in the US, please enter a valid city');
      }
    }.bind(this)
    );
  }

  searchClicked(address) {
    console.log(address);
    var address = address.toLowerCase();
    this.geocodeAddress(this.map, address);
    
  }

  //what to do if a city was already searched/clicked on
  searched(city, key) {
    console.log(city);
    var position = this.searchedCities[key];
    console.log('searched this city already');
    this.map.setCenter({lat: position[0].lat(), lng:position[0].lng()});
    this.map.setZoom(6);
    this.props.callback(position[0].lat(), position[0].lng(), city, position[1]);
  }

  getState(geoCodeRes) {
    var state ='';
    geoCodeRes[0]['address_components'].forEach(function(addComp) {
//       long_name:"Pennsylvania"
    //   short_name:"PA"
//       types: ["administrative_area_level_1", "political"]
      if (addComp.types.includes("administrative_area_level_1")) {
        state = addComp['long_name'];
      }
    });
    return state; 
  }

  render() {
    return (
    <div>
      <div ref="map" style={{backgroundColor: 'blue', width: '80%', height: '400px', borderRadius: '5px'}}></div>
      <Search search={this.searchClicked.bind(this)}/>
    </div>
    )
  }
}

export default Map;



