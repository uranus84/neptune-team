import React from 'react';

var WalkabilityInfo = (props) => {
  if(props.walkscore === "") {
    return (<div className="loader"></div>)
  } else if (props.walkscore > 0 && props.walkscore <= 50) {
    return (
      <div className="walkabilityblock_content">
        <p>Walk Score:</p>
          <span id='subtext'></span>
        <a href="https://www.walkscore.com/how-it-works/">
          <div className = 'dangerouswalk'> {props.walkscore}</div>
        </a>
        
      </div>
    )
  } else if (props.walkscore > 50 && props.walkscore <= 75){
    return (
      <div className="walkabilityblock_content">
 
        <p>Walk Score:</p>
         <span id='subtext'></span>
        <a href="https://www.walkscore.com/how-it-works/">
          <div className = 'okwalk'> {props.walkscore}</div>
        </a>
   
      </div>
    )

  } else if (props.walkscore > 75 && props.walkscore <= 90){
    return (
      <div className="walkabilityblock_content">
  
        <p>Walk Score:</p>
        <span id='subtext'></span>
        <a href="https://www.walkscore.com/how-it-works/">
          <div className = 'goodwalk'> {props.walkscore}</div>
        </a>
       
      </div>
    )
  } else if (props.walkscore > 100) {
    return (<p className="walkabilityblock_content"> No Results For This Area </p>)
  }  else if (props.walkscore > 90 && props.walkscore <= 100) {
    return (
      <div className="walkabilityblock_content">
 
        <span>Walk Score:</span>
         <span id='subtext'></span>
        <a href="https://www.walkscore.com/how-it-works/">
          <div className = 'amazingwalk'> {props.walkscore}</div>
        </a>
       
      </div>
    )
  } else {
    return (<div>No Results</div>)
  }
}

export default WalkabilityInfo;