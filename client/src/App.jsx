import React from 'react';
import MappComponent from './MappComponent.jsx';
import PhotoInfo from './PhotoInfo.jsx';
import TipsBlock from './TipsBlock.jsx';
import TopTweetsInfo from './TopTweetsInfo.jsx';
import WalkabilityInfo from './WalkabilityInfo.jsx';
import TwitterTrends from './TwitterTrends.jsx';


class App extends React.Component {
  constructor() {
    super();
    this.state = {};
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
                      <WalkabilityInfo />
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
                  <PhotoInfo />
                </div>
              </div>
            </div>
            
          </div>
        </div>
    );
  }
}

export default App;





