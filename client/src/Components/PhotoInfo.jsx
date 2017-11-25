import React from 'react';

var PhotoInfo = (props) => {
  if(props.photoUrl === "") {
    return (<div className="loader"></div>)
  } else {
    return (
      <p className="photoblock_content">
        <img src={props.photoUrl} />
      </p>
    )
  }
}

export default PhotoInfo;