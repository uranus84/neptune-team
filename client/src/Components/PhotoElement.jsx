import React from 'react';

var PhotoElement = (props) => (
  <div className="col-md-12">
    <div className="thumbnail">
      <a href={props.photo}>
        <img src={props.photo} alt="Lights" style={{width: '100%'}}/>
        <div className="caption">
         
        </div>
      </a>
    </div>
  </div>
);

export default PhotoElement;