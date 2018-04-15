import React from 'react';

var WalkabilityInfo = (props) => {
  if (props.walkscore === '') {
    return (<div className="loader"></div>);
  } else if (props.walkscore > 0 && props.walkscore <= 50) {
    return (
      <div className="walkabilityblock_content">
        <div className="walkscore">
          <p>Walk Score:</p>
          <span id='subtext'></span>
          <a href="https://www.walkscore.com/how-it-works/">
            <div className = 'dangerouswalk'> {props.walkscore}</div>
          </a>
        </div>
        <div className="walk-description">
          <p>This score shows how easy it is to get around on foot. 
            Either if you're a tourist hoping to see the local attractions 
            or live here hoping to drop by the local farmer's market with 
            your adorable frenchie, this will tell you if you should be walking 
            investing in a bicycle, or calling a Lyft.<br /><br />
            The higher the score, the more you can get by with walking/biking and the lower the score 
            the more you should consider getting a car.
          </p>
        </div>
          
      </div>
    );
  } else if (props.walkscore > 50 && props.walkscore <= 75) {
    return (
      <div className="walkabilityblock_content">
        <div className="walkscore">
          <p>Walk Score:</p>
          <span id='subtext'></span>
          <a href="https://www.walkscore.com/how-it-works/">
            <div className = 'okwalk'> {props.walkscore}</div>
          </a>
        </div>
        <div className="walk-description">
          <p>This score shows how easy it is to get around on foot. 
            Either if you're a tourist hoping to see the local attractions 
            or live here hoping to drop by the local farmer's market with 
            your adorable frenchie, this will tell you if you should be walking 
            investing in a bicycle, or calling a Lyft.<br /><br />
            The higher the score, the more you can get by with walking/biking and the lower the score 
            the more you should consider getting a car.
          </p>
        </div>
   
      </div>
    );

  } else if (props.walkscore > 75 && props.walkscore <= 90) {
    return (
      <div className="walkabilityblock_content">
        <div className="walkscore">  
          <p>Walk Score:</p>
          <span id='subtext'></span>
          <a href="https://www.walkscore.com/how-it-works/">
            <div className = 'goodwalk'> {props.walkscore}</div>
          </a>
        </div>
        <div className="walk-description">
          <p>This score shows how easy it is to get around on foot. 
            Either if you're a tourist hoping to see the local attractions 
            or live here hoping to drop by the local farmer's market with 
            your adorable frenchie, this will tell you if you should be walking 
            investing in a bicycle, or calling a Lyft.<br /><br />
            The higher the score, the more you can get by with walking/biking and the lower the score 
            it's about time we talked about putting your big kid pants on and
            getting a car. Ew - car insurance.
          </p>
        </div>
       
      </div>
    );
  } else if (props.walkscore > 100) {
    return (<p className="walkabilityblock_content"> No Results For This Area </p>);
  } else if (props.walkscore > 90 && props.walkscore <= 100) {
    return (
      <div className="walkabilityblock_content">
        <div className="walkscore">
          <span>Walk Score:</span>
          <a href="https://www.walkscore.com/how-it-works/"><span id='subtext'></span></a>
          <a href="https://www.walkscore.com/how-it-works/">
            <div className = 'amazingwalk'> {props.walkscore}</div>
          </a>
        </div>
        <div className="walk-description">
          <p>This score shows how easy it is to get around on foot. 
            Either if you're a tourist hoping to see the local attractions 
            or live here hoping to drop by the local farmer's market with 
            your adorable frenchie, this will tell you if you should be walking 
            investing in a bicycle, or calling a Lyft.<br /><br />
            The higher the score, the more you can get by with walking/biking and the lower the score 
            the more you should consider getting a car.
          </p>
        </div>
       
      </div>
    );
  } else {
    return (<div>No Results</div>);
  }
};

export default WalkabilityInfo;