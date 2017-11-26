import React from 'react';

var PhotoInfo = (props) => {
	const photos = props.photoUrl;
  console.log('HERE IS PHOTOS :  ', photos);
  if(props.photoUrl.length < 1) {
    return (<div className="loader"></div>)
  } else {
	  const photoList = photos.map((photo)=> <img src={photo}/>);
    return (
      <p className="photoblock_content">
        {photoList}
      </p>
    )
  }
}

export default PhotoInfo;