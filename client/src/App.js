import * as React from 'react';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


function App() {

  return (
    <div className="App">
  <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      
      }}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
    </div>
  );
}

export default App;
