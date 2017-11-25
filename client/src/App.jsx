import React from 'react';
import MappComponent from './MappComponent.jsx';
import PhotoInfo from './PhotoInfo.jsx';
import TipsBlock from './TipsBlock.jsx';
import TopTweetsInfo from './TopTweetsInfo.jsx';
import WalkabilityInfo from './WalkabilityInfo.jsx';
import TwitterTrends from './TwitterTrends.jsx';


////
// // var BrowserRouter = require('react-router-dom').BrowserRouter
// // var Route = require('react-router-dom').Route
// // var Link = require('react-router-dom').Link
// import AdminPanel from './loggedin/admin.jsx';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link
// } from 'react-router-dom'

// ////





class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tipsTestCity: 'san francisco',
      tipsTestState: 'California'
    };
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
                      <TipsBlock info={this.state}/>
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



/////////REACT ROUTER INSTALLED/////////////////


// import React from 'react';
// import MappComponent from './MappComponent.jsx';
// import PhotoInfo from './PhotoInfo.jsx';
// import TipsBlock from './TipsBlock.jsx';
// import TopTweetsInfo from './TopTweetsInfo.jsx';
// import WalkabilityInfo from './WalkabilityInfo.jsx';
// import TwitterTrends from './TwitterTrends.jsx';

// import AdminPanel from './loggedin/admin.jsx';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link
// } from 'react-router-dom'


// var App = () => (
//   <Router>
//       <div>
//         <Link to="/" className="btn btn-primary">Home</Link>
//         <Link to="/admin" className="btn btn-primary">Admin</Link>
//         <Route exact path="/" component={Core}/>
//         <Route path="/admin" component={AdminPanel}/>
//       </div>
//     </Router>
// )




// class Core extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       tipsTestCity: 'san francisco',
//       tipsTestState: 'California'

//     };
//   }

//   render() {
//     return (    
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-12-sm" id="titlebar">
//               <h1 id="titlefont">InfoMapp</h1>
//               <h2 id="subtitlefont">Learn More With Just A Click</h2>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-sm-6">  
//               <div id="mapblock" className="vertical-center">         
//                 <MappComponent />
//               </div>
//               <div id="twittertrends">
//                 <TwitterTrends />
//               </div>
//             </div>
//             <div className="col-sm-6">
//               <div id="infoblock">
//                 <div className="row">
//                   <div className="col-sm-6">
//                     <div id="walkabilityblock">
//                       <WalkabilityInfo />
//                     </div>
//                   </div>
//                   <div className="col-sm-6">
//                     <div id ="tipsblock">
//                       <TipsBlock info={this.state}/>
//                     </div>
//                   </div>
//                 </div>
//                 <div id="toptweetsblock">
//                   <TopTweetsInfo />
//                 </div>
//                 <div id="photoblock">
//                   <PhotoInfo />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//     );
//   }
// }

// export default App;







