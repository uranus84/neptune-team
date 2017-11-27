import React from 'react';


var WalkabilityInfo = (props) => {
  if(props.walkscore === "") {
    return (<div className="loader"></div>)
  } else if (props.walkscore > 0 && props.walkscore <= 50) {
    return (
      <p className="walkabilityblock_content">
      <br/>
        <a href="https://www.walkscore.com/how-it-works/">
        	<img src="//cdn2.walk.sc/2/images/api-logo.png" alt="What's your Walk Score?" width="150" height="25" border="0" /><div className = 'dangerouswalk'> {props.walkscore}</div><div>Poor</div>
        </a>
      </p>
    )
  } else if (props.walkscore > 50 && props.walkscore <= 75){
    return (
      <p className="walkabilityblock_content">
      <br/>
        <a href="https://www.walkscore.com/how-it-works/">
          <img src="//cdn2.walk.sc/2/images/api-logo.png" alt="What's your Walk Score?" width="150" height="25" border="0" /><div className = 'okwalk'> {props.walkscore}</div><div>OK</div>
        </a>
      </p>
    )

  } else if (props.walkscore > 75 && props.walkscore <= 90){
    return (
      <p className="walkabilityblock_content">
      <br/>
        <a href="https://www.walkscore.com/how-it-works/">
          <img src="//cdn2.walk.sc/2/images/api-logo.png" alt="What's your Walk Score?" width="150" height="25" border="0" /><div className = 'goodwalk'> {props.walkscore}</div><div>Good</div>
        </a>
      </p>
    )

  } else if (props.walkscore > 100) {
    return (<p className="walkabilityblock_content"> No Results For This Area </p>)
  }  else if (props.walkscore > 90 && props.walkscore <= 100) {
    return (
      <p className="walkabilityblock_content">
      <br/>
        <a href="https://www.walkscore.com/how-it-works/">
          <img src="//cdn2.walk.sc/2/images/api-logo.png" alt="What's your Walk Score?" width="150" height="25" border="0" /><div className = 'amazingwalk'> {props.walkscore}</div><div>Amazing!</div>
        </a>
      </p>
    )
  } else {
    return (<div>No Results</div>)
  }
}

export default WalkabilityInfo;