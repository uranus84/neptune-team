import React from 'react';

var MappComponent = (props) => (
  <div className="row">
    <div id="mapblock_content">  
      <img style={{maxWidth: "100%", minWidth: "100%", height: "375px"}} src="https://static1.squarespace.com/static/4f6792f624ac778428aca39d/4f760d4b6a9b61f6cc2748c3/51a798f6e4b01ba7ba19b03b/1387223684177/google-maps-squarespace-birds-eye-view-01.jpg?format=2500w"/>
      <p className="mapblock_content">Any Map Notes Go Here</p>
      <div className="input-group col-md-12">
        <input type="text" className="form-control"></input>
        <span className="input-group-btn">
          <button className="btn btn-primary" type="button">Search This Location</button>
        </span>
      </div>
    </div>
  </div>
  )



export default MappComponent;
