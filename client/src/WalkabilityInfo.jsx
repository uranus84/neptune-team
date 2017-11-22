import React from 'react';


var WalkabilityInfo = (props) => (
<p className="walkabilityblock_content">
<a href="https://www.walkscore.com/how-it-works/">
	<img src="//cdn2.walk.sc/2/images/api-logo.png" alt="What's your Walk Score?" width="120" height="19" border="0" /> {props.walkscore}
</a>
</p>
  )

export default WalkabilityInfo;