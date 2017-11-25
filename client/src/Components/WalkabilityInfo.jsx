import React from 'react';


var WalkabilityInfo = (props) => (
  <div className="walkabilityblock_content">
    <a href="https://www.walkscore.com/how-it-works/">
      <h4>Walk Score:</h4>
      <p className='walkabilityblock_score'>{props.walkscore}</p>
    </a>
  </div>
)

export default WalkabilityInfo;