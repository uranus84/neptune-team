import React from 'react';

var PhotoInfo = (props) => {
	const photos = props.photoUrl;
	const photoList = photos.map((photo)=> <img src={photo}/>);
  if(props.photoUrl.length < 1) {
    return (<div className="loader"></div>)
  } else {
    return (
      <p className="photoblock_content">
        {photoList}
      </p>
    )
  }
}

export default PhotoInfo;