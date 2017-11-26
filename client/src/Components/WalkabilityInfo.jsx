import React from 'react';

var WalkabilityInfo = (props) => {
  if(props.walkscore === "") {
    return (<div className="loader"></div>)
  } else if (props.walkscore > 0 && props.walkscore < 50) {
    return (
      <div className="walkabilityblock_content">
      
        <p>Walk Score:</p>
        <a href="https://www.walkscore.com/how-it-works/">
          <div className = 'dangerouswalk'> {props.walkscore}</div>
        </a>
        <div>Poor</div>
      </div>
    )
  } else if (props.walkscore > 50 && props.walkscore < 75){
    return (
      <div className="walkabilityblock_content">
 
        <p>Walk Score:</p>
        <a href="https://www.walkscore.com/how-it-works/">
          <div className = 'okwalk'> {props.walkscore}</div>
        </a>
        <div>OK</div>
      </div>
    )

  } else if (props.walkscore > 75 && props.walkscore < 90){
    return (
      <div className="walkabilityblock_content">
  
        <p>Walk Score:</p>
        <a href="https://www.walkscore.com/how-it-works/">
          <div className = 'goodwalk'> {props.walkscore}</div>
        </a>
        <div>Good</div>
      </div>
    )

  } else if (props.walkscore > 90){
    return (
      <div className="walkabilityblock_content">
 
        <p>Walk Score:</p>
        <a href="https://www.walkscore.com/how-it-works/">
          <div className = 'amazingwalk'> {props.walkscore}</div>
        </a>
        <div>Amazing!</div>
      </div>
    )
  }
}

export default WalkabilityInfo;