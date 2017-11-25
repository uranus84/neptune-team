import React from 'react';
//this will make a get request to server /tips
//get request will have a value, city name.
//the server will query the database with the city name
//and return all the data with the city name and display the values

//might have to make a tipElement

//do a for loop, pass each object of email, content and city 
//to TipsBlockElement
// this.props.city

var TipsBlock = (props) => (

  <div>
    <p className="tipsblock_content">Tips From Locals Go Here</p>
    <p>Running with the bulls in Bolton, OH  is amazing.</p>
    <p>-Mel Melverson</p>
    <br />
    <p>I found the library to be both quaint and huge at the same time.</p>
    <p>-Tony T.</p>
    <br />
    <p>How much wood would a woodchuck chuck in Bolton? Visist and find out!</p>
    <p>Susan Solomon</p>
    <br />
     <p>Running with the bulls in Bolton, OH  is amazing.</p>
    <p>-Mel Melverson</p>
    <br />
    <p>I found the library to be both quaint and huge at the same time.</p>
    <p>-Tony T.</p>
    <br />
    <p>How much wood would a woodchuck chuck in Bolton? Visist and find out!</p>
    <p>Susan Solomon</p>
     <p>Running with the bulls in Bolton, OH  is amazing.</p>
    <p>-Mel Melverson</p>
    <br />
    <p>I found the library to be both quaint and huge at the same time.</p>
    <p>-Tony T.</p>
    <br />
    <p>How much wood would a woodchuck chuck in Bolton? Visist and find out!</p>
    <p>Susan Solomon</p>
    <br />
    <p>I found the library to be both quaint and huge at the same time.</p>
    <p>-Tony T.</p>
    <br />
    <p>How much wood would a woodchuck chuck in Bolton? Visist and find out!</p>
    <p>Susan Solomon</p>
    <p>sdvdfvfd</p>
    <p>sdvgbbgbfbfgbfgbfgbfgbg</p>
  </div>
  )

export default TipsBlock;