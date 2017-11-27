import React from 'react';
import PhotoElement from './PhotoElement.jsx';

var PhotoInfo = (props) => {
	const photos = props.photoUrl;
  if (typeof props.photoUrl === 'string'){
    return (<div> No Results </div>)
  }  else if (props.photoUrl.length < 1) {
    return (<div className="loader"></div>)
  } 
  else {
  const photoList = photos.map((photo)=> <PhotoElement photo={photo}/>);
    return (
      <div className="photoblock_content row">
        {photoList}
      </div>
    )
  }
}

export default PhotoInfo;