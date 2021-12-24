import React, {useState} from 'react';
import './Content.css';
import Map from './Map';
import Info from './Info';

function Content() {
    return (
      <div
        style={{
          position: "absolute",
          zIndex: 0,
          width: "100%", // or you can use width: '100vw'
          height: "100%" // or you can use height: '100vh'
        }}
        id="Content"
      >
        <div>
          <div id="groupBox">
            <div id="groupBox2">
              <Info id="Info"/>
              <Map id="Map" exchanges={exchanges}/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Content;