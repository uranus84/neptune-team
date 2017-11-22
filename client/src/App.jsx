import React from 'react';
import MappComponent from './MappComponent.jsx';
import PhotoInfo from './PhotoInfo.jsx';
import TipsBlock from './TipsBlock.jsx';
import TopTweetsInfo from './TopTweetsInfo.jsx';
import WalkabilityInfo from './WalkabilityInfo.jsx';
import TwitterTrends from './TwitterTrends.jsx';
import axios from 'axios';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      photoUrl : '',
      walkscore : 0
    };

    this.getPhoto = (lat,lon) => {
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

      this.getWalkability = (lat,lon) => {
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

    this.getPhoto();
    this.getWalkability();
  }

  render() {
    return (    
        <div className="container-fluid">
          <div className="row">
            <div className="col-12-sm" id="titlebar">
              <h1 id="titlefont">InfoMapp</h1>
              <h2 id="subtitlefont">Learn More With Just A Click</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">  
              <div id="mapblock" className="vertical-center">         
                <MappComponent />
              </div>
              <div id="twittertrends">
                <TwitterTrends />
              </div>
            </div>
            <div className="col-sm-6">
              <div id="infoblock">
                <div className="row">
                  <div className="col-sm-6">
                    <div id="walkabilityblock">
                      <WalkabilityInfo walkscore = {this.state.walkscore}/>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div id ="tipsblock">
                      <TipsBlock />
                    </div>
                  </div>





                </div>
                <div id="toptweetsblock">
                  <TopTweetsInfo />
                </div>
                <div id="photoblock">
                  <PhotoInfo photoUrl = {this.state.photoUrl}/>
                </div>
              </div>
            </div>
            
          </div>
        </div>
    );
  }
}

export default App;





